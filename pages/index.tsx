import React from 'react'
import { GetStaticProps } from 'next'
import Layout from '../components/Layout'
import Post, { PostProps } from '../components/Post'
import { Heading, Box } from '@chakra-ui/react'

export const getStaticProps: GetStaticProps = async () => {
  const feed = [
    {
      id: 1,
      title: 'Prisma is the perfect ORM for Next.js',
      content: '[Prisma](https://github.com/prisma/prisma) and Next.js go _great_ together!',
      published: false,
      author: {
        name: 'Nikolas Burk',
        email: 'burk@prisma.io',
      },
    },
  ]
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
