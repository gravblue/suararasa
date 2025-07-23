// components/MoodSelector.jsx
import { moods } from "../MusicLogic";

const MoodSelector = ({ 
  userText, 
  setUserText, 
  mood, 
  setMood, 
  setIsUsingTextInput, 
  setDetectedEmotion, 
  setError,
  loading,
  detectEmotion,
  detectedEmotion
}) => {

  const handleMoodButtonClick = (m) => {
    setMood(m);
    setIsUsingTextInput(false);
    setDetectedEmotion(null);
    setError(null);
  };

  const handleTextInputChange = (e) => {
    const text = e.target.value;
    setUserText(text);
    const hasText = text.trim();
    setIsUsingTextInput(!!hasText);
    if (!hasText) setDetectedEmotion(null);
    if (hasText) setMood(null);
  };

  const analyzeText = async () => {
    if (!userText.trim()) return;
    try {
      const emotionData = await detectEmotion(userText);
      setDetectedEmotion(emotionData.emotion);
      setMood(null);
    } catch {
      setError("Oops! We need more than just numbers. Try describing your mood in words.");
    }
  };

  return (
    <div className="mb-6">
      <textarea
        className="w-full p-4 bg-gray-700 text-white rounded-lg mb-2 resize-none outline-none"
        placeholder="Let your feelings be heard"
        rows="4"
        value={userText}
        onChange={handleTextInputChange}
      />
      
      {userText.trim() && (
        <button
          onClick={analyzeText}
          disabled={loading}
          className={`mb-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {loading ? "Analyzing ⏳ " : "Analyzing your mood"}
        </button>
      )}

      {detectedEmotion && (
        <div className="mt-2 p-3 bg-gray-700 rounded-lg mb-4">
          <p>Your mood: <span className="font-bold text-indigo-200">{detectedEmotion}</span></p>
        </div>
      )}

      <p className="text-gray-300 mb-3">Select mood</p>

      <div className="flex flex-wrap gap-2 mb-6">
        {moods.map((m, i) => (
          <button
            key={i}
            onClick={() => handleMoodButtonClick(m)}
            className={`px-4 py-2 rounded-full transition-colors ${
              mood?.title === m.title 
                ? "bg-indigo-500 text-white" 
                : "bg-gray-700 text-white hover:bg-gray-600"
            }`}
          >
            <span className="mr-1">{m.emoji}</span> {m.title}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MoodSelector;
