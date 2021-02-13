import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

const Header: React.FC = () => {
  const router = useRouter()
  const isActive: (pathname: string) => boolean = (pathname) => router.pathname === pathname

  const left = (
    <div>
      <Link href="/">
        <a data-active={isActive('/')}>Feed</a>
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
