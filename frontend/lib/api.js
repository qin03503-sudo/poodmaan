import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

// Podcasts
export const getPodcasts = () => api.get('/podcasts');
export const getPodcastById = (id) => api.get(`/podcasts/${id}`);
export const createPodcast = (data) => api.post('/podcasts', data);
export const updatePodcast = (id, data) => api.put(`/podcasts/${id}`, data);
export const deletePodcast = (id) => api.delete(`/podcasts/${id}`);

// Episodes
export const getEpisodes = (podcastId) => api.get(`/episodes/podcast/${podcastId}`);
export const getEpisodeById = (id) => api.get(`/episodes/${id}`);
export const createEpisode = (data) => api.post('/episodes', data);
export const updateEpisode = (id, data) => api.put(`/episodes/${id}`, data);
export const deleteEpisode = (id) => api.delete(`/episodes/${id}`);

// Upload
export const uploadFile = (file) => {
  const formData = new FormData();
  formData.append('file', file);
  return api.post('/upload/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export default api;
