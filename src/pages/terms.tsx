import Layout from '@components/landing/layout'
import Hero from '@components/landing/sections/hero'
import Courses from '@components/landing/sections/courses'
import Signals from '@components/landing/sections/signals'
import Features from '@components/landing/sections/features'
import Testimonials from '@components/landing/sections/testimonials'
import Faqs from '@components/landing/sections/faqs'
import Container from '@components/landing/components/container'

const Index = () => {
  // We are providing acces to information that will help you make money instantly and teacjing skills that will make you compete with counterparts all around the world

  return (
    <Layout>
  <Container>
    <div className=" md:mx-auto mb-10 mt-16 px-8 md:mb-12 ">
      <h1 className=" max-w-7xl mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-5xl md:mx-auto">
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
          <span className="relative">Terms</span>
          </span>{' and '}
                  <span className="inline-block text-green-700">
                    Conditions
                  </span>
            </h1>
    </div>

    <div className=" md:mx-auto mb-10 mt-16 px-8 md:mb-12 max-w-7xl ">

      <p>Last updated: June 17, 2022</p>

      <p>Please read these terms and conditions carefully before using Our Service.</p>

      <h1>This is a legal agreement between You and ELEV8</h1>

      <p>
        This agreement defines the terms of your participation as a buyer or registered member on elev8.ng
        </p>

      <p>
       Please read the ELEV8 agreement (“agreement”) before activating your account
      </p>

      <p>
      These terms and conditions outline the rules and regulations for the use of the ELEV8 Website,
located at elev8.ng with our Partnered Activity Website, and to be strictly observed.
      </p>

      <p>By accessing this website we assume you accept these terms and conditions. Do not continue to
use https://elev8.ng/ if you do not agree to take all of the terms and conditions stated on this page.</p>

      <p>The following terminology applies to these Terms and Conditions, Privacy Statement and
Disclaimer Notice and all Agreements: “Client”, “You” and “Your” refers to you, the person log
on this website and compliant to the Company/’s terms and conditions. “The Company”,
“Ourselves”, “We”, “Our” and “Us”, refers to our Company. “Party”, “Parties”, or “Us”, refers to
both the Client and ourselves. All terms refer to the offer, acceptance, and consideration of
payment necessary to undertake the process of our assistance to the Client in the most appropriate
manner for the express purpose of meeting the Client/’s needs in respect of the provision of the
Company/’s stated services, in accordance with and subject to, prevailing law of Nigeria. Any use
of the above terminology or other words in the singular, plural, capitalization, and/or he/she or
they, are taken as interchangeable and therefore as referring to same.</p>

      <h1 className=''> <strong>  You Must Not:</strong></h1>
      <ul>
        <li>Register with a False email address on elev8.ng System        </li>
        <li>Republish material from ELEV8 </li>
        <li>Sell, rent, or sub-license material from elev8.ng</li>
        <li>Reproduce, duplicate, tamper, or copy material from elev8.ng</li>
      </ul>

      <p className='mt-4'> <strong><em>Having Multiple account is not allowed, if caught, your accounts will be deleted without any refund</em></strong> </p>

      <h1>iFrames</h1>
      <p>
       Without prior approval and written permission, you may not create frames around our Webpages
that alter in any way the visual presentation or appearance of our Website.
      </p>

      <h1>Content Liability</h1>
      <p>
       We shall not be held responsible for any content that appears on your Website. You agree to protect
and defend us against all claims that are rising on your Website. No link(s) should appear on any
Website that may be interpreted as libelous, obscene, or criminal, or which infringes, otherwise
violates, or advocates the infringement or other violation of, any third party rights.
      </p>
      <p className='mt-4'> <strong><em>NOTE: (Very Important)</em></strong> </p>
      <p>
        <strong>NOT</strong> all members will get paid in form of money on ELEV8, what you will get daily is 5 – 10
points daily which can used to access our premium services (Trading Signals, VIP Sportsbetting
Predictions to make money) as well as Random Giveaways and Monthly Lottery(Cash, Recharge
Cards, Premium Courses, Movie Tickets, All Expenses Paid Hangout, Lunch and Dinner etc)
      </p>
      <p>
       ON ELEV8, What We Offer Is Learn And Earn Opportunities, The Only Way To Get Direct Cash
From Us Is When You Get Paid Affiliate Commissions, If You Bring Someone To Our Website
To Enjoy The Numerous Opportunities On Our Website. Other Earning Opportunities comes
through the services stated above.
      </p>

      <h1>Warranty</h1>
      <p>
       We don't offer 100% guarantee or assurance of the premium Services in any way because we don’t
control the trading and Sportsbetting market and losses are inevitable but Profits will be more than
the losses. Please do <strong>NOT</strong> register if you don’t agree with any of these Terms and Conditions as
we do not offer any kind of refunds on our system.
      </p>

    </div>
  </Container>
    </Layout>

  )
}

export default Index
