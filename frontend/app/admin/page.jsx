'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getPodcasts, createPodcast, deletePodcast, uploadFile, createEpisode, deleteEpisode } from '@/lib/api';
import { useParams } from 'next/navigation';

export default function AdminPage() {
  const [view, setView] = useState('podcasts'); // podcasts or episodes
  const [podcasts, setPodcasts] = useState([]);
  const [episodes, setEpisodes] = useState([]);
  const [selectedPodcastId, setSelectedPodcastId] = useState(null);
  const [loading, setLoading] = useState(true);

  // Form states
  const [podcastForm, setPodcastForm] = useState({
    title: '',
    description: '',
    creatorId: '1', // Hardcoded for demo
  });
  const [episodeForm, setEpisodeForm] = useState({
    title: '',
    description: '',
    episodeNumber: '',
  });
  const [coverImageFile, setCoverImageFile] = useState(null);
  const [audioFile, setAudioFile] = useState(null);

  useEffect(() => {
    loadPodcasts();
  }, []);

  useEffect(() => {
    if (selectedPodcastId && view === 'episodes') {
      loadEpisodes(selectedPodcastId);
    }
  }, [selectedPodcastId, view]);

  const loadPodcasts = async () => {
    try {
      const response = await getPodcasts();
      setPodcasts(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Failed to load podcasts:', err);
      setLoading(false);
    }
  };

  const loadEpisodes = async (podcastId) => {
    try {
      const response = await getPodcasts(); // Fetch all
      const podcast = response.data.find(p => p.id === podcastId);
      // For now, we'll fetch episodes differently
      setEpisodes([]);
    } catch (err) {
      console.error('Failed to load episodes:', err);
    }
  };

  const handleCreatePodcast = async (e) => {
    e.preventDefault();
    try {
      let coverImageUrl = null;
      if (coverImageFile) {
        const uploadRes = await uploadFile(coverImageFile);
        coverImageUrl = uploadRes.data.fileUrl;
      }

      await createPodcast({
        title: podcastForm.title,
        description: podcastForm.description,
        creatorId: parseInt(podcastForm.creatorId),
        coverImageUrl,
      });

      setPodcastForm({ title: '', description: '', creatorId: '1' });
      setCoverImageFile(null);
      loadPodcasts();
      alert('Podcast created successfully!');
    } catch (err) {
      alert('Failed to create podcast: ' + err.message);
    }
  };

  const handleCreateEpisode = async (e) => {
    e.preventDefault();
    if (!selectedPodcastId) {
      alert('Please select a podcast first');
      return;
    }

    try {
      let audioFileUrl = null;
      if (audioFile) {
        const uploadRes = await uploadFile(audioFile);
        audioFileUrl = uploadRes.data.fileUrl;
      }

      await createEpisode({
        podcastId: selectedPodcastId,
        title: episodeForm.title,
        description: episodeForm.description,
        audioFileUrl,
        durationSeconds: 0,
        episodeNumber: parseInt(episodeForm.episodeNumber),
      });

      setEpisodeForm({ title: '', description: '', episodeNumber: '' });
      setAudioFile(null);
      loadEpisodes(selectedPodcastId);
      alert('Episode created successfully!');
    } catch (err) {
      alert('Failed to create episode: ' + err.message);
    }
  };

  const handleDeletePodcast = async (id) => {
    if (!confirm('Are you sure?')) return;
    try {
      await deletePodcast(id);
      loadPodcasts();
    } catch (err) {
      alert('Failed to delete podcast');
    }
  };

  const handleDeleteEpisode = async (id) => {
    if (!confirm('Are you sure?')) return;
    try {
      await deleteEpisode(id);
      loadEpisodes(selectedPodcastId);
    } catch (err) {
      alert('Failed to delete episode');
    }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>🎙️ Admin Panel</h1>
        <Link href="/" style={styles.backLink}>← Back to Home</Link>
      </header>

      <div style={styles.tabs}>
        <button
          onClick={() => setView('podcasts')}
          style={{ ...styles.tab, ...(view === 'podcasts' ? styles.tabActive : {}) }}
        >
          Manage Podcasts
        </button>
        <button
          onClick={() => setView('episodes')}
          style={{ ...styles.tab, ...(view === 'episodes' ? styles.tabActive : {}) }}
        >
          Manage Episodes
        </button>
      </div>

      <div style={styles.content}>
        {view === 'podcasts' ? (
          <div>
            <h2>Create New Podcast</h2>
            <form onSubmit={handleCreatePodcast} style={styles.form}>
              <div style={styles.formGroup}>
                <label>Title</label>
                <input
                  type="text"
                  value={podcastForm.title}
                  onChange={(e) => setPodcastForm({ ...podcastForm, title: e.target.value })}
                  required
                  style={styles.input}
                />
              </div>

              <div style={styles.formGroup}>
                <label>Description</label>
                <textarea
                  value={podcastForm.description}
                  onChange={(e) => setPodcastForm({ ...podcastForm, description: e.target.value })}
                  style={styles.textarea}
                />
              </div>

              <div style={styles.formGroup}>
                <label>Cover Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setCoverImageFile(e.target.files?.[0])}
                  style={styles.input}
                />
              </div>

              <button type="submit" style={styles.submitBtn}>Create Podcast</button>
            </form>

            <h2 style={{ marginTop: '40px' }}>Existing Podcasts</h2>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <div style={styles.podcastsList}>
                {podcasts.map((podcast) => (
                  <div key={podcast.id} style={styles.podcastItem}>
                    <div>
                      <h3>{podcast.title}</h3>
                      <p>{podcast.description?.substring(0, 100)}</p>
                    </div>
                    <button
                      onClick={() => handleDeletePodcast(podcast.id)}
                      style={styles.deleteBtn}
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div>
            <div style={styles.formGroup}>
              <label>Select Podcast</label>
              <select
                value={selectedPodcastId || ''}
                onChange={(e) => setSelectedPodcastId(parseInt(e.target.value))}
                style={styles.input}
              >
                <option value="">-- Select a podcast --</option>
                {podcasts.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.title}
                  </option>
                ))}
              </select>
            </div>

            {selectedPodcastId && (
              <>
                <h2>Create New Episode</h2>
                <form onSubmit={handleCreateEpisode} style={styles.form}>
                  <div style={styles.formGroup}>
                    <label>Title</label>
                    <input
                      type="text"
                      value={episodeForm.title}
                      onChange={(e) => setEpisodeForm({ ...episodeForm, title: e.target.value })}
                      required
                      style={styles.input}
                    />
                  </div>

                  <div style={styles.formGroup}>
                    <label>Episode Number</label>
                    <input
                      type="number"
                      value={episodeForm.episodeNumber}
                      onChange={(e) => setEpisodeForm({ ...episodeForm, episodeNumber: e.target.value })}
                      style={styles.input}
                    />
                  </div>

                  <div style={styles.formGroup}>
                    <label>Description</label>
                    <textarea
                      value={episodeForm.description}
                      onChange={(e) => setEpisodeForm({ ...episodeForm, description: e.target.value })}
                      style={styles.textarea}
                    />
                  </div>

                  <div style={styles.formGroup}>
                    <label>Audio File</label>
                    <input
                      type="file"
                      accept="audio/*"
                      onChange={(e) => setAudioFile(e.target.files?.[0])}
                      required
                      style={styles.input}
                    />
                  </div>

                  <button type="submit" style={styles.submitBtn}>Create Episode</button>
                </form>
              </>
            )}
          </div>
        )}
      </div>
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
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px',
    borderBottom: '1px solid #e5e5e5',
    paddingBottom: '20px',
  },
  backLink: {
    color: '#0070f3',
    fontSize: '14px',
  },
  tabs: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
    borderBottom: '1px solid #e5e5e5',
  },
  tab: {
    padding: '10px 20px',
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    fontSize: '16px',
    borderBottom: '2px solid transparent',
  },
  tabActive: {
    borderBottomColor: '#0070f3',
    color: '#0070f3',
  },
  content: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
  },
  form: {
    marginTop: '20px',
  },
  formGroup: {
    marginBottom: '20px',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginTop: '5px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '14px',
    fontFamily: 'inherit',
  },
  textarea: {
    width: '100%',
    padding: '10px',
    marginTop: '5px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '14px',
    fontFamily: 'inherit',
    minHeight: '100px',
  },
  submitBtn: {
    padding: '10px 20px',
    backgroundColor: '#0070f3',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  podcastsList: {
    marginTop: '20px',
  },
  podcastItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px',
    borderBottom: '1px solid #e5e5e5',
  },
  deleteBtn: {
    padding: '5px 10px',
    backgroundColor: '#ff6b6b',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '12px',
  },
};
