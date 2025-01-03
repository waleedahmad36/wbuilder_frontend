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
    <div className='flex flex-col items-center justify-center w-full h-[30vh]' >
      <h1 className='text-5xl caveat text-transparent bg-clip-text bg-gradient-to-r from-gray-100 via-gray-500 ' >waleedWeb</h1>
      <p className='text-lg text-blue-100' >Create your own website in <span className='caveat' >clicks</span></p>
      <Link to='/create-portfolio' className='px-6 py-3 bg-gradient-to-r from-gray-800 via-gray-900 to-black text-gray-300 font-medium text-lg rounded-lg shadow-md hover:text-white hover:shadow-lg hover:from-black hover:to-gray-800 transition-all duration-500 relative z-10 caveat mt-5' >Get Started</Link>
    </div>
    <div  className='w-full max-w-5xl mx-auto' >
    <h3  className='text-4xl text-center md:text-left  md:text-5xl kaushan my-10' >Existing Portfolio's</h3>
    </div>
    <AllPortfolio/>

    <div   className='w-full max-w-5xl mx-auto flex justify-center items-center my-10' >
    <Link to={'/feedback'}  className="px-6 py-3 bg-gradient-to-r from-gray-800 via-gray-900 to-black text-gray-300 font-medium text-xl rounded-lg shadow-md hover:text-white hover:shadow-lg hover:from-black hover:to-gray-800 transition-all duration-500 relative z-10 caveat "
        >
        See FeeBacks
      </Link>
    </div>
    <Footer/>
    </>
  )
}

export default Home