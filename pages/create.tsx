// pages/create.tsx

import React, { useState } from 'react'
import Router from 'next/router'
import Layout from '../components/Layout'
import { FormControl, FormLabel, Heading, Input, Textarea, Box, Button } from '@chakra-ui/react'

const Draft: React.FC = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    try {
      const body = { title, content }
      await fetch('/api/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      await Router.push('/')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Layout>
      <Box>
        <form onSubmit={submitData}>
          <Heading mt="4" mb="4">
            New Draft
          </Heading>
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
            Create
          </Button>
          <Button size="lg" m="2" colorScheme="blue">
            Cancel
          </Button>
        </form>
      </Box>
    </Layout>
  )
}

export default Draft