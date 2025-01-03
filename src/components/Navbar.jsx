import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import userAtom from '../atoms/userAtom';
import { Loader2, LoaderPinwheel, Menu, X } from 'lucide-react'; // Icons for Hamburger and Close
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const setUser = useSetRecoilState(userAtom);
  const [loading, setLoading] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false); // State for mobile nav

  const handleLogout = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/v1/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
      const data = await res.json();
      if (data.success) {
        toast.success('Logged out successfully');
        setUser(null);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-between items-center px-8 py-4 bg-gradient-to-r from-gray-900 to-black shadow-lg relative z-50">
      {/* Logo Section */}
      <Link to="/" className="flex items-center space-x-3 z-50 relative">
        <img
          src="https://waleedweb.netlify.app/pics/waleedpic.png"
          alt="Logo"
          className="w-12 h-12 rounded-full shadow-md border-2 border-gray-500"
        />
      </Link>

      {/* Hamburger Menu for Small Screens */}
      <button
        onClick={() => setMobileNavOpen(!mobileNavOpen)}
        className="block lg:hidden text-white z-50 relative"
      >
        {mobileNavOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Desktop Navigation */}
      <div className="hidden lg:flex">
        <Link to="/dashboard" className="text-white font-medium text-lg px-4 py-2 hover:text-gray-300 duration-300">
          Dashboard
        </Link>
        <Link to="/create-portfolio" className="text-white font-medium text-lg px-4 py-2 hover:text-gray-300 duration-300">
          Create Portfolio
        </Link>
        <Link to="/feedback" className="text-white font-medium text-lg px-4 py-2 hover:text-gray-300 duration-300">
          Feedback
        </Link>
      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className={`hidden lg:flex items-center justify-center px-6 py-3 bg-gradient-to-r from-gray-800 via-gray-900 to-black text-gray-300 font-medium text-lg rounded-lg shadow-md hover:text-white hover:shadow-lg hover:from-black hover:to-gray-800 transition-all duration-500 relative z-10 caveat ${
          loading ? 'cursor-wait' : 'cursor-pointer'
        }`}
        disabled={loading}
      >
        {loading ? (
          <LoaderPinwheel className="w-6 h-6 animate-spin text-white" />
        ) : (
          'Logout'
        )}
      </button>

      {/* Mobile Navigation */}
      <div
        className={`lg:hidden fixed inset-0 bg-black bg-opacity-90 z-30 flex flex-col items-center justify-center space-y-6 transition-transform duration-300 ${
          mobileNavOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <Link
          to="/dashboard"
          className="text-white text-2xl font-semibold hover:text-gray-300 duration-300"
          onClick={() => setMobileNavOpen(false)}
        >
          Dashboard
        </Link>
        <Link
          to="/create-portfolio"
          className="text-white text-2xl font-semibold hover:text-gray-300 duration-300"
          onClick={() => setMobileNavOpen(false)}
        >
          Create Portfolio
        </Link>
        <Link
          to="/feedback"
          className="text-white text-2xl font-semibold hover:text-gray-300 duration-300"
          onClick={() => setMobileNavOpen(false)}
        >
          Feedback
        </Link>
        <button
          onClick={handleLogout}
          className={`flex lg:hidden items-center justify-center px-6 py-3 bg-gradient-to-r from-gray-800 via-gray-900 to-black text-gray-300 font-medium text-lg rounded-lg shadow-md hover:text-white hover:shadow-lg hover:from-black hover:to-gray-800 transition-all duration-500 relative z-10 caveat ${
            loading ? 'cursor-wait' : 'cursor-pointer'
          }`}
          disabled={loading}
        >
          {loading ? <LoaderPinwheel className="w-8 h-8 animate-spin text-white" /> : 'Logout'}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
