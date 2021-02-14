import React, { ReactNode } from 'react'
import Header from './Header'
import { Flex } from '@chakra-ui/react'

type Props = {
  children: ReactNode
}

const Layout: React.FC<Props> = (props) => (
  <div>
    <Header />
    <Flex direction="column" maxW={{ xl: '1200px' }} m="4">
      {props.children}
    </Flex>
  </div>
)

export default Layout
