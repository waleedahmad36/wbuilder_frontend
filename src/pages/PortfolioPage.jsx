import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom'
import Navigation from '../components/portfolio1/Navigation';
import Hero from '../components/portfolio1/Hero';
import Skills from '../components/portfolio1/Skills';
import Projects from '../components/portfolio1/Projects';
import Contact from '../components/portfolio1/Contact';
import Footer from '../components/portfolio1/Footer';
import { rootUrl } from '../constants';

const PortfolioPage = () => {
    const {username}  = useParams();
    const [portfolio,setPortfolio]= useState({});
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(null);
    const getPortfolio = async ()=> {
        setLoading(true);
        try {
            const res = await fetch(`${rootUrl}/api/v1/portfolio/user/${username}`);
            const data = await res.json();
            if(data.success){
                setPortfolio(data.data);
            }else{
                setError(data.message || "something wrong");
            }
        } catch (error) {
            setError("something went wrong")
        }finally{
            setLoading(false);
        }
    }

    useEffect(()=>{
        getPortfolio();
    },[]);

    if(error){
        return <div className='flex justify-center items-center w-full h-screen' >
            <p className='text-red-500'>{error}</p>
        </div>
    }
  return (
    <>
   {
    loading ? (
        <div className='flex justify-center items-center w-full h-screen' >
            <div class="flex flex-row gap-2">
  <div class="w-4 h-4 rounded-full bg-blue-700 animate-bounce"></div>
  <div class="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.3s]"></div>
  <div class="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.5s]"></div>
</div>
        </div>
    ) : (
        <div  className='bg-black' >
        <Navigation  portfolio={portfolio} />
        <Hero  portfolio={portfolio} />
        <Skills  skills={portfolio.skills} />
        <Projects  projects={portfolio.projects}  />
        <Contact  portfolio={portfolio}  />
        <Footer  portfolio={portfolio}  />
        </div>
    )    
   }
    </>
  )
}

export default PortfolioPage