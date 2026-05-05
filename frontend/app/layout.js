import './globals.css';

export const metadata = {
  title: 'Podcast Platform',
  description: 'Listen to your favorite podcasts',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
