import React from 'react'
import { GetServerSideProps } from 'next'
import ReactMarkdown from 'react-markdown'
import Layout from '../../components/Layout'
import { PostProps } from '../../components/Post'
import prisma from '../../lib/prisma'
import { Box, Text } from '@chakra-ui/react'

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const post = await prisma.post.findUnique({
    where: {
      id: Number(params?.id) || -1,
    },
    include: {
      author: {
        select: { name: true, email: true },
      },
    },
  })
  return {
    props: post,
  }
}

const Post: React.FC<PostProps> = (props) => {
  const title = props.title
  return (
    <Layout title="My First Blog">
      <Box>
        <Text fontSize="lg" fontWeight="bold">
          {title}
        </Text>
        <Text mb={4} fontSize="sm">
          {props?.author?.name || 'Unknown author'} - {props?.author?.email || 'Unknown Email'}
        </Text>
        <Text mb={4} fontSize="sm">
          <ReactMarkdown source={props.content} />
        </Text>
      </Box>
    </Layout>
  )
}

export default Post
