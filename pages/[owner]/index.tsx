import React from 'react'
import Layout from '../../components/Layout'
import { Wrap, WrapItem, Heading, Box } from '@chakra-ui/react'

type Props = {
  feed: string
}

const MyFeed: React.FC<Props> = (props) => {
  return (
    <Layout title="My Posts">
      <Box>
        <Heading pb="4">My Posts</Heading>
      </Box>
      <Wrap spacing="20px">
        <WrapItem
          key="1"
          width="45%"
          p="4"
          borderRadius="lg"
          border="2px"
          borderColor="gray.200"
        ></WrapItem>
      </Wrap>
    </Layout>
  )
}

export default MyFeed
