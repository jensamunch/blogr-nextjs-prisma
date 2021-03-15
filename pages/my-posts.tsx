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
  React.useEffect(() => {
    const start = () => {
      setLoading(true)
    }
    const end = () => {
      setLoading(false)
    }
    Router.events.on('routeChangeStart', start)
    Router.events.on('routeChangeComplete', end)
    Router.events.on('routeChangeError', end)
    return () => {
      Router.events.off('routeChangeStart', start)
      Router.events.off('routeChangeComplete', end)
      Router.events.off('routeChangeError', end)
    }
  }, [])

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
    console.log('refeshing after publish)')
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
    console.log('refeshing after publish)')
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
            <button
              className="mt-5 mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded inline-flex"
              onClick={() => deletePost(post.id)}
              disabled={loading ? true : false}
            >
              Delete
            </button>
            <button
              className="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded inline-flex"
              onClick={() => publishPost(post.id)}
              disabled={loading ? true : false}
            >
              Publish
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded inline-flex"
              onClick={() => unPublishPost(post.id)}
              disabled={loading ? true : false}
            >
              Unpublish
            </button>
          </div>
        ))}
      </div>

      {loading ? (
        <div id="loading-screen" className="absolute top-0 left-0 h-screen w-screen flex items-center justify-center bg-gray-900 bg-opacity-50">
          <svg
            className=" animate-spin h-24 w-24 text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
      ) : (
        ''
      )}
    </Layout>
  )
}

export default MyPosts
