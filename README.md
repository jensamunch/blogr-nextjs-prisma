# Fullstack Authentication Example with Next.js and NextAuth.js

This is the starter project for the fullstack tutorial with Next.js and Prisma. You can find the final version of this project in the [`final`](https://github.com/prisma/blogr-nextjs-prisma/tree/final) branch of this repo.

### Install scaffolding
npx create-next-app --example https://github.com/nikolasburk/blogr-nextjs-prisma/tree/main blogr-nextjs-prisma
npm i @chakra-ui/react @emotion/react @emotion/styled framer-motion
ncu -u

### Check data and edit
npx prisma studio

### Fix up Chakra
- Turn on dark mode

### Start working on Prisma
npm install @prisma/cli --save-dev
npx prisma init
Going through this post to where I can run: `npx prisma studio`

### Next up is authentication
npm install next-auth
npx prisma db push --preview-feature
mkdir -p pages/api/auth && touch pages/api/auth/[...nextauth].ts

### Step 6: add new post functionality 