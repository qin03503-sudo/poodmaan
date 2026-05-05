import Link from 'next/link';
import { Button } from '@poodmaan/ui/components/button';
import { Card, CardContent, CardDescription, CardTitle } from '@poodmaan/ui/components/card';
import { getEpisodes, getPodcastById } from '@/lib/api';

export default async function PodcastPage({ params }) {
  const { id } = await params;
  const [podcast, episodes] = await Promise.all([getPodcastById(id), getEpisodes(id)]);

  return (
    <main className="page-shell">
      <nav className="topbar">
        <Button asChild variant="ghost"><Link href="/">Back</Link></Button>
      </nav>

      <section className="two-column">
        <div className="hero">
          <div className="eyebrow">{podcast.creator_name}</div>
          <h1>{podcast.title}</h1>
          <p>{podcast.description}</p>
          <p className="meta">{podcast.follower_count} followers · {episodes.length} episodes</p>
        </div>
        {podcast.cover_image_url ? <img className="cover ui-card" src={podcast.cover_image_url} alt={podcast.title} /> : <div className="cover ui-card" />}
      </section>

      <section className="stack">
        {episodes.length === 0 ? <p className="meta">No episodes yet.</p> : episodes.map((episode) => (
          <Link key={episode.id} href={`/episode/${episode.id}`}>
            <Card>
              <CardContent>
                <CardTitle>{episode.title}</CardTitle>
                <CardDescription>{episode.description?.substring(0, 160) || 'No description yet.'}</CardDescription>
              </CardContent>
            </Card>
          </Link>
        ))}
      </section>
    </main>
  );
}
