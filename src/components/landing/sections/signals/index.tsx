import Container from '@components/landing/components/container'

const Signals = () => {
  return (
    <Container id='signals'>
        <div className="flex flex-col lg:flex-row px-8">
          <div className="mb-6 lg:mb-0 lg:w-1/2 lg:pr-5">
            <h2 className="max-w-4/5 mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-5xl md:mx-auto">
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
                Networth
              </span>
            </h2>
          </div>
          <div className="lg:w-1/2">
            <p className="mb-4 ">
             ELEV8 Platform is such a unique platform in the sense that we don`t just want our members to
            learn, we also want them to earn. Which is why we added other services whereby they will earn
            from what they`ve learnt and for those that have learnt about some of these courses can also take
            advantage of the earning facilities like:
            </p>
          <ul className="space-y-3">
          <li className="flex items-start">
            <span className="mr-1">
              <svg
                className="w-5 h-5 mt-px text-green-700"
                stroke="currentColor"
                viewBox="0 0 52 52"
              >
                <polygon
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  points="29 13 14 29 25 29 23 39 38 23 27 23"
                />
              </svg>
            </span>
            Trading Signals for (Crypto Spots and Futures Trading, DEFI, as well as Forex Trading Signals),
          </li>
          <li className="flex items-start">
            <span className="mr-1">
              <svg
                className="w-5 h-5 mt-px text-green-700"
                stroke="currentColor"
                viewBox="0 0 52 52"
              >
                <polygon
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  points="29 13 14 29 25 29 23 39 38 23 27 23"
                />
              </svg>
            </span>

VIP Sportsbetting Predictions with 70-100% guarantee of winning with Proper Risk management.

          </li>
        </ul>
          </div>
        </div>
    </Container>
  )
}

export default Signals
