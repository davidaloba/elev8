import Container from '@components/landing/components/container'
import Image from 'next/image'
import Link from 'next/link'

export const Hero = () => {
  return (
    <div className='bg-gradient-to-br from-orange-200 to-green-200 -mt-36 pt-36'>

      <Container>

          <div className='max-w-7xl mx-auto flex flex-col items-center justify-center'>
            <Image src="/bg.png" alt="nextjs" width='800px' height='450' />
          </div>

          <div>
            <h1 className="text-6xl font-bold w-2/3 text-center mx-auto -mt-28 mb-8">Earn & Learn while having Fun </h1>
            <p className='w-4/5 text-center mx-auto ' >ELEV8 is a platform created with the ultimate goal to elevate lives and give as much as we can to the society in a very organized manner.</p>
            <div className='flex justify-center'>
            <Link href="/login" passHref >
              <button className='my-6 py-3 px-20 rounded-2xl border-none bg-green-700  text-white font-semibold'>
                Get started
              </button>
            </Link>
            </div>

          </div>

          <div className='max-w-7xl mt-4  mx-auto flex flex-col items-center justify-center'>
            <Image src="/bg-1.png" alt="nextjs" width='800px' height='450' />
          </div>

      </Container>
    </div>

  )
}
export default Hero
