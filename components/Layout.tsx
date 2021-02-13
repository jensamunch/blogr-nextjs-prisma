import React, { ReactNode } from 'react'
import Header from './Header'
import { Flex } from '@chakra-ui/react'

type Props = {
  children: ReactNode
}

const Layout: React.FC<Props> = (props) => (
  <div>
    <Header />
    <Flex direction="column" align="center" maxW={{ xl: '1200px' }} m="0 auto">
      {props.children}
    </Flex>
  </div>
)

export default Layout
