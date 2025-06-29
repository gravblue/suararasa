// components/SpotifyPlayer.jsx

const SpotifyPlayer = ({ selectedTrack }) => {
  if (!selectedTrack || !selectedTrack.trackId) {
    return null;
  }
  
  return (
    <div className="bg-gray-800 p-6 rounded-lg mb-6">
      <h3 className="text-xl mb-4">Now Playing: {selectedTrack.title} by {selectedTrack.artist}</h3>
      <div className="w-full">
        <iframe 
          style={{ borderRadius: '12px' }}
          src={`https://open.spotify.com/embed/track/${selectedTrack.trackId}`}
          width="100%" 
          height="352" 
          frameBorder="0" 
          allowFullScreen 
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
          loading="lazy">
        </iframe>
      </div>
    </div>
  );
};

export default SpotifyPlayer;