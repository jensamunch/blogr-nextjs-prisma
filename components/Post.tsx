import React from 'react'
import { Link, Text } from '@chakra-ui/react'
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
    // THINK I CAN REPLACE THIS WITH NEXTLINK
    <div>
      <Text fontSize="lg" fontWeight="bold">
        {post.title}
      </Text>
      <Text mb={4} fontSize="sm">
        {authorName}
      </Text>
      <Text mb={4} fontSize="sm">
        {post.content.slice(0, 200) + '...'}
      </Text>

      <NextLink href="/p/[id]" as={'/p/' + post.id} passHref>
        <Link fontWeight="bold">Read full post</Link>
      </NextLink>
    </div>
  )
}

export default Post
