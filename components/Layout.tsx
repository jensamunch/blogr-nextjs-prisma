import React, { ReactNode } from 'react'
import Header from './Header'
import { Box, Flex } from '@chakra-ui/react'

type Props = {
  children: ReactNode
}

const Layout: React.FC<Props> = (props) => (
  <Flex align="center" justify="center">
    <Box w="1200px" m="4">
      <Header />
      {props.children}
    </Box>
  </Flex>
)

export default Layout
