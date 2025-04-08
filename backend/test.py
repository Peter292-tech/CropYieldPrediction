import requests

url = "http://127.0.0.1:5000/predict"
data = {
    "Crop_Year": 2022,
    "Season": 1,
    "State": 3,
    "Area": 50,
    "Production": 1200,
    "Annual_Rainfall": 2000,
    "Fertilizer": 300,
    "Season_Rainfall_Index": 2000
}

response = requests.post(url, json=data)
print(response.json())
