import Header from '../components/header'
import Footer from '../components/footer'

const Layout = ({ children }) => {
  return (
    <div className=' min-h-screen  ' >
      <Header />
      <main className='' >{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
