import React from 'react'
import Router from 'next/router'
import { GetServerSideProps } from 'next'
import Layout from '../components/Layout'
import Post, { PostProps } from '../components/MyPost'
import { useSession, getSession } from 'next-auth/client'
import prisma from '../lib/prisma'

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
    orderBy: {
      id: 'desc',
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
  const [loading, setLoading] = React.useState(false)

  const [session] = useSession()

  async function deletePost(id: number): Promise<void> {
    try {
      await fetch(`/api/post/${id}`, {
        method: 'DELETE',
      })
      await Router.replace('/my-posts', null, { scroll: true })
    } catch (error) {
      console.error(error)
    }
    setLoading(false)
  }

  async function publishPost(id: number): Promise<void> {
    try {
      await fetch(`/api/publish/${id}`, {
        method: 'PUT',
      })
      await Router.replace('/my-posts', null, { scroll: false })
    } catch (error) {
      console.error(error)
    }
    setLoading(false)
  }

  async function unPublishPost(id: number): Promise<void> {
    try {
      await fetch(`/api/unpublish/${id}`, {
        method: 'PUT',
      })
      await Router.replace('/my-posts', null, { scroll: false })
    } catch (error) {
      console.error(error)
    }
    setLoading(false)
  }

  if (!session) {
    return (
      <Layout title="SWR Blogger | My Posts">
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
    <Layout title="SWR Blogger | My Posts">
      <div className="mt-6 pt-10 grid gap-16 lg:grid-cols-2 lg:gap-x-5 lg:gap-y-12">
        {props.myposts.map((post) => (
          <div key={post.id} className="mx-12">
            <Post post={post} />
            <div className="flex flex-col space-y-2 md:space-y-0 md:flex-row md:space-x-2">
              <button
                className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded inline-flex ${loading ? ' disabled:opacity-50' : ''}`}                
                onClick={() => {
                  setLoading(true)
                  deletePost(post.id)
                }}
                disabled={true}
              >
                Delete
              </button>
              <button
                className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded inline-flex ${loading ? ' disabled:opacity-50' : ''}`}                
                onClick={() => {
                  setLoading(true)
                  publishPost(post.id)
                }}
                disabled={loading ? true : false}
              >
                Publish
              </button>
              <button
                className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded inline-flex ${loading ? ' disabled:opacity-50' : ''}`}                
                onClick={() => {
                  setLoading(true)
                  unPublishPost(post.id)
                }}
                disabled={loading ? true : false}
              >
                Unpublish
              </button>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  )
}

export default MyPosts
