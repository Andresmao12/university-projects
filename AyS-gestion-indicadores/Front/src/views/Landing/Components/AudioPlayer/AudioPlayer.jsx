import YouTube from "react-youtube";
import { useRef, useState } from "react";

const AudioPlayer = () => {
    const playerRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const handleReady = (event) => {
        playerRef.current = event.target;
    };

    const handleToggle = () => {
        if (!playerRef.current) return;

        if (isPlaying) {
            playerRef.current.pauseVideo();
        } else {
            playerRef.current.playVideo();
        }

        setIsPlaying(!isPlaying);
    };

    return (
        <div style={{ position: "fixed", bottom: "5px", right: "5px", zIndex: 1000 }}>
            <YouTube
                videoId="wbHHkg9MLNg"
                opts={{
                    height: "0",
                    width: "0",
                    playerVars: {
                        autoplay: 0,
                        controls: 0,
                        modestbranding: 1,
                        loop: 1,
                        playlist: "wbHHkg9MLNg",
                    },
                }}
                onReady={handleReady}
            />
            <button onClick={handleToggle}>
                {isPlaying ? "⏸️ Audio" : "▶️ Audio"}
            </button>
        </div>
    );
};

export default AudioPlayer;
