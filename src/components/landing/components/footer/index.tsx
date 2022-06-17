import Container from '@components/landing/components/container'
import Link from 'next/link'
import Image from 'next/image'
import { BsFillTelephoneFill } from 'react-icons/bs'
import { IoLogoWhatsapp, IoIosNavigate } from 'react-icons/io'
import { FaTelegramPlane } from 'react-icons/fa'

const Footer = () => {
  return (
    <div className=" px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-[1366px] pt-24 md:px-24 lg:px-8">
      <div className="grid gap-10 row-gap-6 mb-8 px-8 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2">
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
          <div className="mt-6 lg:max-w-3xl">
            <p className=" ">ELEV8 is a platform created with the ultimate goal to elevate lives and give as much as we can to the society in a very organized manner.
            </p>
            <p className="mt-4  ">
              We are dedicated to improving the education of our members in wealth building subjects, and providing opportunities for them to create wealth for themselves.
            </p>
          </div>
        </div>

        <div className="space-y-4 ">
          <p className=" font-bold tracking-wide text-gray-900">
            Contacts
          </p>
          <p className="mt-4">
            For all inquiries and complaints, kindly reach out to us via thecontact details below and we will get back to you as soon as possible.
          </p>
          <div className="flex ">
           <IoLogoWhatsapp className='mr-3 p-0 text-green-700' />
            <a
              href="https://wa.me/2348069947791"
              aria-label="Our phone"
              title="Our phone"
              target='_blank'
                            target='_blank' rel="noreferrer"

            >
              <div className="mr-4 cursor-pointer transition-colors duration-300  hover:text-green-900">

              BABS,
              </div>
            </a>
            <a
              href="https://wa.me/2347063139613"
              aria-label="Our phone"
              title="Our phone"
              target='_blank'
              passHref rel="noreferrer"
            >
              <div className=" cursor-pointer transition-colors duration-300  hover:text-green-900">

              TISHE
              </div>
            </a>
          </div>
          <div className="flex ">
            <BsFillTelephoneFill className='mr-3 p-0 text-green-700' />
            <a
              href="tel:07063139613"
              aria-label="Our phone"
              title="Our phone"
              target='_blank'
              rel="noreferrer"
            >
              <div className="mr-4 cursor-pointer transition-colors duration-300 hover:text-green-900">

              07063139613,
              </div>
            </a>
            <a
              href="tel:09031460290"
              aria-label="Our phone"
              title="Our phone"
                            target='_blank'
                            rel="noreferrer"

            >
              <div className=" cursor-pointer transition-colors duration-300  hover:text-green-900">

              09031460290
              </div>
            </a>
          </div>
          <div className="flex">
            <IoIosNavigate className='mr-3 p-0 text-green-700' />
            <a
              href="https://www.google.com/maps"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Our address"
              title="Our address"

            >
              <div className="cursor-pointer transition-colors duration-300  hover:text-green-900">
              Lagos, Nigeria
              </div>
            </a>
          </div>
        </div>

        <div className="space-y-4 ">
          <span className=" font-bold tracking-wide text-gray-900">
            Social
          </span>

          <div className="flex justify-start items-center mt-1 space-x-6">
            <a
              href="https://t.me/elev8ng"
              target='_blank' rel="noreferrer"
                 >
             <FaTelegramPlane size={52} className="cursor-pointer transition-colors duration-300 text-green-700 hover:text-green-900" />
            </a>
            <a
              href="https://facebook.com/elev8ng"
              target='_blank' rel="noreferrer"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-16 cursor-pointer transition-colors duration-300 text-green-700 hover:text-green-900">
                <path d="M22,0H2C0.895,0,0,0.895,0,2v20c0,1.105,0.895,2,2,2h11v-9h-3v-4h3V8.413c0-3.1,1.893-4.788,4.659-4.788 c1.325,0,2.463,0.099,2.795,0.143v3.24l-1.918,0.001c-1.504,0-1.795,0.715-1.795,1.763V11h4.44l-1,4h-3.44v9H22c1.105,0,2-0.895,2-2 V2C24,0.895,23.105,0,22,0z" />
              </svg>
            </a>
          </div>

          <p className="mt-4  ">
            Engage with our fast growing community on Telegram and Facebook.
          </p>
        </div>
      </div>

      <div className="flex flex-col justify-between w-full items-center pt-5 pb-10 border-t ">
        <ul className="flex flex-col  sm:flex-row space-y-2 sm:space-y-0 sm:space-x-5  mb-3 lg:mb-0 text-xl text-center">
          <li className='mt-0'>
            <Link
              href="/terms"
              passHref
            >
              <div className="cursor-pointer text-gray-600 transition-colors duration-300 hover:text-green-700">
              Terms &amp; Conditions
              </div>
            </Link>
          </li>
        </ul>
        <p className=" mt-8 text-lg text-gray-600">
          © Copyright 2022 Elev8. All rights reserved.
        </p>
      </div>
    </div>
  )
}
export default Footer
