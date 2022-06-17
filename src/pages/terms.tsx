import Layout from '@components/landing/layout'
import Hero from '@components/landing/sections/hero'
import Courses from '@components/landing/sections/courses'
import Signals from '@components/landing/sections/signals'
import Features from '@components/landing/sections/features'
import Testimonials from '@components/landing/sections/testimonials'
import Faqs from '@components/landing/sections/faqs'

const Index = () => {
  // We are providing acces to information that will help you make money instantly and teacjing skills that will make you compete with counterparts all around the world

  return (
  <Layout>
        <Hero />
        <Courses />
        <Signals />
        <Features />
        <Testimonials />
        <Faqs />
  </Layout>
  )
}

export default Index
