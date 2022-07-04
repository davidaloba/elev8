import Container from '@components/landing/components/container'

const Features = () => {
  return (
    <Container id='features'>
      <div className="flex flex-col lg:flex-row-reverse  px-8 mb-6 md:mb-10">
        <div className="lg:w-1/2">
           <h2 className="max-w-4/5 mb-6 font-sans  text-3xl lg:text-right font-bold leading-none tracking-tight text-gray-900 sm:text-5xl md:mx-auto">
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
       <span className="relative">Elev8 Your  </span>
      </span>{' '}
              <span className="inline-block text-green-700">
                Life
              </span>
            </h2>
        </div>
        <div className="lg:w-1/2">
          <p className=" ">
            All of these means that there is numerous opportunities to grow, make money and improve your life with ELEV8 all with just a signup of fee of 10,000 naira which is the only payment you will be making for life for all these free services.
          </p>
        </div>
      </div>
      <div className="grid gap-8 row-gap-10 sm:grid-cols-2 lg:grid-cols-4 mt-16 px-8">
        <div className="max-w-md">
          <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-indigo-50">
            <svg
              className="w-12 h-12 text-green-700"
              stroke="currentColor"
              viewBox="0 0 52 52"
            >
              <polygon
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                points="29 13 14 29 25 29 23 39 38 23 27 23"
              />
            </svg>
          </div>
          <h6 className="mb-2 font-semibold leading-5">Free business advertisements.</h6>
          <p className="mb-3 text-xl text-gray-900">
            We will advertise your business to thousands of people through the Facebook Timeline and Whatsapp status of our numerous members and Whatsapp TVs such that your business will get a wider reach beyond your imaginations.
          </p>
        </div>
        <div className="max-w-md">
          <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-indigo-50">
            <svg
              className="w-12 h-12 text-green-700"
              stroke="currentColor"
              viewBox="0 0 52 52"
            >
              <polygon
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                points="29 13 14 29 25 29 23 39 38 23 27 23"
              />
            </svg>
          </div>
          <h6 className="mb-2 font-semibold leading-5">Partner discounts</h6>
          <p className="mb-3 text-xl text-gray-900">
           Also, as a member of the ELEV8 Community, you’re automatically eligible for 50% discounts to a maximum of 10,000 naira from 50000 naira on any premium course you purchase from LV Academy which is a partner brand
          </p>
        </div>
        <div className="max-w-md">
          <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-indigo-50">
            <svg
              className="w-12 h-12 text-green-700"
              stroke="currentColor"
              viewBox="0 0 52 52"
            >
              <polygon
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                points="29 13 14 29 25 29 23 39 38 23 27 23"
              />
            </svg>
          </div>
          <h6 className="mb-2 font-semibold leading-5">Referral commissions</h6>
          <p className="mb-3 text-xl text-gray-900">
            As a Member, You will get massive 30% Affiliate Bonus which is 3000 Naira each on every individual you bring into the ELEV8 Community.
          </p>
        </div>
        <div className="max-w-md">
          <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-indigo-50">
            <svg
              className="w-12 h-12 text-green-700"
              stroke="currentColor"
              viewBox="0 0 52 52"
            >
              <polygon
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                points="29 13 14 29 25 29 23 39 38 23 27 23"
              />
            </svg>
          </div>
          <h6 className="mb-2 font-semibold leading-5">And many more</h6>
          <p className="mb-3 text-xl text-gray-900">

There are other freebies to earn and share love to our members which includes cash, phones, laptops etc.
          </p>
        </div>
      </div>
    </Container>
  )
}

export default Features
