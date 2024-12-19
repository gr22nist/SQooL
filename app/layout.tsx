import '@/styles/globals.css';
import { nanum, elice } from '@/lib/font';
import BaseLayout from '@/app/BaseLayout';

export const metadata = {
  title: {
    template: '%s | SQooL',
    default: 'SQooL',
  },
  description: '한글 데이터로 배우는 마음 편한 SQLite!',
  openGraph: {
    title: 'SQooL',
    description: '한글 데이터로 배우는 마음 편한 SQLite!',
    images: '/img/wise-meta-img.jpg',
    url: 'https://sqool.kr',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SQooL',
    description: '한글 데이터로 배우는 마음 편한 SQLite!',
    images: '/img/wise-meta-img-tw.jpg',
  },
  verification: {
    google: 'M0yA1GfTchsrHTZERt45sLXDU7RjbWwlaPWRjo3wkUI',
    naver: 'fc8db8a4e1673f39e0b3be97f060bf4019c8e286',
  },
}

export default function RootLayout({ 
  children, 
}: { 
  children: React.ReactNode 
}) {
  return (
    <html lang="ko" className={`${nanum.variable} ${elice.variable}`}>
      <body>
        <BaseLayout>
          {children}
        </BaseLayout>
      </body>
    </html>
  )
}