import React from 'react'
import { GetStaticProps } from 'next'
import Layout from '../components/Layout'
import Post, { PostProps } from '../components/Post'
import { Wrap, WrapItem, Heading, Box } from '@chakra-ui/react'
import prisma from '../lib/prisma'

export const getStaticProps: GetStaticProps = async () => {
  const feed = await prisma.post.findMany({
    where: { published: true },
    include: {
      author: {
        select: { name: true },
      },
    },
  })
  return {
    props: { feed },
    revalidate: 1, // In seconds
  }
}

type Props = {
  feed: PostProps[]
}

const Feed: React.FC<Props> = (props) => {
  return (
    <Layout title="Public Feed">
      <Box>
        <Heading mt="4" mb="4">
          Public Feed
        </Heading>
      </Box>
      <Wrap spacing="20px">
        {props.feed.map((post) => (
          <WrapItem
            key={post.id}
            width="45%"
            p="4"
            borderRadius="none"
            border="2px"
            borderColor="gray.200"
          >
            <Post post={post} />
          </WrapItem>
        ))}
      </Wrap>
    </Layout>
  )
}

export default Feed
