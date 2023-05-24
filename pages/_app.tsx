import { DataProvider } from '@/context/DataContext'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { } from '@next/font/local'
import Script from 'next/script'
import Document from './_document'


export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <DataProvider >

        <div id="modal"></div>

        <Component {...pageProps} />
      </DataProvider >

    </>
  )
}
