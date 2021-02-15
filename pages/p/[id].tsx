import React from 'react'
import { GetServerSideProps } from 'next'
import Router from 'next/router'
import { useSession } from 'next-auth/client'
import ReactMarkdown from 'react-markdown'
import Layout from '../../components/Layout'
import { PostProps } from '../../components/Post'
import prisma from '../../lib/prisma'
import { Box, Center, Spinner, Button, Text } from '@chakra-ui/react'

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

async function deletePost(id: number): Promise<void> {
  await fetch(`/api/post/${id}`, {
    method: 'DELETE',
  })
  Router.push('/', null, { shallow: true })
}

const Post: React.FC<PostProps> = (props) => {
  const [session, loading] = useSession()

  if (loading) {
    return (
      <Center h="100%" w="100%">
        <Spinner size="xl" />
      </Center>
    )
  }

  const userHasValidSession = Boolean(session)
  const postBelongsToUser = session?.user?.email === props.author?.email
  console.log(session?.user?.email + props.author?.email)

  let title = props.title
  if (!props.published) {
    title = `${title} (Draft)`
  }

  return (
    <Layout>
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
      <Box>
        {userHasValidSession && postBelongsToUser && (
          <Button size="lg" m="2" colorScheme="blue" onClick={() => deletePost(props.id)}>
            Delete
          </Button>
        )}
      </Box>
    </Layout>
  )
}

export default Post
