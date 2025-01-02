import React from 'react'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'
import AllPortfolio from '../components/AllPortfolio'
import Footer from '../components/Footer'
import AllFeedbacks from '../components/AllFeedbacks'

const Home = () => {
  return (
    <>
    <Navbar/>
    <div  className='flex justify-end px-10' >
    <Link to='/dashboard'   className='text-blue-500' >Dashboard</Link>
    </div>
    <div className='flex flex-col items-center justify-center w-full h-[30vh]' >
      <h1 className='text-3xl caveat text-blue-100' >Welcome to wBuilder</h1>
      <p className='text-lg text-blue-100' >Create your own website with <span className='caveat' >wBuilder</span></p>
      <Link to='/create-portfolio' className='px-4 py-2 bg-blue-950 rounded-lg text-blue-100 mt-4' >Get Started</Link>
    </div>
    <div  className='w-full max-w-5xl mx-auto' >
    <h3  className='text-4xl text-center md:text-left  md:text-5xl kaushan my-10' >Existing Portfolio's</h3>
    </div>
    <AllPortfolio/>
    <AllFeedbacks/>
    <Footer/>
    </>
  )
}

export default Home