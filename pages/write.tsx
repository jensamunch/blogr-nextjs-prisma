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
      await Router.push('/my-posts', null)
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
    <Layout title="SWR Blogger | Write a post">
      <div className="max-w-4xl p-10 mx-auto">
        <form onSubmit={submitData} className="space-y-8">
          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <div className="mt-1">
                <input
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Title"
                  type="text"
                  value={title}
                  id="title"
                  name="title"
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>{' '}
          </div>

          <div className="sm:col-span-6">
            <label htmlFor="about" className="block text-sm font-medium text-gray-700">
              Content
            </label>
            <div className="mt-1">
              <textarea
                onChange={(e) => setContent(e.target.value)}
                id="content"
                name="content"
                rows={10}
                value={content}
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              ></textarea>
            </div>
            <p className="mt-2 text-sm text-gray-500">This is the body of the post.</p>
          </div>

          <button
            className="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded"
            type="submit"
          >
            {loading ? 'Saving' : 'Create'}
          </button>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded">
            Cancel
          </button>
        </form>
      </div>
    </Layout>
  )
}

export default Create
