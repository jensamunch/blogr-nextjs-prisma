import React from 'react'
import Router from 'next/router'
import ReactMarkdown from 'react-markdown'
import { Text } from '@chakra-ui/react'
import NextLink from 'next/link'
import { Link } from '@chakra-ui/react'

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
    // THINK I CAN REPLACE THIS WITH NEXTLINK
    <div onClick={() => Router.push('/p/[id]', `/p/${post.id}`)}>
      <Text fontSize="lg" fontWeight="bold">
        {post.title}
      </Text>
      <Text mb={4} fontSize="sm">
        {authorName}
      </Text>
      <ReactMarkdown source={post.content} />

      <NextLink href="/p/[id]" as={'/p/' + post.id} passHref>
        <Link fontSize="lg" fontWeight="bold">
          Read full post
        </Link>
      </NextLink>
    </div>
  )
}

export default Post
