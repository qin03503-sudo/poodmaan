'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button } from '@poodmaan/ui/components/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@poodmaan/ui/components/card';
import { Input } from '@poodmaan/ui/components/input';
import { Label } from '@poodmaan/ui/components/label';
import { Textarea } from '@poodmaan/ui/components/textarea';
import { createEpisode, createPodcast, deleteEpisode, deletePodcast, getEpisodes, getPodcasts, uploadFile } from '@/lib/api';

export default function AdminPage() {
  const [view, setView] = useState('podcasts');
  const [podcasts, setPodcasts] = useState([]);
  const [episodes, setEpisodes] = useState([]);
  const [selectedPodcastId, setSelectedPodcastId] = useState('');
  const [loading, setLoading] = useState(true);
  const [podcastForm, setPodcastForm] = useState({ title: '', description: '', creatorId: '1' });
  const [episodeForm, setEpisodeForm] = useState({ title: '', description: '', episodeNumber: '' });
  const [coverImageFile, setCoverImageFile] = useState(null);
  const [audioFile, setAudioFile] = useState(null);

  useEffect(() => {
    loadPodcasts();
  }, []);

  useEffect(() => {
    if (selectedPodcastId) loadEpisodes(selectedPodcastId);
  }, [selectedPodcastId]);

  async function loadPodcasts() {
    try {
      const response = await getPodcasts();
      setPodcasts(response.data);
    } finally {
      setLoading(false);
    }
  }

  async function loadEpisodes(podcastId) {
    const response = await getEpisodes(podcastId);
    setEpisodes(response.data);
  }

  async function handleCreatePodcast(event) {
    event.preventDefault();
    let coverImageUrl = null;

    if (coverImageFile) {
      const upload = await uploadFile(coverImageFile);
      coverImageUrl = upload.data.fileUrl;
    }

    await createPodcast({
      title: podcastForm.title,
      description: podcastForm.description,
      creatorId: Number(podcastForm.creatorId),
      coverImageUrl,
    });

    setPodcastForm({ title: '', description: '', creatorId: '1' });
    setCoverImageFile(null);
    await loadPodcasts();
  }

  async function handleCreateEpisode(event) {
    event.preventDefault();
    if (!selectedPodcastId || !audioFile) return;

    const upload = await uploadFile(audioFile);
    await createEpisode({
      podcastId: Number(selectedPodcastId),
      title: episodeForm.title,
      description: episodeForm.description,
      audioFileUrl: upload.data.fileUrl,
      durationSeconds: 0,
      episodeNumber: Number(episodeForm.episodeNumber || 0),
    });

    setEpisodeForm({ title: '', description: '', episodeNumber: '' });
    setAudioFile(null);
    await loadEpisodes(selectedPodcastId);
  }

  return (
    <main className="page-shell">
      <nav className="topbar">
        <div>
          <div className="eyebrow">Creator service</div>
          <div className="brand">Creator Studio</div>
        </div>
        <Button asChild variant="ghost"><Link href="http://localhost:3000">Open listener app</Link></Button>
      </nav>

      <div className="topbar" style={{ justifyContent: 'flex-start' }}>
        <Button variant={view === 'podcasts' ? 'default' : 'ghost'} onClick={() => setView('podcasts')}>Podcasts</Button>
        <Button variant={view === 'episodes' ? 'default' : 'ghost'} onClick={() => setView('episodes')}>Episodes</Button>
      </div>

      {view === 'podcasts' ? (
        <section className="two-column">
          <Card>
            <CardHeader>
              <CardTitle>Create podcast</CardTitle>
              <CardDescription>Add a show and optional cover art.</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="form-grid" onSubmit={handleCreatePodcast}>
                <div><Label>Title</Label><Input value={podcastForm.title} onChange={(e) => setPodcastForm({ ...podcastForm, title: e.target.value })} required /></div>
                <div><Label>Description</Label><Textarea value={podcastForm.description} onChange={(e) => setPodcastForm({ ...podcastForm, description: e.target.value })} /></div>
                <div><Label>Cover image</Label><Input type="file" accept="image/*" onChange={(e) => setCoverImageFile(e.target.files?.[0] || null)} /></div>
                <Button type="submit">Create podcast</Button>
              </form>
            </CardContent>
          </Card>

          <div className="stack">
            {loading ? <p className="meta">Loading...</p> : podcasts.map((podcast) => (
              <Card key={podcast.id}>
                <CardContent className="topbar" style={{ marginBottom: 0 }}>
                  <div>
                    <CardTitle>{podcast.title}</CardTitle>
                    <CardDescription>{podcast.description?.substring(0, 120)}</CardDescription>
                  </div>
                  <Button variant="destructive" size="sm" onClick={async () => { await deletePodcast(podcast.id); await loadPodcasts(); }}>Delete</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      ) : (
        <section className="two-column">
          <Card>
            <CardHeader>
              <CardTitle>Create episode</CardTitle>
              <CardDescription>Upload audio into MinIO and attach it to a podcast.</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="form-grid" onSubmit={handleCreateEpisode}>
                <div>
                  <Label>Podcast</Label>
                  <select className="ui-input" value={selectedPodcastId} onChange={(e) => setSelectedPodcastId(e.target.value)} required>
                    <option value="">Select a podcast</option>
                    {podcasts.map((podcast) => <option key={podcast.id} value={podcast.id}>{podcast.title}</option>)}
                  </select>
                </div>
                <div><Label>Title</Label><Input value={episodeForm.title} onChange={(e) => setEpisodeForm({ ...episodeForm, title: e.target.value })} required /></div>
                <div><Label>Episode number</Label><Input type="number" value={episodeForm.episodeNumber} onChange={(e) => setEpisodeForm({ ...episodeForm, episodeNumber: e.target.value })} /></div>
                <div><Label>Description</Label><Textarea value={episodeForm.description} onChange={(e) => setEpisodeForm({ ...episodeForm, description: e.target.value })} /></div>
                <div><Label>Audio file</Label><Input type="file" accept="audio/*" onChange={(e) => setAudioFile(e.target.files?.[0] || null)} required /></div>
                <Button type="submit">Create episode</Button>
              </form>
            </CardContent>
          </Card>

          <div className="stack">
            {episodes.map((episode) => (
              <Card key={episode.id}>
                <CardContent className="topbar" style={{ marginBottom: 0 }}>
                  <div>
                    <CardTitle>{episode.title}</CardTitle>
                    <CardDescription>{episode.description?.substring(0, 120)}</CardDescription>
                  </div>
                  <Button variant="destructive" size="sm" onClick={async () => { await deleteEpisode(episode.id); await loadEpisodes(selectedPodcastId); }}>Delete</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
