from flask import Flask, jsonify, request
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

# Replace with your YouTube Data API key
YOUTUBE_API_KEY = "AIzaSyDLNbzR6E4A9haW8txqMsbG7T6S8tElm-4"

@app.route('/api/trending-videos', methods=['GET'])
def get_trending_videos():
    youtube_url = "https://www.googleapis.com/youtube/v3/videos"
    params = {
        "part": "snippet,statistics",
        "chart": "mostPopular",
        "regionCode": "US",
        "maxResults": 10,
        "key": YOUTUBE_API_KEY,
    }
    
    response = requests.get(youtube_url, params=params)
    if response.status_code == 200:
        data = response.json()
        trending_videos = [
            {
                "id": item["id"],
                "title": item["snippet"]["title"],
                "thumbnail": item["snippet"]["thumbnails"]["medium"]["url"],
                "views": item["statistics"]["viewCount"],
                "url": f"https://www.youtube.com/watch?v={item['id']}"  # Add video URL
            }
            for item in data.get("items", [])
        ]
        return jsonify(trending_videos)
    else:
        return jsonify({"error": "Failed to fetch trending videos"}), response.status_code

@app.route('/api/check-fake-real', methods=['POST'])
def check_fake_real():
    # Get the videoId from the request
    data = request.get_json()
    video_id = data.get("videoId")

    if not video_id:
        return jsonify({"error": "Video ID is required"}), 400

    # Perform the fake/real check (placeholder logic)
    # Replace this with your actual Python script or ML model
    if "fake" in video_id.lower():
        result = "Fake"
    else:
        result = "Real"

    # Return the result
    return jsonify({"result": result})

if __name__ == '__main__':
    app.run(debug=True)
