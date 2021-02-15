import React, { useState } from 'react'
import { GetStaticProps } from 'next'
import Router from 'next/router'
import { useSession } from 'next-auth/client'
import ReactMarkdown from 'react-markdown'
import Layout from '../../components/Layout'
import { PostProps } from '../../components/Post'
import prisma from '../../lib/prisma'
import { Box, Center, Spinner, Button, Text } from '@chakra-ui/react'

export const getStaticProps: GetStaticProps = async ({ params }) => {
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
    revalidate: 1, // In seconds
  }
}

const Post: React.FC<PostProps> = (props) => {
  const [session, loading] = useSession()
  const [deleting, setDeleting] = useState(false)

  async function deletePost(id: number): Promise<void> {
    setDeleting(true)
    try {
      await fetch(`/api/post/${id}`, {
        method: 'DELETE',
      })
      await Router.push('/', null, { shallow: true })
    } catch (error) {
      setDeleting(false)
      console.error(error)
    }
  }

  if (loading) {
    return (
      <Center h="100vh" w="100vw">
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
      <Box>
        {userHasValidSession && postBelongsToUser && (
          <Button size="lg" m="2" colorScheme="blue" onClick={() => deletePost(props.id)}>
            {deleting ? <Spinner /> : 'Delete'}
          </Button>
        )}
      </Box>
    </Layout>
  )
}

export default Post
