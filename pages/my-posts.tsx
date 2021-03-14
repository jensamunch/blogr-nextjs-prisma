import React, { useState } from 'react'
import Router from 'next/router'
import { GetServerSideProps } from 'next'
import Layout from '../components/Layout'
import Post, { PostProps } from '../components/Post'
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
    <Layout title="My Posts">
      <div className="mt-6 pt-10 grid gap-16 lg:grid-cols-2 lg:gap-x-5 lg:gap-y-12">
        {props.myposts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </Layout>
  )
}

export default MyPosts
