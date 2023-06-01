import Head from 'next/head';
import { ReactNode } from 'react';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

type Props = {
  children: JSX.Element | JSX.Element[] | ReactNode;
  title: string;
  className?: string;
  footer?: boolean;
  bgGradient?: boolean;
};

export default function PageLayout({
  children,
  title,
  className,
  footer = true,
  bgGradient = false,
}: Props) {
  const pageTitle = `FU3 | ${title}`;
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className={`mt-16 flex-1 ${className} ${bgGradient ? gradientStyle : ''}`}>
          {children}
        </main>
        {footer && <Footer />}
      </div>
    </>
  );
}

const gradientStyle =
  "relative after:content-[''] after:-z-20 after:fixed after:h-screen after:w-screen after:top-0 after:left-0 after:bg-gradient-to-b after:from-black after:to-emerald-950";
