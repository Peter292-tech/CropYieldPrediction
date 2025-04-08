import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Description from "./components/Description";
import YieldForm from "./components/YieldForm";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  const [prediction, setPrediction] = useState(null);

  return (
    <div className="app-container">
      <Header />
      <Navbar />
      <Description />
      <YieldForm setPrediction={setPrediction} prediction={prediction} />
      <Footer />
    </div>
    
  );
}

export default App;
