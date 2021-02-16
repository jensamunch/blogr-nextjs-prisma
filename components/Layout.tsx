import React, { ReactNode } from 'react'
import Header from './Header'
import { Box, Flex } from '@chakra-ui/react'
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
    </Head>
    <Flex align="center" justify="center">
      <Box w="1200px" m="4">
        <Header />
        {props.children}
      </Box>
    </Flex>
  </div>
)

export default Layout
