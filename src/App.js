import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import VideoCard from "./components/VideoCard";
import "./App.css";

function App() {
  const [videos, setVideos] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const videosPerPage = 3;

  const fetchTrendingVideos = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("http://localhost:5000/api/trending-videos");
      setVideos(response.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching trending videos:", error);
      setError("Failed to fetch trending videos. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTrendingVideos();
  }, [fetchTrendingVideos]);

  const handlePreviousPage = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  const handleNextPage = () => {
    if (startIndex + videosPerPage < videos.length) {
      setStartIndex(startIndex + 1);
    }
  };

  const visibleVideos = videos.slice(startIndex, startIndex + videosPerPage);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <div className={`App ${isDarkMode ? "dark-mode" : "light-mode"}`}>
      <header>
        <h1>YouTube Trending Videos</h1>
        <button className="toggle-theme" onClick={toggleDarkMode}>
          {isDarkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </header>
      {isLoading ? (
        <div className="loader">
          <div className="spinner"></div>
          <p>Loading trending videos...</p>
        </div>
      ) : error ? (
        <div className="error">
          <p>{error}</p>
          <button onClick={fetchTrendingVideos} className="retry-button">Retry</button>
        </div>
      ) : (
        <div className="video-slider">
          <button
            className="arrow left-arrow"
            onClick={handlePreviousPage}
            disabled={startIndex === 0}
          >
            &#8592;
          </button>
          <div className="video-grid">
            {visibleVideos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
          <button
            className="arrow right-arrow"
            onClick={handleNextPage}
            disabled={startIndex + videosPerPage >= videos.length}
          >
            &#8594;
          </button>
        </div>
      )}
      <footer>
        <p>&copy; 2024 YouTube Trending Videos. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
