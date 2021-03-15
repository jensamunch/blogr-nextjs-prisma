import React from 'react'
import Link from 'next/link'

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
    <div>
      <p className="text-xl font-semibold text-gray-900">{post.title}</p>
      <p className="text-sm font-semibold text-gray-500">{authorName}</p>
      <p className="mt-5 text-base text-gray-900">{post.content.slice(0, 200) + '...'}</p>
      <div className="mt-5">
        <Link href="/p/[id]" as={'/p/' + post.id}>
          <a className="text-base font-semibold text-indigo-600 hover:text-indigo-500">
            Read full post
          </a>
        </Link>
      </div>
    </div>
  )
}

export default Post
