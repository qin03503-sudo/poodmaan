'use client';

import { useRef, useState } from 'react';
import { Button } from '@poodmaan/ui/components/button';
import { Card, CardContent, CardTitle } from '@poodmaan/ui/components/card';

export default function AudioPlayer({ episodeTitle, audioUrl }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  const togglePlayback = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };

  const formatTime = (seconds) => {
    if (!seconds || Number.isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <Card>
      <CardContent className="stack">
        <CardTitle>{episodeTitle}</CardTitle>
        <audio
          ref={audioRef}
          src={audioUrl}
          onTimeUpdate={() => setCurrentTime(audioRef.current?.currentTime || 0)}
          onLoadedMetadata={() => setDuration(audioRef.current?.duration || 0)}
        />
        <Button onClick={togglePlayback}>{isPlaying ? 'Pause' : 'Play episode'}</Button>
        <input
          type="range"
          min="0"
          max={duration || 0}
          value={currentTime}
          onChange={(event) => {
            const nextTime = Number(event.target.value);
            if (audioRef.current) audioRef.current.currentTime = nextTime;
            setCurrentTime(nextTime);
          }}
        />
        <div className="topbar" style={{ marginBottom: 0 }}>
          <span className="meta">{formatTime(currentTime)}</span>
          <span className="meta">{formatTime(duration)}</span>
        </div>
      </CardContent>
    </Card>
  );
}
