from flask import Flask, request
import iris
import os
from dotenv import load_dotenv

load_dotenv()
app = Flask(__name__)

CONNECTION_STRING = os.getenv("CONNECTION_STRING")
ACCOUNTNAME = os.getenv("ACCOUNTNAME")
PASSWORD = os.getenv("PASSWORD")

@app.route("/", methods=["POST"])
def index():
    params = {
        "date": request.get_json().get("date"),
        "time": request.get_json().get("time"),
        "line": request.get_json().get("line")
    }

    connection = iris.connect(CONNECTION_STRING, ACCOUNTNAME, PASSWORD)
    cursor = connection.cursor()

    result = cursor.execute("SELECT TOP 10 *, PREDICT(MbtaTrainSmall) predicted FROM mbta_table")
    row = cursor.fetchone()
    # print(row.gated_entries, row.predicted)

    return params

if __name__ == "__main__":
    app.run()