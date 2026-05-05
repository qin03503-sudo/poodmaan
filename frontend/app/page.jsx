'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getPodcasts } from '@/lib/api';
import PodcastCard from '@/components/PodcastCard';

export default function Home() {
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPodcasts();
  }, []);

  const loadPodcasts = async () => {
    try {
      const response = await getPodcasts();
      setPodcasts(response.data);
    } catch (err) {
      console.error('Failed to load podcasts:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <h1>🎙️ Podcast Gallery</h1>
          <nav style={styles.nav}>
            <Link href="/" style={styles.link}>Home</Link>
            <Link href="/admin" style={styles.link}>Admin</Link>
          </nav>
        </div>
      </header>

      <main style={styles.main}>
        {loading ? (
          <p>Loading podcasts...</p>
        ) : podcasts.length === 0 ? (
          <p>No podcasts available yet</p>
        ) : (
          <div style={styles.grid}>
            {podcasts.map((podcast) => (
              <PodcastCard key={podcast.id} podcast={podcast} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#fafafa',
  },
  header: {
    backgroundColor: '#fff',
    borderBottom: '1px solid #e5e5e5',
    padding: '20px 0',
  },
  headerContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nav: {
    display: 'flex',
    gap: '20px',
  },
  link: {
    textDecoration: 'none',
    color: '#0070f3',
    fontWeight: '500',
  },
  main: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '40px 20px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '20px',
  },
};
