import React, { ReactNode } from 'react'
import Header from './Header'
import Head from 'next/head'

type Props = {
  children: ReactNode
  title: string
}

const Layout: React.FC<Props> = (props) => (
  <div>
    <Head>
      <title>{props.title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link rel="icon" type="image/png" href="/favicon.ico" />
    </Head>
    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 pb-10">
      <Header />
      {props.children}
    </div>
  </div>
)

export default Layout
