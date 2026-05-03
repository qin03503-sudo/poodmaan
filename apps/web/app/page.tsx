export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Discover Your Next Favorite Podcast
        </h1>
        <p className="text-xl text-muted-foreground mb-6 max-w-2xl mx-auto">
          Stream millions of podcasts, create your own show, and connect with listeners worldwide.
        </p>
        <div className="flex gap-4 justify-center">
          <button className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium">
            Start Listening
          </button>
          <button className="border border-input bg-background px-6 py-3 rounded-lg font-medium hover:bg-accent">
            Start Creating
          </button>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Continue Listening</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {/* Placeholder cards */}
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-square bg-muted flex items-center justify-center">
                <span className="text-muted-foreground">Episode Art</span>
              </div>
              <div className="p-4">
                <h3 className="font-semibold mb-1">Episode Title</h3>
                <p className="text-sm text-muted-foreground mb-2">Podcast Name</p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>45 min</span>
                  <span>•</span>
                  <span>3 days ago</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Trending Now</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="text-center">
              <div className="aspect-square bg-muted rounded-lg mb-2 flex items-center justify-center">
                <span className="text-muted-foreground">Cover</span>
              </div>
              <h3 className="text-sm font-medium">Podcast Name</h3>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Browse by Category</h2>
        <div className="flex flex-wrap gap-2">
          {['Technology', 'Comedy', 'News', 'Sports', 'Business', 'Health', 'Education', 'Arts'].map((cat) => (
            <button key={cat} className="border border-input bg-background px-4 py-2 rounded-full text-sm hover:bg-accent">
              {cat}
            </button>
          ))}
        </div>
      </section>
    </div>
  )
}
