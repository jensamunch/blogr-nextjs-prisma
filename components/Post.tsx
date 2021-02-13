import React from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";
import { Text } from "@chakra-ui/react"

export type PostProps = {
  id: number;
  title: string;
  author: {
    name: string;
    email: string;
  } | null;
  content: string;
  published: boolean;
};

const Post: React.FC<{ post: PostProps }> = ({ post }) => {
  const authorName = post.author ? post.author.name : "Unknown author";
  return (
    <div onClick={() => Router.push("/p/[id]", `/p/${post.id}`)}>
      <Text fontSize="lg" fontWeight="bold">{post.title}</Text>
      <Text mb={4} fontSize="sm">{authorName}</Text>
      <ReactMarkdown source={post.content} />
    </div>
  );
};

export default Post;
