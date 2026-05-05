import Link from 'next/link';
import { Card, CardContent, CardDescription, CardTitle } from '@poodmaan/ui/components/card';

export default function PodcastCard({ podcast }) {
  return (
    <Link href={`/podcast/${podcast.id}`}>
      <Card>
        {podcast.cover_image_url ? (
          <img className="cover" src={podcast.cover_image_url} alt={podcast.title} />
        ) : (
          <div className="cover" />
        )}
        <CardContent>
          <CardTitle>{podcast.title}</CardTitle>
          <p className="meta">by {podcast.creator_name}</p>
          <CardDescription>{podcast.description?.substring(0, 120) || 'No description yet.'}</CardDescription>
          <p className="eyebrow" style={{ marginTop: 14 }}>{podcast.follower_count || 0} followers</p>
        </CardContent>
      </Card>
    </Link>
  );
}
