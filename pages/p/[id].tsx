import React from 'react'
import { GetServerSideProps } from 'next'
import ReactMarkdown from 'react-markdown'
import Layout from '../../components/Layout'
import { PostProps } from '../../components/Post'
import prisma from '../../lib/prisma'

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

const Post: React.FC<PostProps> = (props) => {
  const title = props.title
  return (
    <Layout title="My First Blog">
      <div className="max-w-4xl p-10 mx-auto">
        <p className="text-xl font-semibold text-gray-900">{title}</p>
        <p className="mb-5 text-sm font-semibold text-gray-500">
          {props?.author?.name || 'Unknown author'}
        </p>

        <article className="prose lg:prose-xl">
          <ReactMarkdown source={props.content} />
        </article>
      </div>
    </Layout>
  )
}

export default Post
