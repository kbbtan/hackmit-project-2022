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

@app.route("/", methods=["POST"])
@cross_origin()
def index():
    params = {
        "date": request.get_json().get("date"),
        "time": request.get_json().get("time"),
        "line": request.get_json().get("line")
    }
    """
    connection = iris.connect(CONNECTION_STRING, ACCOUNTNAME, PASSWORD)
    cursor = connection.cursor()

    result = cursor.execute("SELECT TOP 10 *, PREDICT(MbtaTrainSmall) predicted FROM mbta_table")
    row = cursor.fetchone()
    # print(row.gated_entries, row.predicted)
    """

    return params

if __name__ == "__main__":
    app.run()