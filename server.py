from flask import Flask, jsonify
import random
import time

app = Flask(__name__)

@app.route('/api/traffic-data', methods=['GET'])
def get_traffic_data():
    """
    Mock API for real-time traffic data.
    In a real scenario, this would interface with actual road sensors/cameras.
    """
    return jsonify({
        "timestamp": time.time(),
        "roads": {
            "north": {"vehicles": random.randint(10, 100), "density": random.randint(20, 90)},
            "south": {"vehicles": random.randint(10, 100), "density": random.randint(20, 90)},
            "east": {"vehicles": random.randint(10, 100), "density": random.randint(20, 90)},
            "west": {"vehicles": random.randint(10, 100), "density": random.randint(20, 90)}
        },
        "aqi": random.randint(30, 150),
        "emergency": random.choice([True, False, False, False, False]) # 20% chance of emergency
    })

@app.route('/api/prediction', methods=['GET'])
def get_prediction():
    return jsonify({
        "5min": "Low",
        "10min": "Heavy",
        "15min": "Moderate",
        "suggested_route": "Sector 4 Bypass"
    })

if __name__ == '__main__':
    print("Traffic AI-X Backend starting on port 5000...")
    app.run(debug=True, port=5000)
