import { Loader2 } from 'lucide-react'
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom'
import { useSetRecoilState } from 'recoil';
import userAtom from '../atoms/userAtom';
import { rootUrl } from '../constants';

const Login = () => {
  const setUser = useSetRecoilState(userAtom);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    gender: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
        const res = await fetch(`${rootUrl}/api/v1/auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(formData),
          });
          const data = await res.json();
          if (data.success) {
            toast.success("User logged In successfully");
            setUser(data.user);
            navigate("/");
          } else {
              toast.error(data.message || "Something went wrong");
          }
    } catch (error) {
        toast.error("Something went wrong");
    }finally{
        setLoading(false);
    }
  };
  return (
    <div className="flex w-full h-screen justify-center items-center px-4">
      <form
        className="w-full max-w-xl flex flex-col gap-4 bg-black/60 p-6 rounded-xl"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col">
          <label htmlFor="email" className="text-lg tracking-wide">
            Email
          </label>
          <input
            type="email"
            name="email"
            className="p-2 rounded-lg bg-transparent border-b border-b-blue-800 focus:border-blue-100 transition-border duration-300"
            placeholder="waleed@gmail..."
            onChange={handleInputChange}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password" className="text-lg tracking-wide">
            Password
          </label>
          <input
            type="password"
            name="password"
            className="p-2 rounded-lg bg-transparent border-b border-b-blue-800 focus:border-blue-100 transition-border duration-300"
            placeholder="waleed786"
            onChange={handleInputChange}
          />
        </div>
        

        <button type="submit" className="bg-blue-800 px-4 py-2 rounded-lg w-fit">
          {loading ?  <Loader2 className="w-8 h-8 animate-spin text-blue-600" /> : "Login"}
        </button>
        <p  className="text-sm" >Don't Have an Account ? <Link to='/signup'  className="text-blue-100"  >Register</Link></p>
      </form>
    </div>
  )
}

export default Login