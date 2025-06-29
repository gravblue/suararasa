import { useState, useEffect } from "react";
import { 
  detectEmotion, 
  getRecommendationsByMood, 
  analyzeAndRecommend 
} from "../MusicLogic";

// Import UI components
import MoodSelector from "./MoodSelection";
import TrackList from "./TrackList";
import SpotifyPlayer from "./SpotifyPlayer";
import ErrorBanner from "./ErrorHandler";

export default function Mood() {
  // State management for app
  const [mood, setMood] = useState(null);
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userText, setUserText] = useState("");
  const [isUsingTextInput, setIsUsingTextInput] = useState(false);
  const [detectedEmotion, setDetectedEmotion] = useState(null);
  const [error, setError] = useState(null);
  const [selectedTrack, setSelectedTrack] = useState(null);

  // Clean up when component unmounts
  useEffect(() => {
    return () => {
      // Nothing to clean up with iframe approach
    };
  }, []);

  // Handler for playing tracks
  const playTrack = (track) => {
    if (!track.trackId) {
      setError("Tidak dapat memutar lagu ini. ID lagu tidak tersedia.");
      return;
    }
    setSelectedTrack(track);
  };

  // Main action to get recommendations
  const go = async () => {
    setLoading(true);
    setError(null);
    setTracks([]);
    setSelectedTrack(null);

    try {
      if (isUsingTextInput && userText.trim()) {
        const result = await analyzeAndRecommend(userText, 10);
        setDetectedEmotion(result.emotion);
        setTracks(result.tracks);
      } else if (mood) {
        const recommendedTracks = await getRecommendationsByMood(mood.title, 10);
        setTracks(recommendedTracks);
      } else {
        setError("Please select a mood or enter how you're feeling.");
        setLoading(false);
        return;
      }
    } catch (error) {
      console.error("Error getting recommendations:", error);
      setError("Failed to get recommendations. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="flex items-center p-4 bg-gray-900 border-b border-gray-800">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-blue-600 rounded-md flex items-center justify-center mr-2">
            <span className="text-xl">🎵</span>
          </div>
          <h1 className="text-xl font-semibold">SuaraRasa</h1>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-6xl mx-auto p-6">
        <ErrorBanner error={error} setError={setError} />

        {/* Mood Selection */}
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">How are you feeling today?</h2>

          <MoodSelector 
            userText={userText}
            setUserText={setUserText}
            mood={mood}
            setMood={setMood}
            setIsUsingTextInput={setIsUsingTextInput}
            setDetectedEmotion={setDetectedEmotion}
            setError={setError}
            loading={loading}
            detectEmotion={detectEmotion}
            detectedEmotion={detectedEmotion}
          />

          <button
            disabled={(!mood && !userText.trim()) || loading}
            onClick={go}
            className={`w-full bg-indigo-400 hover:bg-indigo-400 text-white py-3 px-4 rounded-lg flex items-center justify-center font-medium ${
              loading || (!mood && !userText.trim()) ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? "Searching for songs..." : "Find songs based on mood"}
          </button>
        </div>

        <SpotifyPlayer selectedTrack={selectedTrack} />

        <TrackList 
          tracks={tracks} 
          playTrack={playTrack} 
          selectedTrack={selectedTrack} 
        />

        {/* Footer */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          © 2025 SuaraRasa Music App. Your feelings matter.
        </div>
      </div>
    </div>
  );
}