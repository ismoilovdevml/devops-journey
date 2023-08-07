import { useEffect, useRef } from 'react';

import videojs, { VideoJsPlayer } from 'video.js';
import 'video.js/dist/video-js.css';

const VideoJS = (props: any) => {
  const videoRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<VideoJsPlayer | null>(null);
  const { options, onReady } = props;

  useEffect(() => {
    // Make sure Video.js player is only initialized once
    if (!playerRef.current) {
      // The Video.js player needs to be _inside_ the component el for React 18 Strict Mode.
      const videoElement = document.createElement('video-js');

      videoElement.classList.add('vjs-big-play-centered');
      videoRef?.current?.appendChild(videoElement);

      const player = (playerRef.current = videojs(videoElement, options, () => {
        onReady && onReady(player);
      }));
    }
  }, [options, videoRef, onReady]);

  // Dispose the Video.js player when the functional component unmounts
  useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return (
    <div data-vjs-player>
      <div ref={videoRef} />
    </div>
  );
};

export const VideoJSPlayer = () => {
  const playerRef = useRef(null);
  const videoJsOptions = {
    autoplay: false,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [
      {
        src: 'https://lp-playback.com/hls/f5eese9wwl88k4g8/video',
        type: 'video/mp4',
      },
    ],
  };

  const handlePlayerReady = (player: any) => {
    console.log({ player });
    playerRef.current = player;
  };

  return <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />;
};
