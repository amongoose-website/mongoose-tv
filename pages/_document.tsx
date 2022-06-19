import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head />
      <body className='dark:bg-zinc-900 bg-gray-100'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}