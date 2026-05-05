'use client';

async function request(path, options = {}) {
  const response = await fetch(path, options);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || response.statusText);
  }

  return { data };
}

export const getPodcasts = () => request('/api/podcasts');
export const createPodcast = (data) => request('/api/podcasts', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data),
});
export const deletePodcast = (id) => request(`/api/podcasts/${id}`, { method: 'DELETE' });
export const getEpisodes = (podcastId) => request(`/api/episodes/podcast/${podcastId}`);
export const createEpisode = (data) => request('/api/episodes', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data),
});
export const deleteEpisode = (id) => request(`/api/episodes/${id}`, { method: 'DELETE' });
export const uploadFile = (file) => {
  const formData = new FormData();
  formData.append('file', file);
  return request('/api/upload', { method: 'POST', body: formData });
};
