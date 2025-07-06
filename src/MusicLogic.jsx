// musicLogic.jsx - File untuk semua logic terkait musik dan API calls

// Data constants
export const moods = [
  { title: "joy", emoji: "😄" },
  { title: "sadness", emoji: "😢" },
  { title: "surprise", emoji: "🕺🏽" },
  { title: "fear", emoji: "😨" },
  { title: "anger", emoji: "😡" },
  { title: "love", emoji: "❤️" },
  { title: "neutral", emoji: "😐" }
];

// API function to detect emotion
export const detectEmotion = async (text) => {
  try {
    const res = await fetch("https://nandaputric-suararasa.hf.space/detect-emotion", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text })
    });

    if (!res.ok) {
      throw new Error(`API returned ${res.status}`);
    }

    return res.json();
  } catch (err) {
    console.error("Error detecting emotion:", err);
    throw new Error("Failed to detect emotion");
  }
};

// Get recommendations from playlists (using predefined playlist IDs)
export const getRecommendationsByMood = async (emotion, limit = 5) => {
  try {
    const query = `emotion=${encodeURIComponent(emotion)}&limit=${limit}&use_predefined=true`;

    const response = await fetch(`https://nandaputric-suararasa.hf.space/recommend-from-playlists?${query}`);

    if (!response.ok) {
      throw new Error(`API returned ${response.status}`);
    }

    const data = await response.json();

    if (!data.tracks || !Array.isArray(data.tracks)) {
      throw new Error("Invalid response format from API");
    }

    return processTracksData(data.tracks);
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    throw new Error("Failed to get song recommendations");
  }
};

// Combined analyze and recommend using backend's built-in logic
export const analyzeAndRecommend = async (text, limit = 5) => {
  try {
    const query = `limit=${limit}&search_method=predefined`;

    const response = await fetch(`https://nandaputric-suararasa.hf.space/analyze-and-recommend?${query}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text })
    });

    if (!response.ok) {
      throw new Error(`API returned ${response.status}`);
    }

    const data = await response.json();

    if (!data.emotion) {
      throw new Error("Invalid response format from API");
    }

    if (!data.tracks || !Array.isArray(data.tracks)) {
      return {
        emotion: data.emotion,
        tracks: []
      };
    }

    return {
      emotion: data.emotion,
      tracks: processTracksData(data.tracks)
    };
  } catch (error) {
    console.error("Error with analyze and recommend:", error);
    throw new Error("Failed to analyze and get recommendations");
  }
};

// Helper function to format track data
const processTracksData = (tracksData) => {
  return tracksData.map(track => {
    const spotifyUrl = track.url || "";
    const trackId = spotifyUrl.split("track/")[1]?.split("?")[0] || null;

    return {
      title: track.title || "Unknown Title",
      artist: track.artist || "Unknown Artist",
      url: track.url || "#",
      trackId: trackId,
      albumArt: track.album_art || track.albumArt || null,
      previewUrl: track.preview_url || null
    };
  });
};
