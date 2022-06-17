import Container from '@components/landing/components/container'

const testimonies = [

  {
    body: 'The Withdrawal is very fast. I was paid in less than 5 Minutes after placing withdrawal.',
    name: 'Tosin',
    profession: 'Affiliate Market'
  },
  {
    body: 'The ELEV8 Project is very marketable, I’ve referred 21 People so far into the community and I got my credit alert very fast.',
    name: 'Glory',
    profession: 'Nurse'
  },
  {
    body: 'ELEV8 Project accommodates everyone whether young or old. The Whatsapp marketing course has helped my business growth a lot.',
    name: 'Taiwo',
    profession: 'Entrepreneur'
  },
  {
    body: 'The Free Technical Analysis opened my eyes to the analytical aspect of crypto trading I never understood. It was carefully and simply explained to my understanding.',
    name: 'Samuel',
    profession: 'Trader'
  },
  {
    body: 'The 8 Free Courses are so full of value and knowledge that’s worth more way more than the signup fees and it accommodated everyone regardless of your age, knowledge or social status. ELEV8 is for Everyone',
    name: 'Adeyinka',
    profession: 'Teacher'
  },
  {
    body: 'I’ve been following the platform for a while before I joined and I must commend the efforts and consistency of the team in charge. They have really done well.',
    name: 'Ahmed',
    profession: 'Lawyer'
  },
  {
    body: 'The courses are very easy to understand. The videos were very clear and the tutors explained very well. The registration fees is too cheap for the value we got. God bless the founders of ELEV8.',
    name: 'Fatima',
    profession: 'Makeup Artist'
  },
  {
    body: 'I want to thank the tutors for the simplicity of the explanations. Simple and Easy to understand. This is a great platform and I thank you all for coming up with this so that y’all can impact our lives. GOD BLESS YOU ALL REAL GOOD.',
    name: 'Emmanuel',
    profession: 'Student'
  },
  {
    body: 'I never had any knowledge about Sportsbetting prior to joining ELEV8, After Joining ELEV8 I had access to 8 free courses but was curious about Sportsbetting, It was really enlightening and I’ve been making money from Sportsbetting ever since then.',
    name: 'Oduntan',
    profession: 'Student'
  },
  {
    body: 'I really enjoyed the copywriting, entrepreneurship and Whatsapp marketing courses. They were the right combination of courses I needed as a business owner. I close more sales confidently now. I took the trading and technical analysis classes too and I put some of my money into my binance account and it’s been increasing due to the successful and profitable trading signals that has been dropped so far. All have ended in profits. Now I have money coming in from trading and my business. God bless the team real good.',
    name: 'Chidinma',
    profession: 'Consultant'
  }
]

const Testimonials = () => {
  return (
        <Container>

      <div className=" md:mx-auto mb-10 px-8 md:mb-12 sm:text-center ">
        <h2 className=" max-w-7xl mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-5xl md:mx-auto"><span className="relative inline-block">
       <svg
        viewBox="0 0 52 24"
        fill="currentColor"
        className=" absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 text-orange-600 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block"
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
       <span className="relative">Testimonials </span>
      </span>
        </h2>
        <p className=" max-w-7xl">
            Hear wghat our members have to say.
        </p>
      </div>
            <div className="container mx-auto px-4 flex flex-col lg:items-center justify-between lg:flex-row">
                <div role="list" aria-label="Testimonials" className=" grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 flex-wrap justify-between items-start ">
                   {testimonies.map((testimony, index) => (<div key={index} role="listitem" className="bg-gray-50 shadow rounded p-4 xl:p-8">
                        <svg viewBox="0 0 24 24" className="w-12 h-12 text-green-700">
                          <path fill="currentColor" d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z"/>
                        </svg>

                        <div className="pl-4 pt-4 flex items-start justify-between">
                            <div className="mr-6">
                                <p className="xl:text-2xl xl:leading-loose text-gray-600">{testimony.body}</p>
                                <p className="mt-4 text-xl font-semibold leading-none text-gray-800">{testimony.name}</p>
                            </div>
                        </div>
                    </div>)) }
                </div>
            </div>
        </Container>

  )
}
export default Testimonials
