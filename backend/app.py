from flask import Flask, request
from flask_cors import CORS, cross_origin
import iris
import os
from dotenv import load_dotenv

load_dotenv()
app = Flask(__name__)
cors = CORS(app)

CONNECTION_STRING = os.getenv("CONNECTION_STRING")
ACCOUNTNAME = os.getenv("ACCOUNTNAME")
PASSWORD = os.getenv("PASSWORD")
LINE_MAPPINGS = {"Blue Line": 0, "Green Line" : 1, "Orange Line": 2, "Red Line": 3, "Silver Line": 4}

@app.route("/", methods=["POST"])
@cross_origin()
def index():
    params = {
        "date": request.get_json().get("date"),
        "time": request.get_json().get("time"),
        "line": request.get_json().get("line")
    }

    route_indicators = [0, 0, 0, 0, 0]
    route_indicators[LINE_MAPPINGS[params["line"]]] = 1

    year, month, day = params["date"].split("-")

    hour, minute = params["time"].split(":")
    hour, minute = int(hour), int(minute)
    minute //= 30
    hour -= 3
    hour = hour + 24 if hour < 0 else hour
    time_period = hour * 2 + minute

    connection = iris.connect(CONNECTION_STRING, ACCOUNTNAME, PASSWORD)
    cursor = connection.cursor()

    insert_query = f"INSERT INTO mbta_full VALUES ({day}, {month}, {year}, {time_period}, 0 \
    {route_indicators[0]}, {route_indicators[1]}, {route_indicators[2]}, {route_indicators[3]}, {route_indicators[4]})"
    where_search = f"WHERE day = {day} AND month = {month} AND year = {year} AND time_period = {time_period} \
        AND route_Blue_Line = {route_indicators[0]} AND route_Green_Line = {route_indicators[1]} AND \
        route_Orange_Line = {route_indicators[2]} AND route_Red_Line = {route_indicators[3]} \
        AND route_Silver_Line = {route_indicators[4]}"

    cursor.execute(f"SELECT TOP 1 PREDICT(MbtaLine) predicted from mbta_full {where_search}")
    row = cursor.fetchone()

    if row:
        gated_entries = row.predicted

    else:
        cursor.execute(insert_query)
        cursor.execute(f"SELECT TOP 1 PREDICT(MbtaLine) predicted from mbta_full {where_search}")
        row = cursor.fetchone()
        gated_entries = row.predicted

    cursor.close()

    return {"gated_entries": f"{round(float(gated_entries), 1)}"}

if __name__ == "__main__":
    app.run()