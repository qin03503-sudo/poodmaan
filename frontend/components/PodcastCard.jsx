'use client';

import Link from 'next/link';

export default function PodcastCard({ podcast }) {
  return (
    <Link href={`/podcast/${podcast.id}`}>
      <div style={styles.card}>
        {podcast.cover_image_url && (
          <img 
            src={podcast.cover_image_url} 
            alt={podcast.title}
            style={styles.image}
          />
        )}
        <div style={styles.content}>
          <h3 style={styles.title}>{podcast.title}</h3>
          <p style={styles.creator}>by {podcast.creator_name}</p>
          <p style={styles.description}>{podcast.description?.substring(0, 100)}...</p>
          <p style={styles.followers}>{podcast.follower_count || 0} followers</p>
        </div>
      </div>
    </Link>
  );
}

const styles = {
  card: {
    backgroundColor: '#fff',
    border: '1px solid #e5e5e5',
    borderRadius: '8px',
    overflow: 'hidden',
    cursor: 'pointer',
    transition: 'transform 0.2s',
    '&:hover': {
      transform: 'scale(1.02)',
    },
  },
  image: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    backgroundColor: '#f0f0f0',
  },
  content: {
    padding: '15px',
  },
  title: {
    fontSize: '18px',
    fontWeight: 'bold',
    margin: '0 0 5px 0',
  },
  creator: {
    fontSize: '14px',
    color: '#666',
    margin: '0 0 10px 0',
  },
  description: {
    fontSize: '13px',
    color: '#999',
    margin: '0 0 10px 0',
  },
  followers: {
    fontSize: '12px',
    color: '#0070f3',
  },
};
