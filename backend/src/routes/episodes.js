import express from 'express';
import { getEpisodes, getEpisodeById, createEpisode, updateEpisode, deleteEpisode } from '../controllers/episode.js';

const router = express.Router();

router.get('/podcast/:podcastId', async (req, res) => {
  try {
    const episodes = await getEpisodes(req.params.podcastId);
    res.json(episodes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const episode = await getEpisodeById(req.params.id);
    if (!episode) return res.status(404).json({ error: 'Episode not found' });
    res.json(episode);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { podcastId, title, description, audioFileUrl, durationSeconds, episodeNumber } = req.body;
    const episode = await createEpisode(podcastId, title, description, audioFileUrl, durationSeconds, episodeNumber);
    res.status(201).json(episode);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { title, description, durationSeconds } = req.body;
    const episode = await updateEpisode(req.params.id, title, description, durationSeconds);
    if (!episode) return res.status(404).json({ error: 'Episode not found' });
    res.json(episode);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const success = await deleteEpisode(req.params.id);
    if (!success) return res.status(404).json({ error: 'Episode not found' });
    res.json({ message: 'Episode deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
