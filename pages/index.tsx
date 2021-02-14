import React from 'react'
import { GetStaticProps } from 'next'
import Layout from '../components/Layout'
import Post, { PostProps } from '../components/Post'
import { Heading, Box } from '@chakra-ui/react'
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
  return { props: { feed } }
}

type Props = {
  feed: PostProps[]
}

const Blog: React.FC<Props> = (props) => {
  return (
    <Layout>
      <Heading>Public Feed</Heading>
      {props.feed.map((post) => (
        <Box
          key={post.id}
          m={2}
          p={4}
          width="50%"
          borderRadius="lg"
          border="2px"
          borderColor="gray.200"
        >
          <Post post={post} />
        </Box>
      ))}
    </Layout>
  )
}

export default Blog
