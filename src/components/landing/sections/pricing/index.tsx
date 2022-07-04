import Container from '@components/landing/components/container'
import Link from 'next/link'

const Pricing = () => {
  return (
    <Container id='pricing'>
      <div className=" md:mx-auto mb-10 mt-16 px-8 md:mb-12 sm:text-center ">
        <h2 className=" max-w-7xl mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-5xl md:mx-auto">
           <span className="relative inline-block">
       <svg
        viewBox="0 0 52 24"
        fill="currentColor"
        className="absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 text-orange-600 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block"
       >
        <defs>
         <pattern
          id="232db96b-4aa2-422f-9086-5a77996d1df1"
          x="0"
          y="0"
          width=".135"
          height=".30"
         >
          <circle cx="1" cy="1" r=".7" />
         </pattern>
        </defs>
        <rect
         fill="url(#232db96b-4aa2-422f-9086-5a77996d1df1)"
         width="52"
         height="24"
        />
       </svg>
       <span className="relative">Pricing</span> </span>
        </h2>
        <p className=" max-w-7xl">
            Enjoy all of these benefits and more by signing up to join the Elev8 community today.
        </p>
      </div>

      <div className=" sm:mx-auto">
        <div className="relative flex flex-col justify-between   p-8 transition-shadow duration-300 bg-white border rounded shadow-sm sm:items-center hover:shadow border-green-400">
          <div className="absolute inset-x-0 top-0 flex justify-center -mt-3">
            <div className="inline-block px-3 py-1 text-xs font-medium tracking-wider text-white uppercase rounded bg-orange-700">
              Lifetime Access
            </div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold"></div>
            <div className="flex items-center justify-center mt-2">
              <div className="mr-1 text-5xl font-bold">₦10,000</div>
            </div>
            <div className="mt-2 space-y-3">
              <div className="text-gray-700">Free Courses</div>
              <div className="text-gray-700">Daily Signals</div>
              <div className="text-gray-700">Sportbetting Predictions</div>
              <div className="text-gray-700">Free Business Advertisements</div>
              <div className="text-gray-700">Referral Commisions</div>
              <div className="text-gray-700">Partner Discounts</div>
              <div className="text-gray-700">And many more...</div>
            </div>
          </div>
          <div>
            <Link
              href="/register"
              passHref
            >
              <div className="inline-flex items-center justify-center w-full h-12 py-8 px-6 mt-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-orange-700 hover:bg-orange-900 focus:shadow-outline focus:outline-none cursor-pointer">Join Now</div>

            </Link>

          </div>
        </div>
      </div>

    </Container>
  )
}

export default Pricing
