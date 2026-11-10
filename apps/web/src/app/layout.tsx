import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Nexus Vault — Next-Gen Digital Video Game Library',
  description:
    'Enterprise-grade digital game vault, playtime tracking, achievement showcases, and community reviews.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#080a0f] text-slate-100 antialiased selection:bg-cyan-500 selection:text-slate-950">
        {/* Subtle Ambient Cyber Light Flares */}
        <div className="fixed top-0 left-1/4 -z-10 h-[500px] w-[500px] rounded-full bg-cyan-600/10 blur-[130px] pointer-events-none" />
        <div className="fixed top-1/3 right-1/4 -z-10 h-[600px] w-[600px] rounded-full bg-indigo-600/10 blur-[150px] pointer-events-none" />
        <div className="fixed bottom-0 left-1/3 -z-10 h-[500px] w-[500px] rounded-full bg-purple-600/10 blur-[140px] pointer-events-none" />

        <div className="flex min-h-screen flex-col">{children}</div>
      </body>
    </html>
  );
}
