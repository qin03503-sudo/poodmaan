import '@poodmaan/ui/styles.css';

export const metadata = {
  title: 'Poodmaan Admin',
  description: 'Podcast content management',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
