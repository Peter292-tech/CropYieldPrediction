import pickle
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for frontend connection

# Load the trained ML model
model_path = "model/model (2).pkl" 
with open(model_path, "rb") as file:
    model = pickle.load(file)


# Load historical dataset (Used to extract past feature trends)
historical_data_path = "data/Cleaned_Crop_Yield.csv"
df = pd.read_csv(historical_data_path)  

df["Crop_normalized"] = df["Crop"].astype(str).str.strip().str.lower()

# Categorical mappings 
season_mapping = {"Summer": 1, "Winter": 2, "Autumn": 3, "Kharif": 4, "Rabi": 5, "Whole Year": 6}
state_mapping = {"Assam": 1, "Punjab": 2, "Maharashtra": 3, "Karnataka": 4, "Uttar Pradesh": 5}
crop_mapping = {"Rice": 1, "Wheat": 2, "Corn": 3, "Arecanut": 4, "Arhar/Tur": 5, "Castor seed": 6, "Coconut": 7, "Tapioca": 8, "Garlic": 9, "Ginger": 10, "Potato": 11}

# ------------------------------
# ✅ PREDICTED YIELD ENDPOINT
# ------------------------------
@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()  # Get JSON data
        print("Received data:", data)  # Debugging log

        # Validate input fields
        required_fields = ["Crop", "Crop_Year", "Season", "State", "Area", "Production", "Annual_Rainfall", "Fertilizer", "Season_Rainfall_Index"]
        if not all(field in data for field in required_fields):
            return jsonify({"error": "Missing data in request"}), 400

        # Convert categorical fields to numerical values
        data["Season"] = season_mapping.get(data["Season"], 0)  # Default to 0 if not found
        data["State"] = state_mapping.get(data["State"], 0)
        data["Crop"] = crop_mapping.get(data["Crop"], 0)

        # Convert input to DataFrame
        input_features = pd.DataFrame([data], columns=required_fields)

        # Make prediction
        prediction = model.predict(input_features)[0]

        return jsonify({"predicted_yield": float(prediction)})

    except Exception as e:
        return jsonify({"error": str(e)}), 400


@app.route('/yield_chart', methods=['GET'])
def get_yield_chart():
    try:
        crop = request.args.get("crop")

        if not crop:
            return jsonify({"error": "Crop parameter is required"}), 400

        # Match the crop using mapping if encoded
        crop_encoded = crop_mapping.get(crop)
        if crop_encoded is None:
            return jsonify({"error": "Crop not found in mapping"}), 404

        # Filter by Crop
        crop_data = df[df["Crop"] == crop_encoded].sort_values(by="Crop_Year")

        if crop_data.empty:
            return jsonify({"error": "No historical data found for this crop"}), 404

        return jsonify({
            "years": crop_data["Crop_Year"].tolist(),
            "yields": crop_data["Yield"].tolist()
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ------------------------------
# ✅ RUN FLASK SERVER
# ------------------------------
if __name__ == "__main__":
    app.run(debug=True)

