import Head from 'next/head'

export const Meta = ({ children }) => {
  return (
    <Head>
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href=""
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href=""
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href=""
      />
      <link rel="manifest" href="" />
      <link
        rel="mask-icon"
        href=""
        color="#000000"
      />
      <link rel="shortcut icon" href="" />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="msapplication-config" content="" />
      <meta name="theme-color" content="#000" />
      <link rel="alternate" type="application/rss+xml" href="" />
      <meta
        name="description"
        content={'A statically generated blog example using Next.js.'}
      />
      <meta property="og:image" content='' />
    </Head>
  )
}
