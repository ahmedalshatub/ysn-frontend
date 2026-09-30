import React, { useState, useRef, useEffect, useCallback } from "react";
import PlayIcon from "../../../assets/icons/PlayIcon";
import PauseIcon from "../../../assets/icons/PauseIcon";
import VolumeIcon from "../../../assets/icons/VolumeIcon";
import VolumeXIcon from "../../../assets/icons/VolumeXIcon";
import MaximizeIcon from "../../../assets/icons/MaximizeIcon";
import Minimize2Icon from "../../../assets/icons/Minimize2Icon";
import PipIcon from "../../../assets/icons/PipIcon";
import SettingsIcon from "../../../assets/icons/SettingsIcon";
import ReplayIcon from "../../../assets/icons/ReplayIcon";
import Forward10Icon from "../../../assets/icons/Forward10Icon";
import Rewind10Icon from "../../../assets/icons/Rewind10Icon";

type VideoPlayerVariant = "default" | "minimal" | "cinema" | "rounded";
type VideoPlayerSize = "sm" | "md" | "lg" | "full";

interface VideoSource {
  src: string;
  type?: string;
  label?: string;
}

interface VideoPlayerProps {
  src: string | VideoSource[];
  poster?: string;
  variant?: VideoPlayerVariant;
  size?: VideoPlayerSize;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  showControls?: boolean;
  showSpeedControl?: boolean;
  showFullscreen?: boolean;
  showPip?: boolean;
  showVolume?: boolean;
  showProgress?: boolean;
  showTime?: boolean;
  showPlayOverlay?: boolean;
  preload?: "auto" | "metadata" | "none";
  className?: string;
  onPlay?: () => void;
  onPause?: () => void;
  onEnded?: () => void;
  onTimeUpdate?: (currentTime: number, duration: number) => void;
}

const speedOptions = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

const sizeClasses: Record<VideoPlayerSize, string> = {
  sm: "max-w-sm",
  md: "max-w-2xl",
  lg: "max-w-4xl",
  full: "w-full",
};


const formatTime = (seconds: number): string => {
  if (!seconds || !isFinite(seconds)) return "0:00";
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  if (hrs > 0) {
    return `${hrs}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  src,
  poster,
  variant = "default",
  size = "full",
  autoPlay = false,
  muted = false,
  loop = false,
  showControls = true,
  showSpeedControl = true,
  showFullscreen = true,
  showPip = true,
  showVolume = true,
  showProgress = true,
  showTime = true,
  showPlayOverlay = true,
  preload = "metadata",
  className,
  onPlay,
  onPause,
  onEnded,
  onTimeUpdate,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const controlsTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [buffered, setBuffered] = useState(0);
  const [volume, setVolume] = useState(muted ? 0 : 1);
  const [previousVolume, setPreviousVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(muted);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControlsBar, setShowControlsBar] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isEnded, setIsEnded] = useState(false);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [hoverTime, setHoverTime] = useState<number | null>(null);
  const [hoverPosition, setHoverPosition] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  const hideControlsAfterDelay = useCallback(() => {
    if (controlsTimerRef.current) clearTimeout(controlsTimerRef.current);
    if (isPlaying) {
      controlsTimerRef.current = setTimeout(() => {
        setShowControlsBar(false);
        setShowSpeedMenu(false);
      }, 3000);
    }
  }, [isPlaying]);

  const handleShowControls = useCallback(() => {
    setShowControlsBar(true);
    hideControlsAfterDelay();
  }, [hideControlsAfterDelay]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onLoadedMetadata = () => setDuration(video.duration);
    const onTimeUpdateHandler = () => {
      setCurrentTime(video.currentTime);
      onTimeUpdate?.(video.currentTime, video.duration);
    };
    const onProgress = () => {
      if (video.buffered.length > 0) {
        setBuffered(video.buffered.end(video.buffered.length - 1));
      }
    };
    const onPlayHandler = () => {
      setIsPlaying(true);
      setIsEnded(false);
      setHasStarted(true);
      onPlay?.();
    };
    const onPauseHandler = () => {
      setIsPlaying(false);
      setShowControlsBar(true);
      onPause?.();
    };
    const onEndedHandler = () => {
      setIsPlaying(false);
      setIsEnded(true);
      setShowControlsBar(true);
      onEnded?.();
    };
    const onWaiting = () => setIsLoading(true);
    const onCanPlay = () => setIsLoading(false);

    video.addEventListener("loadedmetadata", onLoadedMetadata);
    video.addEventListener("timeupdate", onTimeUpdateHandler);
    video.addEventListener("progress", onProgress);
    video.addEventListener("play", onPlayHandler);
    video.addEventListener("pause", onPauseHandler);
    video.addEventListener("ended", onEndedHandler);
    video.addEventListener("waiting", onWaiting);
    video.addEventListener("canplay", onCanPlay);

    return () => {
      video.removeEventListener("loadedmetadata", onLoadedMetadata);
      video.removeEventListener("timeupdate", onTimeUpdateHandler);
      video.removeEventListener("progress", onProgress);
      video.removeEventListener("play", onPlayHandler);
      video.removeEventListener("pause", onPauseHandler);
      video.removeEventListener("ended", onEndedHandler);
      video.removeEventListener("waiting", onWaiting);
      video.removeEventListener("canplay", onCanPlay);
    };
  }, [onPlay, onPause, onEnded, onTimeUpdate]);

  useEffect(() => {
    if (isPlaying) {
      hideControlsAfterDelay();
    } else {
      if (controlsTimerRef.current) clearTimeout(controlsTimerRef.current);
      setShowControlsBar(true);
    }
    return () => {
      if (controlsTimerRef.current) clearTimeout(controlsTimerRef.current);
    };
  }, [isPlaying, hideControlsAfterDelay]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const video = videoRef.current;
      if (!video || !containerRef.current?.contains(document.activeElement as Node)) return;

      switch (e.key) {
        case " ":
        case "k":
          e.preventDefault();
          togglePlay();
          break;
        case "ArrowRight":
          e.preventDefault();
          skip(10);
          break;
        case "ArrowLeft":
          e.preventDefault();
          skip(-10);
          break;
        case "ArrowUp":
          e.preventDefault();
          changeVolume(Math.min(1, volume + 0.1));
          break;
        case "ArrowDown":
          e.preventDefault();
          changeVolume(Math.max(0, volume - 0.1));
          break;
        case "f":
          e.preventDefault();
          toggleFullscreen();
          break;
        case "m":
          e.preventDefault();
          toggleMute();
          break;
        case "Escape":
          setShowSpeedMenu(false);
          break;
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [volume]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (isEnded) {
      video.currentTime = 0;
      setIsEnded(false);
    }
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  };

  const skip = (seconds: number) => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = Math.max(0, Math.min(video.duration, video.currentTime + seconds));
    handleShowControls();
  };

  const changeVolume = (val: number) => {
    const video = videoRef.current;
    if (!video) return;
    const clamped = Math.max(0, Math.min(1, val));
    video.volume = clamped;
    setVolume(clamped);
    setIsMuted(clamped === 0);
    video.muted = clamped === 0;
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    if (isMuted) {
      const restoreVol = previousVolume > 0 ? previousVolume : 0.5;
      video.volume = restoreVol;
      video.muted = false;
      setVolume(restoreVol);
      setIsMuted(false);
    } else {
      setPreviousVolume(volume);
      video.volume = 0;
      video.muted = true;
      setVolume(0);
      setIsMuted(true);
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current;
    const progressBar = progressRef.current;
    if (!video || !progressBar) return;
    const rect = progressBar.getBoundingClientRect();
    const percent = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    video.currentTime = percent * video.duration;
  };

  const handleProgressHover = (e: React.MouseEvent<HTMLDivElement>) => {
    const progressBar = progressRef.current;
    if (!progressBar || !duration) return;
    const rect = progressBar.getBoundingClientRect();
    const percent = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    setHoverTime(percent * duration);
    setHoverPosition(e.clientX - rect.left);
  };

  const handleProgressLeave = () => {
    setHoverTime(null);
  };

  const changeSpeed = (speed: number) => {
    const video = videoRef.current;
    if (!video) return;
    video.playbackRate = speed;
    setPlaybackSpeed(speed);
    setShowSpeedMenu(false);
  };

  const toggleFullscreen = () => {
    const container = containerRef.current;
    if (!container) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      container.requestFullscreen();
    }
  };

  const togglePip = async () => {
    const video = videoRef.current;
    if (!video) return;
    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
      } else {
        await video.requestPictureInPicture();
      }
    } catch (_) {}
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;
  const bufferedPercent = duration > 0 ? (buffered / duration) * 100 : 0;

  const VolumeButtonIcon = isMuted || volume === 0 ? VolumeXIcon : VolumeIcon;

  const variantClasses: Record<VideoPlayerVariant, { container: string; controls: string }> = {
    default: {
      container: "rounded-lg overflow-hidden",
      controls: "bg-gradient-to-t from-black/90 via-black/60 to-transparent",
    },
    minimal: {
      container: "rounded-md overflow-hidden",
      controls: "bg-black/70",
    },
    cinema: {
      container: "rounded-xl overflow-hidden shadow-2xl",
      controls: "bg-gradient-to-t from-black via-black/70 to-transparent",
    },
    rounded: {
      container: "rounded-2xl overflow-hidden shadow-lg",
      controls: "bg-gradient-to-t from-black/85 via-black/50 to-transparent",
    },
  };

  const styles = variantClasses[variant];

  return (
    <div
      ref={containerRef}
      className={`vp-container relative ${sizeClasses[size]} ${styles.container} group bg-black select-none ${className || ""}`}
      onMouseMove={handleShowControls}
      onMouseLeave={() => {
        if (isPlaying) {
          setShowControlsBar(false);
          setShowSpeedMenu(false);
        }
      }}
      tabIndex={0}
    >
      <video
        ref={videoRef}
        className="vp-video w-full h-full cursor-pointer"
        poster={poster}
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        preload={preload}
        playsInline
        onClick={togglePlay}
        onDoubleClick={toggleFullscreen}
      >
        {typeof src === "string" ? (
          <source src={src} />
        ) : (
          src.map((s, i) => <source key={i} src={s.src} type={s.type} />)
        )}
      </video>

      {showPlayOverlay && !hasStarted && !autoPlay && (
        <div className="vp-overlay absolute inset-0 flex items-center justify-center bg-black/40 cursor-pointer" onClick={togglePlay}>
          <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center transition-transform duration-200 hover:scale-110">
            <PlayIcon className="w-10 h-10 text-white ml-1" />
          </div>
        </div>
      )}

      {isLoading && hasStarted && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="vp-spinner w-12 h-12 border-4 border-white/30 border-t-white rounded-full" />
        </div>
      )}

      {isEnded && !loop && (
        <div className="vp-overlay absolute inset-0 flex items-center justify-center bg-black/50 cursor-pointer" onClick={togglePlay}>
          <div className="flex flex-col items-center gap-2">
            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center transition-transform duration-200 hover:scale-110">
              <ReplayIcon className="w-8 h-8 text-white" />
            </div>
            <span className="text-white/80 text-sm font-medium">Replay</span>
          </div>
        </div>
      )}

      {showControls && (
        <div
          className={`vp-controls absolute bottom-0 left-0 right-0 px-4 pb-3 pt-12 ${styles.controls} ${showControlsBar ? "" : "vp-controls-hidden"}`}
        >
          {showProgress && (
            <div className="mb-2 relative">
              <div
                ref={progressRef}
                className="vp-progress-track relative w-full h-1 bg-white/20 rounded-full"
                onClick={handleProgressClick}
                onMouseMove={handleProgressHover}
                onMouseLeave={handleProgressLeave}
              >
                <div
                  className="vp-progress-buffer absolute top-0 left-0 h-full bg-white/30 rounded-full"
                  style={{ width: `${bufferedPercent}%` }}
                />
                <div
                  className="vp-progress-filled absolute top-0 left-0 h-full vp-progress-color rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
                <div
                  className="vp-progress-thumb absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 vp-progress-color rounded-full border-2 border-white shadow-md"
                  style={{ left: `${progressPercent}%` }}
                />
              </div>
              {hoverTime !== null && (
                <div
                  className="vp-time-preview absolute -top-8 bg-black/80 text-white text-xs px-2 py-1 rounded -translate-x-1/2"
                  style={{ left: `${hoverPosition}px` }}
                >
                  {formatTime(hoverTime)}
                </div>
              )}
            </div>
          )}

          <div className="flex items-center gap-2">
            <button
              className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-white hover:text-white/80 transition-colors duration-150"
              onClick={togglePlay}
            >
              {isEnded ? (
                <ReplayIcon className="w-5 h-5" />
              ) : isPlaying ? (
                <PauseIcon className="w-5 h-5" />
              ) : (
                <PlayIcon className="w-5 h-5" />
              )}
            </button>

            {variant !== "minimal" && (
              <>
                <button
                  className="flex-shrink-0 w-7 h-7 flex items-center justify-center text-white/80 hover:text-white transition-colors duration-150"
                  onClick={() => skip(-10)}
                >
                  <Rewind10Icon className="w-5 h-5" />
                </button>
                <button
                  className="flex-shrink-0 w-7 h-7 flex items-center justify-center text-white/80 hover:text-white transition-colors duration-150"
                  onClick={() => skip(10)}
                >
                  <Forward10Icon className="w-5 h-5" />
                </button>
              </>
            )}

            {showVolume && (
              <div className="flex items-center gap-1 group/vol">
                <button
                  className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-white hover:text-white/80 transition-colors duration-150"
                  onClick={toggleMute}
                >
                  <VolumeButtonIcon className="w-5 h-5" />
                </button>
                <div className="w-0 overflow-hidden group-hover/vol:w-20 transition-all duration-200">
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={(e) => changeVolume(parseFloat(e.target.value))}
                    className="vp-volume-slider w-full"
                  />
                </div>
              </div>
            )}

            {showTime && (
              <div className="text-white text-xs font-mono whitespace-nowrap ml-1">
                {formatTime(currentTime)} / {formatTime(duration)}
              </div>
            )}

            <div className="flex-1" />

            {showSpeedControl && (
              <div className="relative">
                <button
                  className="flex-shrink-0 h-7 px-2 flex items-center justify-center text-white/80 hover:text-white text-xs font-medium transition-colors duration-150 rounded hover:bg-white/10"
                  onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                >
                  <SettingsIcon className="w-4 h-4 mr-1" />
                  {playbackSpeed}x
                </button>
                {showSpeedMenu && (
                  <div className="vp-speed-menu absolute bottom-full right-0 mb-2 backdrop-blur-sm rounded-lg py-1 min-w-[100px] shadow-xl border border-white/10">
                    {speedOptions.map((speed) => (
                      <button
                        key={speed}
                        className={`w-full px-3 py-1.5 text-xs text-left transition-colors duration-100 ${
                          playbackSpeed === speed ? "vp-speed-active font-semibold" : "text-white/80 hover:text-white hover:bg-white/5"
                        }`}
                        onClick={() => changeSpeed(speed)}
                      >
                        {speed}x
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {showPip && (
              <button
                className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-white/80 hover:text-white transition-colors duration-150"
                onClick={togglePip}
              >
                <PipIcon className="w-5 h-5" />
              </button>
            )}

            {showFullscreen && (
              <button
                className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-white/80 hover:text-white transition-colors duration-150"
                onClick={toggleFullscreen}
              >
                {isFullscreen ? <Minimize2Icon className="w-5 h-5" /> : <MaximizeIcon className="w-5 h-5" />}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export type { VideoSource, VideoPlayerProps };
export default VideoPlayer;
