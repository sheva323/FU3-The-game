import Head from 'next/head';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

type Props = {
  children: JSX.Element | JSX.Element[];
  title: string;
  className?: string;
  footer?: boolean;
};

export default function PageLayout({ children, title, className, footer = true }: Props) {
  const pageTitle = `FUT3 | ${title}`;
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className={`mt-16 flex-1 ${className}`}>{children}</main>
        {footer && <Footer />}
      </div>
    </>
  );
}
