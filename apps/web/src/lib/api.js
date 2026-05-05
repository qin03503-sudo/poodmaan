const API_URL = process.env.ADMIN_API_URL || 'http://localhost:3001/api';

async function request(path) {
  const response = await fetch(`${API_URL}${path}`, { cache: 'no-store' });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || response.statusText);
  }

  return data;
}

export const getPodcasts = () => request('/podcasts');
export const getPodcastById = (id) => request(`/podcasts/${id}`);
export const getEpisodes = (podcastId) => request(`/episodes/podcast/${podcastId}`);
export const getEpisodeById = (id) => request(`/episodes/${id}`);
