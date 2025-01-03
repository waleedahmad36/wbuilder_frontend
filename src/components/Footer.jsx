import React from 'react';
import { FaFacebook, FaLinkedin, FaTwitter, FaGithub } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="w-full bg-gradient-to-b from-gray-900 via-gray-900 to-black text-gray-200 py-10 mt-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-8 px-4">
        {/* Logo and Info Section */}
        <div className="flex flex-col md:flex-row items-center gap-6">
          <img
            src="https://scontent.flhe32-1.fna.fbcdn.net/v/t39.30808-6/394668820_278497571825042_8984893206950098085_n.jpg?stp=dst-jpg_p526x296_tt6&_nc_cat=100&ccb=1-7&_nc_sid=a5f93a&_nc_ohc=NEphHHmhmL0Q7kNvgGlHyRH&_nc_oc=AdhlVWNFUHKGrAEnt9FFgMGzZO9FM1MCCLe8iSpYw4j_Up38sGDhbGmlssucZxR_tY0&_nc_pt=1&_nc_zt=23&_nc_ht=scontent.flhe32-1.fna&_nc_gid=AxB66K9v0gt10jbP8uL6zdh&oh=00_AYARyRo51xghBkgJYp0AruV_ijgC71LABJxDn6LJL5Gp5w&oe=677CC3A9"
            alt="Waleed Ahmad"
            className="w-16 h-16 rounded-full border-4 border-gray-700 shadow-lg"
          />
          <div className="text-center md:text-left">
            <h3 className="text-xl font-semibold text-white">Made by <span className="text-blue-500">Waleed Ahmad</span></h3>
            <p className="text-sm">Full-Stack Developer & Designer</p>
          </div>
        </div>
        {/* Quick Links */}
        <div className="flex flex-col items-center md:items-start">
          <h4 className="text-lg font-semibold text-white">Quick Links</h4>
          <ul className="mt-2 space-y-1">
            <li><Link to='https://portfolio-waleed-kappa.vercel.app/about' className="hover:text-blue-500 transition duration-300">About Me</Link></li>
            <li><Link to='https://portfolio-waleed-kappa.vercel.app/projects' className="hover:text-blue-500 transition duration-300">Projects</Link></li>
            <li><Link to='/feedback' className="hover:text-blue-500 transition duration-300">Feedback</Link></li>
          </ul>
        </div>
        {/* Social Links */}
        <div className="flex flex-col items-center md:items-start">
          <h4 className="text-lg font-semibold text-white">Follow Me</h4>
          <div className="flex gap-4 mt-2">
            <a href="https://www.facebook.com/profile.php?id=100089944027822" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition duration-300">
              <FaFacebook size={24} />
            </a>
            <a href="https://www.linkedin.com/in/waleedahmad09/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition duration-300">
              <FaLinkedin size={24} />
            </a>
            <a href="hhttps://github.com/waleedahmad36" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition duration-300">
              <FaTwitter size={24} />
            </a>
            <a href="https://github.com/waleedahmad36" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition duration-300">
              <FaGithub size={24} />
            </a>
          </div>
        </div>
      </div>
      {/* Footer Bottom */}
      <div className="mt-10 text-center text-gray-300 text-sm border-t border-gray-700 pt-4">
        &copy; {new Date().getFullYear()} <span className="text-white">Waleed Ahmad</span>. All rights reserved.
      </div>
    </div>
  );
};

export default Footer;
