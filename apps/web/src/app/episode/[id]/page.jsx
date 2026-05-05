import Link from 'next/link';
import { Button } from '@poodmaan/ui/components/button';
import { Card, CardContent } from '@poodmaan/ui/components/card';
import AudioPlayer from '@/components/AudioPlayer';
import { getEpisodeById } from '@/lib/api';

export default async function EpisodePage({ params }) {
  const { id } = await params;
  const episode = await getEpisodeById(id);

  return (
    <main className="page-shell">
      <nav className="topbar">
        <Button asChild variant="ghost"><Link href="/">Home</Link></Button>
      </nav>
      <section className="hero">
        <div className="eyebrow">Episode {episode.episode_number || ''}</div>
        <h1>{episode.title}</h1>
      </section>
      <div className="stack">
        <AudioPlayer episodeTitle={episode.title} audioUrl={episode.audio_file_url} />
        <Card>
          <CardContent>
            <p>{episode.description || 'No description yet.'}</p>
            <p className="meta">Published {episode.published_at ? new Date(episode.published_at).toLocaleDateString() : 'recently'}</p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
