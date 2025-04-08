import React from "react";

const PredictionResult = ({ prediction }) => {
  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      {prediction !== null ? (
        <h2>Predicted Crop Yield: {prediction.toFixed(2)}</h2>
      ) : (
        <h2>Enter values and submit to see the prediction.</h2>
      )}
    </div>
  );
};

export default PredictionResult;
