// Header.tsx
import React from 'react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { signOut, useSession } from 'next-auth/client'
import { Text, Link, Flex, Box, Spacer, Button, useColorMode } from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'

const Header: React.FC = () => {
  const router = useRouter()
  const isActive: (pathname: string) => boolean = (pathname) => router.pathname === pathname
  const { colorMode, toggleColorMode } = useColorMode()

  const [session, loading] = useSession()

  const left = (
    <Box p="2">
      <NextLink href="/" passHref>
        <Link mr="10" data-active={isActive('/')} fontWeight="bold">
          Feed
        </Link>
      </NextLink>

      <NextLink href="/drafts" passHref>
        <Link mr="10" data-active={isActive('/drafts')} fontWeight="bold">
          My Drafts
        </Link>
      </NextLink>

      <NextLink href="/create" passHref>
        <Link mr="10" data-active={isActive('/create')} fontWeight="bold">
          New post
        </Link>
      </NextLink>
    </Box>
  )

  let right = null

  if (loading) {
    right = (
      <Box p="2">
        <Text>Validating session ...</Text>
      </Box>
    )
  }

  if (!session) {
    right = (
      <Box p="2">
        <NextLink href="/api/auth/signin" passHref>
          <Link mr="2" data-active={isActive('/signup')} fontWeight="bold">
            Login
          </Link>
        </NextLink>
      </Box>
    )
  }

  if (session) {
    right = (
      <Box p="2">
        <span style={{ paddingRight: '1rem' }}> {session.user.email} </span>
        <Link onClick={() => signOut()} mr="2" data-active={isActive('/create')} fontWeight="bold">
          Log out
        </Link>
        <Button m={4} onClick={toggleColorMode}>
          {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
        </Button>
      </Box>
    )
  }

  return (
    <Flex align="center">
      {left}
      <Spacer />
      {right}
    </Flex>
  )
}

export default Header
