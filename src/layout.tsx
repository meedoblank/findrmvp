import './globals.css';
import { Poppins } from 'next/font/google';

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '600'] });

export const metadata = {
  title: 'Wayfindr',
  description: 'Ask anything. Travel smart.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${poppins.className} bg-white text-black`}>
        {children}
      </body>
    </html>
  );
}
