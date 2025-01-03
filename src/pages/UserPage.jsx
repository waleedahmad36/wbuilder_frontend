import React, { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil';
import userAtom from '../atoms/userAtom';
import { Link, useNavigate } from 'react-router-dom';
import { FiCopy, FiExternalLink } from 'react-icons/fi';
import { FaEdit } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { frontendUrl, rootUrl } from '../constants';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { LoaderPinwheel } from 'lucide-react';

const UserPage = () => {
    const user = useRecoilValue(userAtom);
    const [portfolio,setPortfolio]= useState([]);
    const [loading,setLoading] = useState(false);
    const [isCopied, setIsCopied] = useState(false);
    const [deleting,setDeleting] = useState(false);
  const url = `${frontendUrl}/portfolio/${user.username}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(url).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset the state after 2 seconds
    });
  };

    const navigate = useNavigate();

    if(!user) return navigate('/login');


    const getPortfolio = async ()=> {
        setLoading(true);
        try {
            const res = await fetch(`${rootUrl}/api/v1/portfolio/user/${user.username}`);
            const data = await res.json();
            if(data.success){
                setPortfolio(data.data);
            }else{
                console.log(data.message || "something wrong")
            }
        } catch (error) {
            console.log(error)
        }finally{
            setLoading(false);
        }
    }
    useEffect(()=>{
        getPortfolio();
    },[])

    const handleDelete = async ()=> {
        setDeleting(true);
        try {
            const res = await fetch(`${rootUrl}/api/v1/portfolio/${portfolio._id}`,{
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data = await res.json();
            if(data.success){
                toast.success(data.message);
                setPortfolio([]);
                getPortfolio();
            }else{
                console.log(data.message || "something wrong")
            }
        } catch (error) {
            console.log(error)
        }finally{
            setDeleting(false)
        }
    }
    
    if(loading){
        return <div className='flex justify-center items-center w-full h-screen' >
            <div class="flex flex-row gap-2">
  <div class="w-4 h-4 rounded-full bg-blue-700 animate-bounce"></div>
  <div class="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.3s]"></div>
  <div class="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.5s]"></div>
</div>
        </div>
    }
  return (
    <>
    <Navbar/>
    <div  className='flex  justify-center items-center min-h-[40vh] flex-col gap-4 '  >
        {
            portfolio.length===0 && !loading && (
                <div className='flex flex-col items-center' >
                    <h3>You don't have any portfolio, So far😊</h3>
                    <Link to={'/create-portfolio'}  className="px-6 py-3 bg-gradient-to-r from-gray-800 via-gray-900 to-black text-gray-300 font-medium text-lg rounded-lg shadow-md hover:text-white hover:shadow-lg hover:from-black hover:to-gray-800 transition-all duration-500 relative z-10 caveat my-5">Create</Link>
                </div>
            )
        }
        {
            portfolio && !loading && portfolio.length!==0 && (
                 <div className="flex flex-col md:flex-row  items-center gap-4 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md mt-10">
      <Link to={`/portfolio/${portfolio.userId?.username}`} className="flex-1">
        <span className="text-white text-sm hover:text-blue-800 font-medium underline truncate">
          {url}
        </span>
      </Link>
      <button
        onClick={handleCopy}
        className="flex  items-center gap-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-3 py-2 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition"
      >
        <FiCopy className="text-lg" />
        {isCopied ? "Copied!" : "Copy"}
      </button>
    </div>
            )
        }
            {
                portfolio &&  !loading && portfolio.length!==0  && (
                    <Link  to={`/portfolio/${portfolio.userId?.username}`} >
                  <div className="bg-gray-900/60 p-6 rounded-lg shadow-lg shadow-black/60 hover:shadow-2xl transition-all   hover:shadow-blue-200/40  duration-800  relative w-fit ">
      {/* Image Section */}
      <div className="w-[200px] h-[200px] rounded-lg overflow-hidden mb-4">
        <img
          src={portfolio.image}
          alt="Portfolio Image"
          className="w-full h-full object-cover rounded-lg transform hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* User Information */}
      <p className="caveat font-bold text-white text-xl mb-2">{portfolio?.userId?.username}</p>
      <p className="caveat font-semibold text-gray-400 mb-4">{portfolio.userId?.email}</p>

      {/* See Preview with Icon */}
      <div
        className="flex items-center gap-2 text-blue-500 font-semibold hover:text-blue-400 transition-all duration-300"
      >
        <span>See Preview</span>
        <FiExternalLink className="text-xl" />

        {portfolio.userId?._id===user._id && (
            <button   onClick={(e)=>{
                e.preventDefault(); 
                e.stopPropagation();
                navigate(`/update/${portfolio._id}`)
            }}  className='cursor-pointer absolute top-3 right-5 p-4 rounded-full bg-black/60'   >
                <FaEdit   />
            </button>
        )}
      </div>
    </div>
            </Link>
                )
            }

            {
               portfolio &&  !loading && portfolio.length!==0 && (
                    <button className="px-6 py-3 bg-gradient-to-r from-gray-800 via-gray-900 to-black text-gray-300 font-medium text-lg rounded-lg shadow-md hover:text-white hover:shadow-lg hover:from-black hover:to-gray-800 transition-all duration-500 relative z-10 caveat"  onClick={handleDelete}  >{deleting ? (
                      <div  className='flex gap-2' >
                        <LoaderPinwheel  className='animate-spin' />
                        <span  className='caveat' >Deleting...</span>
                      </div>
                    ):'Delete'}</button>
                )
            }
    </div>
    <Footer/>
    </>
  )
}

export default UserPage