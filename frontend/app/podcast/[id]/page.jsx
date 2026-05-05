'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getPodcastById, getEpisodes } from '@/lib/api';

export default function PodcastPage() {
  const params = useParams();
  const [podcast, setPodcast] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [params.id]);

  const loadData = async () => {
    try {
      const podcastRes = await getPodcastById(params.id);
      setPodcast(podcastRes.data);

      const episodesRes = await getEpisodes(params.id);
      setEpisodes(episodesRes.data);
    } catch (err) {
      console.error('Failed to load data:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div style={styles.container}>Loading...</div>;
  if (!podcast) return <div style={styles.container}>Podcast not found</div>;

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <Link href="/" style={styles.backLink}>← Back</Link>
      </header>

      <div style={styles.podcastHeader}>
        {podcast.cover_image_url && (
          <img src={podcast.cover_image_url} alt={podcast.title} style={styles.coverImage} />
        )}
        <div>
          <h1>{podcast.title}</h1>
          <p style={styles.creator}>by {podcast.creator_name}</p>
          <p style={styles.description}>{podcast.description}</p>
          <p style={styles.stats}>{podcast.follower_count} followers • {episodes.length} episodes</p>
        </div>
      </div>

      <section style={styles.section}>
        <h2>Episodes ({episodes.length})</h2>
        {episodes.length === 0 ? (
          <p>No episodes yet</p>
        ) : (
          <div style={styles.episodesList}>
            {episodes.map((episode) => (
              <Link key={episode.id} href={`/episode/${episode.id}`}>
                <div style={styles.episodeCard}>
                  <div style={styles.episodeInfo}>
                    <h3>{episode.title}</h3>
                    <p style={styles.episodeDesc}>{episode.description?.substring(0, 100)}</p>
                    <p style={styles.episodeMeta}>
                      {episode.duration_seconds && `${Math.floor(episode.duration_seconds / 60)} min`}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '1000px',
    margin: '0 auto',
    padding: '20px',
  },
  header: {
    marginBottom: '20px',
  },
  backLink: {
    color: '#0070f3',
    fontSize: '16px',
    fontWeight: '500',
  },
  podcastHeader: {
    display: 'flex',
    gap: '30px',
    marginBottom: '40px',
  },
  coverImage: {
    width: '200px',
    height: '200px',
    borderRadius: '8px',
    objectFit: 'cover',
  },
  creator: {
    color: '#666',
    marginTop: '10px',
  },
  description: {
    marginTop: '10px',
    lineHeight: '1.6',
    color: '#555',
  },
  stats: {
    marginTop: '10px',
    color: '#999',
    fontSize: '14px',
  },
  section: {
    marginTop: '40px',
  },
  episodesList: {
    marginTop: '20px',
  },
  episodeCard: {
    backgroundColor: '#fff',
    border: '1px solid #e5e5e5',
    borderRadius: '8px',
    padding: '15px',
    marginBottom: '10px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  episodeInfo: {
    flex: 1,
  },
  episodeDesc: {
    color: '#999',
    fontSize: '13px',
    marginTop: '5px',
  },
  episodeMeta: {
    color: '#aaa',
    fontSize: '12px',
    marginTop: '5px',
  },
};
