import Header from './Header'
import Footer from './Footer'
import Prototypes from 'prop-types'


const Layout = ({children}) => {

 
  return (
    <>
        <Header/>
        <main>{children}</main>
        <Footer/>
      
    </>
  )
}

Layout.Prototypes ={
  children: Prototypes.any
}

export default Layout
