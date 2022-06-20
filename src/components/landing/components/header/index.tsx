import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scroll, setScroll] = useState(false)

  const changeBackground = () => {
    if (window.scrollY >= 66) {
      setScroll(true)
    } else {
      setScroll(false)
    }
  }

  useEffect(() => {
    changeBackground()
    // adding the event when scroll change background
    window.addEventListener('scroll', changeBackground)
  })

  // TODO Put all Link related styling in sub div
  return (
    <div className={`${scroll ? 'bg-white' : ''} sticky top-0 z-50 `}>
      <div className="relative flex items-center justify-between  px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-[1366px] md:px-24 lg:px-8">
        <div className="inline-flex items-center mr-8 cursor-pointer">
          <Link
            href="/"
            aria-label="Company"
            title="Company"
            passHref
          >
                <Image src="/logo.png" alt="nextjs" width="120" height="60" />

          </Link>

        </div>

        <div className="flex items-center">
          <ul className="flex items-center hidden space-x-8 lg:flex mr-16">
           <li className="font-medium tracking-wide  transition-colors duration-200 hover:text-green-700" >
              <Link
                href="/#courses"
              >
                Courses
              </Link>
            </li>
            <li className="font-medium tracking-wide  transition-colors duration-200 hover:text-green-700">
              <Link
                href="/#signals"

              >
                Signals
              </Link>
            </li>
            <li className="font-medium tracking-wide  transition-colors duration-200 hover:text-green-700">
              <Link
                href="/#features"

              >
                Features
              </Link>
            </li>
            <li className="font-medium tracking-wide  transition-colors duration-200 hover:text-green-700">
              <Link
                href="/#testimonials"

              >
                Testimonials
              </Link>
            </li>
            <li className="font-medium tracking-wide  transition-colors duration-200 hover:text-green-700">
              <Link
                href="/#pricing"

              >
                Pricing
              </Link>
            </li>
            <li className="font-medium tracking-wide  transition-colors duration-200 hover:text-green-700">
              <Link
                href="/#faqs"

              >
                FAQs
              </Link>
            </li>
          </ul>
          <ul className="flex items-center hidden space-x-8 lg:flex">
          <li className="font-medium tracking-wide  transition-colors duration-200 hover:text-green-700">
            <Link
              href="/login"
            >
              Sign in
            </Link>
          </li>
          <li >
            <Link
              href="/register"
              passHref
            >
              <div className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-green-700 hover:bg-green-900  focus:shadow-outline focus:outline-none cursor-pointer">
                        Sign up
                      </div>
            </Link>
          </li>
        </ul>
        </div>

        <div className=" lg:hidden">
          <button
            aria-label="Open Menu"
            title="Open Menu"
            className="p-2 -mr-1 transition duration-200 rounded focus:outline-none focus:shadow-outline hover:bg-deep-purple-50 focus:bg-deep-purple-50"
            onClick={() => setIsMenuOpen(true)}
          >
            <svg className="w-5 text-gray-600" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M23,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,13,23,13z"
              />
              <path
                fill="currentColor"
                d="M23,6H1C0.4,6,0,5.6,0,5s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,6,23,6z"
              />
              <path
                fill="currentColor"
                d="M23,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,20,23,20z"
              />
            </svg>
          </button>
          {isMenuOpen && (
            <div className="absolute top-0 left-0 w-full">
              <div className="p-5 bg-white border rounded shadow-sm">
                <div className="flex items-center justify-between mb-8">
                  <div>
                   <Link
            href="/"
            passHref
          >
                <Image src="/logo.png" alt="nextjs" width="100" height="50" />
          </Link>
                  </div>
                  <div>
                    <button
                      aria-label="Close Menu"
                      title="Close Menu"
                      className="p-2 -mt-2 -mr-2 transition duration-200 rounded hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <svg className="w-5 text-gray-600" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3l-6.3,6.3 c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                <nav>
                  <ul className="space-y-4">
           <li className="font-medium tracking-wide  transition-colors duration-200 hover:text-green-700" >
              <Link
                href="/#courses"
              >
                Courses
              </Link>
            </li>
            <li className="font-medium tracking-wide  transition-colors duration-200 hover:text-green-700">
              <Link
                href="/#signals"

              >
                Signals
              </Link>
            </li>
            <li className="font-medium tracking-wide  transition-colors duration-200 hover:text-green-700">
              <Link
                href="/#features"

              >
                Features
              </Link>
            </li>
            <li className="font-medium tracking-wide  transition-colors duration-200 hover:text-green-700">
              <Link
                href="/#testimonials"

              >
                Testimonials
              </Link>
            </li>
            <li className="font-medium tracking-wide  transition-colors duration-200 hover:text-green-700">
              <Link
                href="/#pricing"

              >
                Pricing
              </Link>
            </li>
            <li className="font-medium tracking-wide  transition-colors duration-200 hover:text-green-700">
              <Link
                href="/#faqs"

              >
                FAQs
              </Link>
            </li>
                    <li className="font-medium tracking-wide  transition-colors duration-200 hover:text-green-700">
                      <Link
                        href="/login"
                        aria-label="Sign in"
                        title="Sign in"
                      >
                        Sign in
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/register"
                        aria-label="Sign up"
                        title="Sign up"
                        passHref
                      ><div className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-green-700 hover:bg-green-900  focus:shadow-outline focus:outline-none cursor-pointer">
                        Sign up
                      </div>
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
export default Header
