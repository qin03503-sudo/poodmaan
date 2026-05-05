import '@poodmaan/ui/styles.css';

export const metadata = {
  title: 'Poodmaan',
  description: 'A simple podcast listening app',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
