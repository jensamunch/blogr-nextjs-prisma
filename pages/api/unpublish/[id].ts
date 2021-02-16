import prisma from '../../../lib/prisma'

// PUT /api/unpublish/:id
export default async function handle(req, res) {
  const postId = req.query.id
  if (req.method === 'PUT') {
    const post = await prisma.post.update({
      where: { id: Number(postId) },
      data: { published: false },
    })
    res.json(post)
  } else {
    throw new Error(`The HTTP ${req.method} method is not supported at this route.`)
  }
}
