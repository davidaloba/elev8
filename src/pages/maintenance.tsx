import Image from 'next/image'
import {
  Container
} from '@components'

const Index = () => {
  // We are providing acces to information that will help you make money instantly and teacjing skills that will make you compete with counterparts all around the world

  return (<>
    <header className='bg-gradient-to-br from-orange-200 to-green-200'>
      <div className='max-w-7xl  mx-auto flex flex-col items-center justify-center'>
        <Image src="/bg.png" alt="nextjs" width='800px' height='450' />
      </div>
      <Container>
        <h1 className="text-6xl font-bold w-2/3 text-center mx-auto -mt-28 mb-8">Under Maintenance</h1>
        <p className='w-4/5 text-center mx-auto ' >We are currently undergoing maintenance. We will be back soon. You can reach us via the button below in the mean time.</p>
        <button className='my-6 py-5 rounded-2xl border-none bg-green-700  text-white font-semibold'><a href="https://wa.me/2348069947791" target='_blank' rel='noreferrer '>Contact Us</a></button>
      </Container>
      <div className='max-w-7xl mt-4  mx-auto flex flex-col items-center justify-center'>
        <Image src="/bg-1.png" alt="nextjs" width='800px' height='450' />
      </div>
    </header>
  </>
  )
}

export default Index
