// Header.tsx
import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { signOut, useSession } from 'next-auth/client'
import NProgress from 'nprogress' //nprogress module

//Binding events.
Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

const Header: React.FC = () => {
  const router = useRouter()
  const [session] = useSession()
  const [navbarOpen, setNavbarOpen] = React.useState(false)

  let rightnav = (
    <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
      <Link href="/api/auth/signin" passHref>
        <div className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">
          Sign in
        </div>
      </Link>
    </div>
  )

  if (session) {
    rightnav = (
      <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
        {session.user.email}
        <div
          onClick={() => signOut()}
          className="ml-3 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Sign Out
        </div>
      </div>
    )
  }

  return (
    <div className="relative bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link href="/">
              <div>
                <img
                  className="h-8 w-auto sm:h-10"
                  src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                  alt=""
                />
              </div>
            </Link>
          </div>
          <div className="-mr-2 -my-2 md:hidden">
            <button
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
              className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              aria-expanded="false"
            >
              <span className="sr-only">Open menu</span>
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>

          {/* Middle Navbar */}
          <nav className="hidden md:flex space-x-10">
            <Link href="/">
              <a className={router.pathname == '/' ? 'text-gray-900' : 'text-gray-500'}>
                Public Posts
              </a>
            </Link>
            <Link href="/my-posts">
              <a className={router.pathname == '/my-posts' ? 'text-gray-900' : 'text-gray-500'}>
                My Posts
              </a>
            </Link>
            <Link href="/write">
              <a className={router.pathname == '/write' ? 'text-gray-900' : 'text-gray-500'}>
                Write Post
              </a>
            </Link>
          </nav>
          {rightnav}
        </div>
      </div>

      {/* Mobile Navbar */}
      <div
        className={
          'absolute top-0 inset-x-0 p-2 transition transform origin-top-right md-hidden' +
          (navbarOpen ? ' ' : ' hidden')
        }
      >
        <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
          <div className="pt-5 pb-6 px-5">
            <div className="flex items-center justify-between">
              <div>
                <img
                  className="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                  alt="Workflow"
                />
              </div>
              <div className="-mr-2">
                <button
                  type="button"
                  onClick={() => setNavbarOpen(!navbarOpen)}
                  className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                >
                  <span className="sr-only">Close menu</span>
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="mt-6">
              <nav className="grid gap-y-8">
                <Link href="/">
                  <div className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50">
                    <span className="ml-3 text-base font-medium text-gray-900">Public Feed</span>
                  </div>
                </Link>

                <Link href="/my-posts">
                  <div className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50">
                    <span className="ml-3 text-base font-medium text-gray-900">My Posts</span>
                  </div>
                </Link>

                <Link href="/write">
                  <div className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50">
                    <span className="ml-3 text-base font-medium text-gray-900">Write Post</span>
                  </div>
                </Link>

                <p className="mt-6 text-center text-base font-medium text-gray-500">
                  {session ? session.user.email : ' '}
                </p>
                <div className="text-indigo-600 hover:text-indigo-500">Sign in</div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
