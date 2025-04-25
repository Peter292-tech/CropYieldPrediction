This project is an AI-powered web application designed to predict crop yields based on key agricultural factors such as crop type, season, state, rainfall, and fertilizer usage. 
The system integrates a machine learning backend with a user-friendly React frontend, providing real-time predictions and historical yield visualizations.

Features:
  Predict crop yield using Random Forest or XGBoost models.
  User-friendly web form for manual data input.
  Dynamic visualization of historical yield trends using Chart.js.
  Error handling for invalid inputs and unsupported crops.
  Supports batch processing via dataset integration.
  Responsive design with embedded user guidance video.

Setup Instructions

Backend (Flask API)
1. cd backend
2. python -m venv venv
3. source venv/bin/activate
4. pip install -r requirements.txt
5. python app.py

Frontend (React)
1. cd frontend
2. npm install
3. npm start

Usage
Launch both backend and frontend servers.
Enter agricultural parameters in the web form.
View predicted yield and corresponding historical trend chart.
For unsupported crops, appropriate error messages will guide the user.
