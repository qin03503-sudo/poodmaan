import Link from 'next/link';
import { Button } from '@poodmaan/ui/components/button';
import PodcastCard from '@/components/PodcastCard';
import { getPodcasts } from '@/lib/api';

export default async function Home() {
  const podcasts = await getPodcasts();

  return (
    <main className="page-shell">
      <nav className="topbar">
        <div className="brand">Poodmaan</div>
        <Button asChild variant="ghost"><Link href="/">Listener app</Link></Button>
      </nav>

      <section className="hero">
        <div className="eyebrow">Independent audio</div>
        <h1>Small-batch podcasts with a warm analog feel.</h1>
        <p>Browse shows, open an episode, and listen through the Creator Studio BFF powered by Next.js App Router APIs.</p>
      </section>

      {podcasts.length === 0 ? (
        <p className="meta">No podcasts available yet.</p>
      ) : (
        <section className="grid">
          {podcasts.map((podcast) => <PodcastCard key={podcast.id} podcast={podcast} />)}
        </section>
      )}
    </main>
  );
}
