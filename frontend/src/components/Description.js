import React from "react";
import "./Description.css";

const Description = () => {
  return (
    <section className="description">
      <h2>About Crop Yield Prediction</h2>
      <p>
        This tool predicts crop yield based on factors like rainfall, fertilizer use, and seasonal patterns.
        The dataset includes records from various crops grown across different states and seasons.
      </p>
      <p>
        Enter the required values and click "Predict Yield" to get an estimated crop yield.
      </p>
    </section>
  );
};

export default Description;
