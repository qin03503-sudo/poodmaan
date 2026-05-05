'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getEpisodeById } from '@/lib/api';
import AudioPlayer from '@/components/AudioPlayer';

export default function EpisodePage() {
  const params = useParams();
  const [episode, setEpisode] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEpisode();
  }, [params.id]);

  const loadEpisode = async () => {
    try {
      const response = await getEpisodeById(params.id);
      setEpisode(response.data);
    } catch (err) {
      console.error('Failed to load episode:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div style={styles.container}>Loading...</div>;
  if (!episode) return <div style={styles.container}>Episode not found</div>;

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <Link href="/" style={styles.backLink}>← Home</Link>
      </header>

      <article style={styles.episode}>
        <h1>{episode.title}</h1>
        <p style={styles.episodeNumber}>
          Episode {episode.episode_number}
        </p>
        
        <AudioPlayer 
          episodeTitle={episode.title}
          audioUrl={episode.audio_file_url}
        />

        <div style={styles.description}>
          <h2>Description</h2>
          <p>{episode.description}</p>
        </div>

        <div style={styles.meta}>
          <p>Duration: {episode.duration_seconds ? `${Math.floor(episode.duration_seconds / 60)} minutes` : 'N/A'}</p>
          <p>Published: {new Date(episode.published_at).toLocaleDateString()}</p>
        </div>
      </article>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
  },
  header: {
    marginBottom: '30px',
  },
  backLink: {
    color: '#0070f3',
    fontSize: '16px',
    fontWeight: '500',
  },
  episode: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    padding: '30px',
  },
  episodeNumber: {
    color: '#999',
    marginTop: '10px',
  },
  description: {
    marginTop: '30px',
    lineHeight: '1.8',
  },
  meta: {
    marginTop: '30px',
    paddingTop: '20px',
    borderTop: '1px solid #e5e5e5',
    color: '#666',
    fontSize: '14px',
  },
};
