import React from 'react'
import Header from '../components/Global/Header/Header'
import Footer from '../components/Global/Footer/Footer'

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <main>
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout