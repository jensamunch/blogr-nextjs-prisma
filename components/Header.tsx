// Header.tsx
import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { signOut, useSession } from 'next-auth/client'
import { Flex, Box, Spacer, Button, useColorMode } from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'

const Header: React.FC = () => {
  const router = useRouter()
  const isActive: (pathname: string) => boolean = (pathname) => router.pathname === pathname
  const { colorMode, toggleColorMode } = useColorMode()

  const [session, loading] = useSession()

  let left = (
    <Box p="2" border="2px" borderColor="gray.200">
      <Button m={4} onClick={toggleColorMode}>
        {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
      </Button>
      <Link href="/">
        <a className="bold" data-active={isActive('/')}>
          Feed
        </a>
      </Link>
    </Box>
  )

  let right = null

  if (loading) {
    left = (
      <Box p="2" border="2px" borderColor="gray.200">
        <Button m={4} onClick={toggleColorMode}>
          {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
        </Button>
        <Link href="/">
          <a className="bold" data-active={isActive('/')}>
            Feed
          </a>
        </Link>
      </Box>
    )
    right = (
      <Box p="2" border="2px" borderColor="gray.200">
        <p>Validating session ...</p>
      </Box>
    )
  }

  if (!session) {
    right = (
      <Box p="2" border="2px" borderColor="gray.200">
        <Link href="/api/auth/signin">
          <a data-active={isActive('/signup')}>Log in</a>
        </Link>
      </Box>
    )
  }

  if (session) {
    left = (
      <Box p="2" border="2px" borderColor="gray.200">
        <Button m={4} onClick={toggleColorMode}>
          {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
        </Button>
        <Link href="/">
          <a className="bold" data-active={isActive('/')}>
            Feed
          </a>
        </Link>
        <Link href="/drafts">
          <a data-active={isActive('/drafts')}>My drafts</a>
        </Link>
      </Box>
    )
    right = (
      <Box p="2" border="2px" borderColor="gray.200">
        <p>
          {session.user.name} ({session.user.email})
        </p>
        <Link href="/create">
          <button>
            <a>New post</a>
          </button>
        </Link>
        <button onClick={() => signOut()}>
          <a>Log out</a>
        </button>
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
