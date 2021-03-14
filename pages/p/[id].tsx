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
      <p className="text-sm text-gray-500">
        <time dateTime="2020-03-16">Mar 16, 2020</time>
      </p>
      <a href="#" className="mt-2 block">
        <p className="text-xl font-semibold text-gray-900">{title}</p>
        <p className="text-sm font-semibold text-gray-500">
          {props?.author?.name || 'Unknown author'}
        </p>

        <p className="mt-5 text-base text-gray-900">
          <ReactMarkdown source={props.content} />
        </p>
      </a>
    </Layout>
  )
}

export default Post
