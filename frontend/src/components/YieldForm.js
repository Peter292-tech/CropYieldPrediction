import React, { useState } from "react";
import axios from "axios";
import YieldChart from "./YieldChart";
import "./YieldForm.css";

const YieldForm = ({ setPrediction, prediction }) => {
  const [formData, setFormData] = useState({
    Crop: "",
    Crop_Year: "",
    Season: "",
    State: "",
    Area: "",
    Production: "",
    Annual_Rainfall: "",
    Fertilizer: "",
    Season_Rainfall_Index: ""
  });

  const [showChart, setShowChart] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const API_URL = "http://127.0.0.1:5000/predict";
      const response = await axios.post(API_URL, formData, {
        headers: { "Content-Type": "application/json" },
      });
      setPrediction(response.data.predicted_yield);
      setShowChart(true);
    } catch (error) {
      console.error("Error making prediction:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form-grid">
        <label>Crop:</label>
        <select name="Crop" onChange={handleChange} required>
          <option value="">Select Crop</option>
          <option value="Arhar/Tur">Arhar/Tur</option>
          <option value="Castor seed">Castor seed</option>
          <option value="Wheat">Wheat</option>
          <option value="Rice">Rice</option>
          <option value="Arecanut">Arecanut</option>
          <option value="Coconut">Coconut</option>
          <option value="Tapioca">Tapioca</option>
          <option value="Garlic">Garlic</option>
          <option value="Ginger">Ginger</option>
          <option value="Potato">Potato</option>
        </select>

        <label>Crop Year:</label>
        <input 
          type="number" 
          name="Crop_Year" 
          placeholder="e.g., 2005" 
          min="1997" 
          max="2020" 
          onChange={handleChange} 
          required 
        />

        <label>Season:</label>
        <select name="Season" onChange={handleChange} required>
          <option value="">Select Season</option>
          <option value="Summer">Summer</option>
          <option value="Winter">Winter</option>
          <option value="Autumn">Autumn</option>
          <option value="Kharif">Kharif</option>
          <option value="Rabi">Rabi</option>
          <option value="Whole Year">Whole Year</option>
        </select>

        <label>State:</label>
        <input type="text" name="State" placeholder="e.g., Assam" onChange={handleChange} required />

        <label>Area (in acres):</label>
        <input type="number" name="Area" placeholder="e.g., 5000" onChange={handleChange} required />

        <label>Production:</label>
        <input type="number" name="Production" placeholder="e.g., 2000" onChange={handleChange} required />

        <label>Annual Rainfall (mm):</label>
        <input type="number" name="Annual_Rainfall" placeholder="e.g., 1200" onChange={handleChange} required />

        <label>Fertilizer Usage (kg/ha):</label>
        <input type="number" name="Fertilizer" placeholder="e.g., 300" onChange={handleChange} required />

        <label>Season Rainfall Index:</label>
        <input type="number" name="Season_Rainfall_Index" placeholder="e.g., 1.2" onChange={handleChange} required />

        <button type="submit" className="submit-btn">Predict Yield</button>
      </form>

      {prediction && (
        <div className="prediction-result">
          Predicted Yield: <span className="yield-value">{prediction.toFixed(2)} Tons</span>
          {showChart && (
            <YieldChart
              crop={formData.Crop}
              season={formData.Season}
              state={formData.State}
            />
          )}
        </div>
      )}

      <div className="demo-video-container">
        <video
          
          className="demo-video"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/Crop Yield Prediction - Google Chrome 2025-04-04 16-06-16.mp4" type="video/mp4" /> 
          Your browser does not support the video tag.
        </video>
        <p className="video-caption">Demo: Crop Yield Prediction</p>
      </div>
    </div>
  );
};

export default YieldForm;

