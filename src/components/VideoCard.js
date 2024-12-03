import React, { useState } from 'react';
import './VideoCard.css';

const VideoCard = ({ video }) => {
  const [fakeCheckResult, setFakeCheckResult] = useState("");
  const [isChecking, setIsChecking] = useState(false);

  const checkFakeReal = async () => {
    setIsChecking(true);
    try {
      const response = await fetch('http://localhost:5000/api/check-fake-real', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ videoId: video.id }),
      });
      const data = await response.json();
      if (response.ok) {
        setFakeCheckResult(data.result);
      } else {
        setFakeCheckResult("Error checking video. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setFakeCheckResult("Network error. Please try again.");
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <div className="video-card">
      <img src={video.thumbnail} className="video-thumbnail" alt={video.title} loading="lazy" />
      <div className="video-details">
        <h3 className="video-title">{video.title}</h3>
        <p className="video-description">{video.description}</p>
        <button onClick={checkFakeReal} className="check-button" disabled={isChecking}>
          {isChecking ? 'Checking...' : 'Check Fake/Real'}
        </button>
        {fakeCheckResult && (
          <p className="fake-check-result">
            <strong>Result:</strong> {fakeCheckResult}
          </p>
        )}
        <a
          href={video.url}
          target="_blank"
          rel="noopener noreferrer"
          className="youtube-link"
        >
          Watch on YouTube
        </a>
      </div>
    </div>
  );
};

export default VideoCard;

