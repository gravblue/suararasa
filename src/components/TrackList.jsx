// components/TrackList.jsx

const TrackList = ({ tracks, playTrack, selectedTrack }) => {
  if (tracks.length === 0) {
    return null;
  }

  return (
    <div className="bg-gray-800 p-6 rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Music that matches your feelings</h2>
      </div>
      
      {/* Song cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tracks.map((track, index) => (
          <div key={index} className="bg-gray-900 rounded-lg overflow-hidden transition-transform duration-200 hover:scale-102 hover:shadow-lg">
            <div className="p-4">
              <div className="flex items-center space-x-4">
                {/* Album art */}
                <div className="flex-shrink-0">
                  {track.albumArt ? (
                    <img 
                      src={track.albumArt} 
                      alt="Album cover" 
                      className="w-16 h-16 rounded object-cover" 
                    />
                  ) : (
                    <div className="w-16 h-16 bg-gray-800 rounded flex items-center justify-center">
                      <span className="text-2xl">🎵</span>
                    </div>
                  )}
                </div>
                
                {/* Song details */}
                <div className="flex-1">
                  <h3 className="text-lg font-medium">{track.title}</h3>
                  <p className="text-gray-400">{track.artist}</p>
                </div>
              </div>
              
              {/* Player controls */}
              <div className="flex mt-4 space-x-2">
                <button
                  onClick={() => playTrack(track)}
                  disabled={!track.trackId}
                  className={`rounded-full w-10 h-10 flex items-center justify-center text-white
                            ${track.trackId 
                              ? 'bg-indigo-400 hover:bg-indigo-400' 
                              : 'bg-gray-700 text-gray-400 cursor-not-allowed'}`}
                  title={!track.trackId ? "Tidak dapat memutar lagu ini" : ""}
                >
                  {selectedTrack?.trackId === track.trackId ? "♪" : "▷"}
                </button>
                
                <a
                  href={track.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center rounded-full bg-gray-800 px-4 hover:bg-gray-700"
                >
                  <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.36.119-.75-.12-.87-.48-.12-.359.12-.75.48-.87 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.329 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141 4.32-1.3 9.721-.66 13.441 1.62.42.3.599.84.3 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                  </svg>
                  Spotify
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrackList;
