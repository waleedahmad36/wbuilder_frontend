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
    const [portfolio,setPortfolio]= useState({})
    const getPortfolio = async ()=> {
        try {
            const res = await fetch(`${rootUrl}/api/v1/portfolio/user/${username}`);
            const data = await res.json();
            if(data.success){
                setPortfolio(data.data);
            }else{
                toast.error(data.message || "something wrong")
            }
        } catch (error) {
            toast.error("error")
        }
    }

    useEffect(()=>{
        getPortfolio();
    },[])
  return (
    <>
    <div  className='bg-black' >
    <Navigation  portfolio={portfolio} />
    <Hero  portfolio={portfolio} />
    <Skills  skills={portfolio.skills} />
    <Projects  projects={portfolio.projects}  />
    <Contact  portfolio={portfolio}  />
    <Footer  portfolio={portfolio}  />
    </div>
    </>
  )
}

export default PortfolioPage