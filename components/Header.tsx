import React from 'react'
import { Link as ReachLink } from 'next/link'
import { useRouter } from 'next/router'
import { Link, Button, useColorMode } from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'

const Header: React.FC = () => {
  const router = useRouter()
  const isActive: (pathname: string) => boolean = (pathname) => router.pathname === pathname
  const { colorMode, toggleColorMode } = useColorMode()

  const left = (
    <div>
      <Button m={4} onClick={toggleColorMode}>
        {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
      </Button>

      <Link data-active={isActive('/')} fontSize="lg" fontWeight="bold" as={ReachLink} to="/">
        Feed
      </Link>
    </div>
  )

  const right = null

  return (
    <nav>
      {left}
      {right}
    </nav>
  )
}

export default Header
