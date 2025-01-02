import React, { useState } from "react";
import { toast } from "react-hot-toast";
import {Loader2} from "lucide-react";
import { useSetRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";
import { Link, useNavigate } from "react-router-dom";
import { rootUrl } from "../constants";

const Signup = () => {
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
    console.log(e.target);
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
        const res = await fetch(`${rootUrl}/api/v1/auth/signup`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(formData),
          });
          const data = await res.json();
          if (data.success) {
            toast.success("User registered successfully");
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
          <label htmlFor="username" className="text-lg tracking-wide">
            Username
          </label>
          <input
            type="text"
            name="username"
            className="p-2 rounded-lg bg-transparent border-b border-b-blue-800 focus:border-blue-100 transition-border duration-300"
            placeholder="@waleed..."
            onChange={handleInputChange}
          />
        </div>
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
        <div className="flex gap-5">
          <label htmlFor="gender" className="text-lg tracking-wide">
            Gender
          </label>
          <div>
            <input
              type="radio"
              name="gender"
              value="male"
              className="mr-2 cursor-pointer"
              onChange={handleInputChange}
            />
            <span>Male</span>
          </div>
          <div>
            <input
              type="radio"
              name="gender"
              value="female"
              className="mr-2 cursor-pointer"
              onChange={handleInputChange}
            />
            <span>Female</span>
          </div>
        </div>

        <button type="submit" className="bg-blue-800 px-4 py-2 rounded-lg w-fit">
          {loading ?  <Loader2 className="w-8 h-8 animate-spin text-blue-600" /> : "Signup"}
        </button>
        <p  className="text-sm" >Already Have an Account ? <Link to='/login'  className="text-blue-100"  >Login</Link></p>
      </form>
    </div>
  );
};

export default Signup;
