import React, { useState } from 'react'
import Router from 'next/router'
import { GetServerSideProps } from 'next'
import Layout from '../components/Layout'
import Post, { PostProps } from '../components/Post'
import { useSession, getSession } from 'next-auth/client'
import prisma from '../lib/prisma'
import { Flex, Spinner, Button, Heading, Box } from '@chakra-ui/react'

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req })
  if (!session) {
    res.statusCode = 403
    return { props: { drafts: [] } }
  }

  const myposts = await prisma.post.findMany({
    where: {
      author: { email: session.user.email },
    },
    include: {
      author: {
        select: { name: true },
      },
    },
  })
  return {
    props: { myposts },
  }
}

type Props = {
  myposts: PostProps[]
}

const MyPosts: React.FC<Props> = (props) => {
  const [session] = useSession()
  const [deleting, setDeleting] = useState(false)

  async function deletePost(id: number): Promise<void> {
    setDeleting(true)
    try {
      await fetch(`/api/post/${id}`, {
        method: 'DELETE',
      })
      await Router.push('/my-posts', null, { shallow: true })
    } catch (error) {
      setDeleting(false)
      console.error(error)
    }
  }

  async function publishPost(id: number): Promise<void> {
    try {
      await fetch(`/api/publish/${id}`, {
        method: 'PUT',
      })
      console.log(id)
      console.log(props.myposts)
      // modify props.myposts
      // Find index of specific object using findIndex method.
      // objIndex = myArray.findIndex((obj) => obj.id == 1
      // Log object to Console.
      // console.log('Before update: ', myArray[objIndex])
      // Update object's name property.
      // myArray[objIndex].name = 'Laila'
      //Log object to console again.
      // console.log('After update: ', myArray[objIndex])
    } catch (error) {
      console.error(error)
    }
  }

  async function unPublishPost(id: number): Promise<void> {
    try {
      await fetch(`/api/unpublish/${id}`, {
        method: 'PUT',
      })
      console.log(id)
      // this is where we should be modifying the local data
    } catch (error) {
      console.error(error)
    }
  }

  if (!session) {
    return (
      <Layout title="My Posts">
        <Heading mt="4" mb="4">
          My Posts
        </Heading>
        <div>You need to be authenticated to view this page.</div>
      </Layout>
    )
  }

  return (
    <Layout title="My Posts">
      <Box className="page">
        <Heading mt="4" mb="4">
          My Posts
        </Heading>
        <Flex wrap="wrap" direction="row">
          {props.myposts.map((post) => (
            <Flex
              key={post.id}
              width="400px"
              p="4"
              m="4"
              borderRadius="lg"
              border="2px"
              borderColor="gray.200"
              direction="column"
            >
              <Post post={post} />
              <Button size="md" m="2" colorScheme="blue" onClick={() => deletePost(post.id)}>
                {deleting ? <Spinner /> : 'Delete'}
              </Button>
              <Button size="md" m="2" colorScheme="blue" onClick={() => publishPost(post.id)}>
                Publish
              </Button>
              <Button size="md" m="2" colorScheme="blue" onClick={() => unPublishPost(post.id)}>
                Unpublish
              </Button>
            </Flex>
          ))}
        </Flex>
      </Box>
    </Layout>
  )
}

export default MyPosts
