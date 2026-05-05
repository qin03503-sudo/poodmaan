import express from 'express';
import { getPodcasts, getPodcastById, createPodcast, updatePodcast, deletePodcast } from '../controllers/podcast.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const podcasts = await getPodcasts();
    res.json(podcasts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const podcast = await getPodcastById(req.params.id);
    if (!podcast) return res.status(404).json({ error: 'Podcast not found' });
    res.json(podcast);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { title, description, creatorId, coverImageUrl } = req.body;
    const podcast = await createPodcast(title, description, creatorId, coverImageUrl);
    res.status(201).json(podcast);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { title, description, coverImageUrl } = req.body;
    const podcast = await updatePodcast(req.params.id, title, description, coverImageUrl);
    if (!podcast) return res.status(404).json({ error: 'Podcast not found' });
    res.json(podcast);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const success = await deletePodcast(req.params.id);
    if (!success) return res.status(404).json({ error: 'Podcast not found' });
    res.json({ message: 'Podcast deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
