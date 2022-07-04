import Container from '@components/landing/components/container'
import { useState } from 'react'

const faqs = [

  {
    Q: 'WHAT IS ELEV8 ?',
    A: 'ELEV8 is an online platform where you get to learn and earn with no extra cost after the membership registration fees.'
  },
  {
    Q: 'WHAT DO I STAND TO GAIN AS A MEMBER OF ELEV8 ?',
    A: 'You get 8 Free Courses, 50% Discounted Courses, Free Trading Signals for FOREX, DEFI and Crypto, Free Business Advertisements, Free VIP Sportsbetting Predictions, Random, weekly and Monthly where members can win cash prizes, recharge cards, phones, Free courses, laptops and many more.'
  },
  {
    Q: 'WH\'AT ARE THE 8 FREE COURSES I GET TO LEARN AS A MEMBER OF ELEV8?',
    A: 'Forex Trading, Crypto (Spots) Trading, Crypto (Futures) Trading, Technical Analysis, Whatsapp Marketing, Copywriting, Entrepreneurship and Sportsbetting for beginners. '
  },
  {
    Q: 'IN WHAT FORMAT ARE THE COURSES ?',
    A: 'The Courses are 100% Practical, Easy to Understand and In Videos which means you can always watch them anytime and ask questions from your tutors.'
  },
  {
    Q: 'WHAT IS THE VALUE OF THE COURSES AS IT LOOKS TOO GOOD TO BE TRUE ?',
    A: 'They\'re courses worth over 100k as they\'re quality courses with videos of 15Mins to 3hours per course.'
  },
  {
    Q: 'HOW SUSTAINABLE AND FLEXIBLE IS ELEV8 ?',
    A: 'ELEV8 is a long term project aimed at continuously elevating lives and the services offered are very flexible and such makes it a program that will last for a very long time this is because it is not built on members payment because the 5000 registration fees isn\'t even up to the value of the 8 Free Courses talkless of every other benefits as a member.'
  },
  {
    Q: 'ARE THERE ANYTHING TO DO AS A MEMBER ?',
    A: ' YES, To Access The Premium Services (Trading Signals/VIP Predictions), You need to Share a sponsored post daily either on Facebook or whatsapp to earn points that will unlock the premium services.'
  },
  {
    Q: 'IS ELEV8 A READ AND EARN PLATFORM ?',
    A: 'No, It\'s not. You only share a post daily for points in order to access our premium services and the Monthly ELEV8 Lottery.'
  },
  {
    Q: 'IS THERE AFFILIATE MARKETING OPPORTUNITY IN ELEV8 ?',
    A: 'Yes, Direct Earnings are based on the 30% Referral commission you earn when you refer new members to our Website. This is equivalent to 3000 naira per referrals.'
  },
  {
    Q: 'CAN I REFER MY FRIENDS AND FAMILIES TO ELEV8 ?',
    A: 'Yes you can and You\'d get 3000 naira per person you bring into the community.'
  },
  {
    Q: 'WHAT\'S THE MINIMUM WITHDRAWAL ?',
    A: 'The minimum withdrawal is 5,000 naira and it can be withdrawn anytime and gotten Into your account within 5 Mins of withdrawal.'
  },
  {
    Q: 'IS REFERRALS COMPULSORY ?',
    A: 'Referral is not compulsory. You can just sign up and have access to every other benefits as a member.'
  },
  {
    Q: 'AFTER LEARNING MY COURSE, DO I STILL HAVE ACCESS TO IT ?',
    A: 'Yes, Every ELEV8 Member have lifetime access to all their 8 Free Courses. '
  },
  {
    Q: 'HOW DO WE GET ACCESS TO THE COURSES ?',
    A: 'Once You sign up and make payments for registration, You\'d get a mail with your unique login details and access to the 8 Free courses automatically at no extra cost. You\'d just login and start learning.'
  },
  {
    Q: 'HOW DOES THE 50% DISCOUNTED COURSES WORK ?',
    A: 'Every ELEV8 Member has access to 50% Discounts on Almost 100 Courses available at LV Academy some of these courses includes Shoe Making, Bag Making, Fashion Designing, Photography, Fundamental and Technical Analysis, Stock Trading, DEFI, NFT, LANGUAGES(FRENCH, IGBO, YORUBA) etc'
  },
  {
    Q: 'HOW MANY PEOPLE HAVE BENEFITTED ?',
    A: 'A lot of people are benefitting from the program everyday. You can see examples in our testimonies.'
  },
  {
    Q: 'WHAT TO DO WHEN I CAN\'T ACCESS MY ACCOUNT ?',
    A: 'You can always contact our 24/7 support if you have any issues or inquiries and they\'d respond to your complaints'
  },
  {
    Q: 'IS IT A PLATFORM WHERE YOU INVEST AND EXPECT ROI ?',
    A: 'ELEV8 is not an Investment platform. It is Learn and Earn Platform.'
  },

  {
    Q: 'HOW MUCH IS THE MEMBERSHIP REGISTRATION/SIGNUP FEES ?',
    A: 'The Membership Registration/Signup Fees is 10,000 Naira only'
  },
  {
    Q: 'IS IT A ONE TIME PAYMENT? OR MORE PAYMENTS WILL BE MADE IN FUTURE ?',
    A: 'It is a One time Payment, You\'re not making any more payments after the 10,000 naira Signup fees to become a Member. Every other benefits as a member is Free.'
  },
  {
    Q: 'HOW DOES THE FREE ADVERTISEMENTS FOR MEMBERS WORK ?',
    A: ' In the dashboard of every ELEV8 members, there\'s a form to fill with the details of there business and adverts. All they have to do it to fill the form and wait for Scrutinization and once it\'s approved. It will be a Sponsored Post on ELEV8 and will be promoted to thousands of people across the country and beyond.'
  },
  {
    Q: 'HOW DOES THE MONTHLY LOTTERY WORK ?',
    A: ' On the 30th of Every Month, A Portal will be opened where all eligible members fills a form and some members will be selected randomly and given different prizes ranging from Cash, Recharge Cards, Phones, Laptops, Branded Tshirts, Free Premium Paid Courses, Movie Tickets, Fully Paid Hangout (Dinner, Lunch) etc as a way of Promoting Love, Sharing Love and Giving back to the society.'
  },
  {
    Q: 'HOW DOES THE RANDOM GIVEAWAY WORK ?',
    A: ' Random Giveaways happens in form of Predict and Win, Solving of Riddles and Word Problems, Unscrambling etc in order to win cash prizes and recharge cards.'
  },
  {
    Q: 'WHAT DO YOU EARN AS A MEMBER ?',
    A: 'Points and Referral Bonus. Referral Bonus is what you earn as an affiliate when you bring someone to the platform while Points is what you earn Daily in order to access premium Services and Monthly Lottery and Can be Referred to as ELEV8 Tokens that can be converted to BNB AND BUSD later in the nearest future when ELEV8 Token is launched.'
  }
]
const Item = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
  <div className="border-b">
   <button
    type="button"
    aria-label="Open item"
    title="Open item"
    className="flex items-center justify-between w-full p-4 focus:outline-none"
    onClick={() => setIsOpen(!isOpen)}
   >
    <p className="  font-medium">{title}</p>
    <svg
     viewBox="0 0 24 24"
     className={`w-3  transform transition-transform duration-200 ${
      isOpen ? 'rotate-180' : ''
     }`}
    >
     <polyline
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeMiterlimit="10"
      points="2,7 12,17 22,7"
      strokeLinejoin="round"
     />
    </svg>
   </button>
   {isOpen && (
    <div className="p-4 pt-0">
     <p className="">{children}</p>
    </div>
   )}
  </div>
  )
}

const Faqs = () => {
  return (
  <Container id='faqs'>
   <div className=" sm:mx-auto px-8">
    <div className="lg:max-w-7xl md:mx-auto mb-10 md:mb-12 sm:text-center">
     <h2 className="max-w-7xlmd:mx-auto mb-6 font-sans text-5xl font-bold leading-none tracking-tight text-gray-900 sm:text-6xl ">
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
       <span className="relative">Frequently </span>
      </span>{' '}Asked Questions
     </h2>
     <p className=" test-xl  md">
      Sed ut perspiciatis unde omnis iste natus error sit voluptatem
      accusantium doloremque rem aperiam, eaque ipsa quae.
     </p>
    </div>
    <div className=" grid sm:grid-cols-1 lg:grid-cols-2  gap-6 flex-wrap justify-between items-start shrink space-y-8">
     {faqs.map((item, index) => (<Item key={index} title={item.Q}>{item.A}</Item>))}
    </div>
   </div>
  </Container>
  )
}

export default Faqs
