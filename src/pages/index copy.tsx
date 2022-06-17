import Image from 'next/image'
import {
  Container,
  Header,
  Footer,
  Testimonies
} from '@components'
import Link from 'next/link'

const Index = () => {
  // We are providing acces to information that will help you make money instantly and teacjing skills that will make you compete with counterparts all around the world

  return (
    <>
      <header className='bg-gradient-to-br from-orange-200 to-green-200'>
        <Container>
          <Header />
        </Container>
        <div className='max-w-7xl  mx-auto flex flex-col items-center justify-center'>
          <Image src="/bg.png" alt="nextjs" width='800px' height='450' />
        </div>
        <Container>
          <h1 className="text-6xl font-bold w-2/3 text-center mx-auto -mt-28 mb-8">Earn & Learn while having Fun </h1>
          <p className='w-4/5 text-center mx-auto ' >Elev8 is a community of young and vibrant people that empowers it's members with skills to make money online.</p>
          <Link href="/login" passHref >
            <button className='my-6 py-5 rounded-2xl border-none bg-green-700  text-white font-semibold'>
              Get started
            </button>
          </Link>
        </Container>
        <div className='max-w-7xl mt-4  mx-auto flex flex-col items-center justify-center'>
          <Image src="/bg-1.png" alt="nextjs" width='800px' height='450' />
        </div>
      </header>
      <main className='p-0 text-green-800' >
        <section className='bg-slate-100 py-10'>
          <Container>
            <div className=' rounded-3xl bg-white py-16 mb-10 shadow-lg'>
              <p className='w-4/5 text-center mx-auto text-4xl ' >Members get <span className='text-orange-500'>served</span> </p>
              <h1 className="text-6xl font-bold w-2/3 text-center mx-auto  uppercase">the bank</h1>
              <p className='w-4/5 text-2xl text-center mx-auto ' >Get <span className='text-orange-500 uppercase '>exclusive</span> access to <span className='text-orange-500 uppercase '>vip premium trading signals</span> for Spots, Futures, DEFI and <span className='text-orange-500 uppercase '>vip football match predictions </span>to make crazy money.</p>
            </div>

            <div className=' rounded-3xl bg-white py-16 mb-10 shadow-lg'>
              <p className='w-4/5 text-center mx-auto text-4xl ' ><span className='text-orange-500'>Skill</span> up with our</p>
              <h1 className="text-6xl font-bold w-2/3 text-center mx-auto  uppercase"> <span className='text-orange-500'>free </span> courses</h1>
              <p className='w-4/5 text-2xl text-center mx-auto '>Get free access to online courses that can make you a lot of money. Some of the courses include..</p>
              <p className='w-4/5 text-2xl text-center mx-auto text-orange-500'>
                Introduction to Crypto Spots Trading
              </p>
              <p className='w-4/5 text-2xl text-center mx-auto '>
                Introduction to Crypto Futures Trading
              </p>
              <p className='w-4/5 text-2xl text-center mx-auto text-orange-500'>
                Introduction to Sports Betting for Beginners
              </p>
              <p className='w-4/5 text-2xl text-center mx-auto '>
                WhatsApp Marketing for Beginners
              </p>
            </div>

            <div className=' rounded-3xl bg-white py-16 mb-10 shadow-lg'>
              <p className='w-4/5 text-center mx-auto text-4xl ' >Give your business a</p>
              <h1 className="text-6xl font-bold w-2/3 text-center mx-auto  uppercase"> <span className='text-orange-500'>wider </span> view</h1>
              <p className='w-4/5 text-2xl text-center mx-auto ' >Advertise your business and get seen by thousands of people within and outside Nigeria.</p>
            </div>

            <div className=' rounded-3xl bg-white py-16 mb-10 shadow-lg'>
              <p className='w-4/5 text-center mx-auto text-4xl ' ><span className='text-orange-500'>Earn</span> up to</p>
              <h1 className="text-6xl font-bold w-2/3 text-center mx-auto  uppercase"> 35%</h1>
              <p className='w-4/5 text-2xl text-center mx-auto ' >On every referral as an <span className='text-orange-500'>ELEV8</span>  affiliate.</p>
            </div>

          </Container>
        </section>
        {/* <section className='bg-white 100 py-10'>
        <Container>
          <h1 className="text-6xl font-bold w-2/3 text-center mx-auto mb-6  uppercase">Testimonies</h1>
          <Testimonies />
        </Container>
      </section> */}
        <section className='bg-white 100 py-10'>
          <Container>
            <h1 className="text-6xl font-bold w-2/3 text-center mx-auto  uppercase"><span className='text-orange-500'>ELEV8ING </span>LIVES</h1>

            <p className='w-4/5 text-2xl text-center mx-auto ' >Unlike the Regular online businesses where you get to put money and lose at the end. We are providing a platform where its a Win win, You gain knowledge and make money too.</p>
            <Link href="/login" passHref >
              <button className='my-6 py-5 rounded-2xl border-none bg-green-700  text-white font-semibold'>
                Get started
              </button>
            </Link>
          </Container>
        </section>
      </main>

      <Footer />
    </>
  )
}

export default Index
