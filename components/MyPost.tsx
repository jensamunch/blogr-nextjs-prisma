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
  const draft = (
    <span className="text-xs font-semibold inline-block py-1 px-4 mb-2 rounded-full bg-red-200 uppercase last:mr-0 mr-1">
      DRAFT
    </span>
  )

  const published = (
    <span className="text-xs font-semibold inline-block py-1 px-4 mb-2 rounded-full bg-green-200 uppercase last:mr-0 mr-1">
      PUBLISHED
    </span>
  )

  const authorName = post.author ? post.author.name : 'Unknown author'
  return (
    <div>
      {post.published ? published : draft}
      <p className="text-sm text-gray-500">Post id: {post.id}</p>
        <p className="text-xl font-semibold text-gray-900">{post.title}</p>
        <p className="text-sm font-semibold text-gray-500">{authorName}</p>

        <p className="mt-5 text-base text-gray-900">{post.content.slice(0, 200) + '...'}</p>
      <div className="mt-5">
        <a className="text-base font-semibold text-indigo-600 hover:text-indigo-500">
          <NextLink href="/p/[id]" as={'/p/' + post.id} passHref>
            Read full post
          </NextLink>
        </a>
      </div>
    </div>
  )
}

export default Post
