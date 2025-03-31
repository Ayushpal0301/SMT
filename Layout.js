import React from 'react'
import Header from './Header'
import Footer from './Footer'
import {Helmet} from 'react-helmet'
import {Toaster} from 'react-hot-toast'
import 'react-toastify/dist/ReactToastify.css';

const Layout = ({children,title='SMT. Enterprises',description='MERN Stack Project',keywords='MERN , react, node , mongodb',author='yush Pal'}) => {
  return (
    <div>
        <Helmet>
            <meta charSet='utf-8'/>
            <meta name="description" content={description}/>
            <meta name="keywords" content={keywords}/>
            <meta name="author" content={author}/>
            <title>{title}</title>
        </Helmet>
      <Header/>
      <main className='' style={{minHeight:'75vh'}}>
        <Toaster/>
      {children}
      </main>
      <Footer/>
    </div>
  )
};

export default Layout
