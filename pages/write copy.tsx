// pages/create.tsx

import React, { useState } from 'react'
import Router from 'next/router'
import Layout from '../components/Layout'
import { useSession } from 'next-auth/client'

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
      <Layout title="Write Post">
        <main className="mt-16 mx-auto max-w-7xl px-4 sm:mt-24">
          <div className="text-center">
            <h1 className="text-2xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-4xl">
              You need to be signed in for this page
            </h1>
          </div>
        </main>
      </Layout>
    )
  }

  return (
    <Layout title="Write a post">

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

          <button isDisabled={!content || !title} type="submit">
            {loading ? <Spinner /> : 'Create'}
          </Button>
          <button>
            Cancel
          </button>
      </form> */}
    </Layout>
  )
}

export default Create
