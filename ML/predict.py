from flask import Flask
from flask import request
from flask import jsonify

import joblib

app = Flask(__name__)

model = joblib.load(
    "admission_model.pkl"
)

@app.route("/predict", methods=["POST"])
def predict():

    data = request.json

    values = [[
        data["tenthPercentage"],
        data["tenthAttendance"],
        data["interPercentage"],
        data["interAttendance"]
    ]]

    prediction = model.predict(values)[0]

    probability = max(
        model.predict_proba(values)[0]
    )

    return jsonify({
        "prediction":
            "ELIGIBLE"
            if prediction == 1
            else "NOT_ELIGIBLE",

        "confidence":
            round(
                probability * 100,
                2
            )
    })

if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=5000,
        debug=True
    )