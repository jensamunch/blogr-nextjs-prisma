import React from 'react'
import NextLink from 'next/link'

export type PostProps = {
  id: number
  title: string
  author: {
    name: string
    email: string
  } | null
  content: string
  published: boolean
}

const Post: React.FC<{ post: PostProps }> = ({ post }) => {
  const authorName = post.author ? post.author.name : 'Unknown author'
  return (
    <div className="mx-12">
      <p className="text-sm text-gray-500">
        <time dateTime="2020-03-16">Mar 16, 2020</time>
      </p>
      <a href="#" className="mt-2 block">
        <p className="text-xl font-semibold text-gray-900">{post.title}</p>
        <p className="mt-3 text-base text-gray-500">{post.content.slice(0, 200) + '...'}</p>
      </a>
      <div className="mt-3">
        <a href="#" className="text-base font-semibold text-indigo-600 hover:text-indigo-500">
          <NextLink href="/p/[id]" as={'/p/' + post.id} passHref>
            Read full post
          </NextLink>
        </a>
      </div>
    </div>
  )
}

export default Post
