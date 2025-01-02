import React, { useState } from 'react'
import { useSetRecoilState } from 'recoil';
import userAtom from '../atoms/userAtom';
import { Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const setUser = useSetRecoilState(userAtom);
    const [loading, setLoading] = useState(false);
    const handleLogout = async ()=>{
        setLoading(true);
        try {
            const res = await fetch('http://localhost:5000/api/v1/auth/logout', {
                method: 'POST',
                credentials: 'include'
            })
            const data = await res.json()
            if(data.success){
                toast.success("Logged out successfully");
                setUser(null);
            }
        } catch (error) {
            console.log(error)
        } finally{
            setLoading(false);
        }
    }
  return (
    <div  className='flex justify-between px-6 py-4 items-center' >
        <Link to='/' className='text-2xl font-bold' >
        <h3 className='text-3xl caveat ' >w<span className='kaushan text-blue-100' >Builder</span></h3>
        </Link>
        <button  className='px-4 py-2 bg-blue-950 rounded-lg text-blue-100' onClick={handleLogout} >
            {loading ? <Loader2  className='w-8 h-8 animate-spin text-blue-100' /> : 'Logout'}
        </button>
    </div>
  )
}

export default Navbar