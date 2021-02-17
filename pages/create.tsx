// pages/create.tsx

import React, { useState } from 'react'
import Router from 'next/router'
import Layout from '../components/Layout'
import { useSession } from 'next-auth/client'

import {
  Spinner,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Textarea,
  Box,
  Button,
} from '@chakra-ui/react'

const Create: React.FC = () => {
  const [session] = useSession()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const body = { title, content }
      await fetch('/api/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      await Router.push('/', null, { shallow: true })
    } catch (error) {
      setLoading(false)
      console.error(error)
    }
  }

  if (!session) {
    return (
      <Layout title="Write a post">
        <Heading mt="4" mb="4">
          Write a post
        </Heading>
        <div>You need to be authenticated to view this page.</div>
      </Layout>
    )
  }

  return (
    <Layout title="Write a post">
      <Heading mt="4" mb="4">
        Write a post
      </Heading>
      <form onSubmit={submitData}>
        <Box>
          <FormControl mb="4" id="title" isRequired>
            <FormLabel>Title of the post</FormLabel>
            <Input
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              type="text"
              value={title}
            />
          </FormControl>
          <FormControl mb="4" id="content" isRequired>
            <FormLabel>Content of the post</FormLabel>
            <Textarea
              onChange={(e) => setContent(e.target.value)}
              value={content}
              placeholder="Here is a sample placeholder"
            />
          </FormControl>

          <Button isDisabled={!content || !title} type="submit" size="lg" m="2" colorScheme="blue">
            {loading ? <Spinner /> : 'Create'}
          </Button>
          <Button size="lg" m="2" colorScheme="blue">
            Cancel
          </Button>
        </Box>
      </form>
    </Layout>
  )
}

export default Create
