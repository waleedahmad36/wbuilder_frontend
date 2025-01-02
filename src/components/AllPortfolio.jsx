import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { FiExternalLink } from "react-icons/fi";
import { FaEdit } from 'react-icons/fa';
import { useRecoilValue } from 'recoil';
import userAtom from '../atoms/userAtom';

const AllPortfolio = () => {
    const user = useRecoilValue(userAtom);
    const [allPortfolio,setAllPortfolio] = useState([]);
    const [loading, setLoading] = useState(false);
    const getAllPortfolio = async ()=> {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:5000/api/v1/portfolio");
        const data = await res.json();
        if(data.success){
            setAllPortfolio(data.data)
            console.log(data.data)
        }
      } catch (error) {
        console.log(error)
        toast.error("Something went wrong")     
      } finally{
        setLoading(false);
      }
    }
    const navigate = useNavigate();

    useEffect(()=>{
        getAllPortfolio();
    },[])
    if(loading){
        return <div className='flex justify-center items-center w-full min-h-[50vh]' >
            <div class="flex flex-row gap-2">
  <div class="w-4 h-4 rounded-full bg-blue-700 animate-bounce"></div>
  <div class="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.3s]"></div>
  <div class="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.5s]"></div>
</div>
        </div>
    }
  return (
    <div  className='flex gap-4 w-full max-w-5xl mx-auto flex-wrap justify-center lg:justify-normal' >
        {allPortfolio?.map((portfolio, i )=> (
            <Link  to={`/portfolio/${portfolio.userId.username}`} >
                  <div className="bg-gray-900/60 p-6 rounded-lg shadow-lg shadow-black/60 hover:shadow-2xl transition-all   hover:shadow-blue-200/40  duration-800  relative ">
      {/* Image Section */}
      <div className="w-[200px] h-[200px] rounded-lg overflow-hidden mb-4">
        <img
          src={portfolio.image}
          alt="Portfolio Image"
          className="w-full h-full object-cover rounded-lg transform hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* User Information */}
      <p className="caveat font-bold text-white text-xl mb-2">{portfolio.userId.username}</p>
      <p className="caveat font-semibold text-gray-400 mb-4">{portfolio.userId.email}</p>

      {/* See Preview with Icon */}
      <div
        className="flex items-center gap-2 text-blue-500 font-semibold hover:text-blue-400 transition-all duration-300"
      >
        <span>See Preview</span>
        <FiExternalLink className="text-xl" />

        {portfolio.userId._id===user._id && (
            <button   onClick={(e)=>{
                e.preventDefault(); 
                e.stopPropagation();
                navigate(`update/${portfolio._id}`)
            }}  className='cursor-pointer absolute top-3 right-5 p-4 rounded-full bg-black/60'   >
                <FaEdit   />
            </button>
        )}
      </div>
    </div>
            </Link>
        ))}
    </div>
  )
}

export default AllPortfolio