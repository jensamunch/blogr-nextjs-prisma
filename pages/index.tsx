import React from 'react'
import { GetStaticProps } from 'next'
import Layout from '../components/Layout'
import Post, { PostProps } from '../components/Post'
import prisma from '../lib/prisma'

export const getStaticProps: GetStaticProps = async () => {
  const feed = await prisma.post.findMany({
    where: { published: true },
    include: {
      author: {
        select: { name: true },
      },
    },
  })
  return {
    props: { feed },
    revalidate: 1, // In seconds
  }
}

type Props = {
  feed: PostProps[]
}

const Feed: React.FC<Props> = (props) => {
  console.log(props)
  return (
    <Layout title="Public Feed">
      <div className="mt-6 pt-10 grid gap-16 lg:grid-cols-2 lg:gap-x-5 lg:gap-y-12">
        {props.feed.map((post) => (
          <div className="mx-12" key={post.id}>
            <Post post={post} />
          </div>
        ))}
      </div>
    </Layout>
  )
}

export default Feed
