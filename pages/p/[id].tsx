import React from 'react'
import { GetServerSideProps } from 'next'
import ReactMarkdown from 'react-markdown'
import Layout from '../../components/Layout'
import { PostProps } from '../../components/Post'
import prisma from '../../lib/prisma'
import { Text } from '@chakra-ui/react'

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const post = await prisma.post.findUnique({
    where: {
      id: Number(params?.id) || -1,
    },
    include: {
      author: {
        select: { name: true },
      },
    },
  })
  return {
    props: post,
  }
}

const Post: React.FC<PostProps> = (props) => {
  let title = props.title
  if (!props.published) {
    title = `${title} (Draft)`
  }

  return (
    <Layout>
      <Text fontSize="lg" fontWeight="bold">
        {title}
      </Text>
      <Text mb={4} fontSize="sm">
        By {props?.author?.name || 'Unknown author'}
      </Text>
      <Text mb={4} fontSize="sm">
        <ReactMarkdown source={props.content} />
      </Text>
    </Layout>
  )
}

export default Post
