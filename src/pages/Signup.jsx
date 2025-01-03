import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { LoaderPinwheel } from "lucide-react";
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
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    let formErrors = {};
    const usernameRegex = /^[a-zA-Z0-9_]{3,}$/; // At least 3 characters, no special characters except underscores
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!formData.username || !usernameRegex.test(formData.username)) {
      formErrors.username = "Username must be valid and at least 3 characters long.";
    }

    if (!formData.email || !emailRegex.test(formData.email)) {
      formErrors.email = "Please enter a valid email address.";
    }

    if (!formData.password || formData.password.length < 6) {
      formErrors.password = "Password must be at least 6 characters long.";
    }

    if (!formData.gender) {
      formErrors.gender = "Please select your gender.";
    }

    return formErrors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    })); // Clear errors when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return; // Stop submission if there are validation errors
    }

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
    } finally {
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
            value={formData.username}
            onChange={handleInputChange}
          />
          {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
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
            value={formData.email}
            onChange={handleInputChange}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
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
            value={formData.password}
            onChange={handleInputChange}
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
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
          {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
        </div>

        <button
          type="submit"
          className="px-5 py-2 bg-gradient-to-r from-gray-800 via-gray-900 to-black text-gray-300 font-medium text-lg rounded-lg shadow-md hover:text-white hover:shadow-lg hover:from-black hover:to-gray-800 transition-all duration-500 relative z-10 caveat w-fit"
        >
          {loading ? (
            <LoaderPinwheel className="w-8 h-8 animate-spin text-blue-600" />
          ) : (
            "Signup"
          )}
        </button>
        <p className="text-sm">
          Already Have an Account?{" "}
          <Link to="/login" className="text-blue-100">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
