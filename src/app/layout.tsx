import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/header';
import { ModalProvider } from '@/contexts/modal-context/ModalContext';
import Provider from './provider';
import axios from 'axios';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Ballang',
  description: 'toy project Ballang',
};

axios.defaults.withCredentials = true;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <ModalProvider>
            <Header />
            {children}
          </ModalProvider>
        </Provider>
      </body>
    </html>
  );
}
