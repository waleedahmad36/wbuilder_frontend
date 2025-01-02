import { FaFacebook, FaTwitter,  FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = ({portfolio}) => {
  return (
    <footer className="bg-gray-900/40 text-gray-300 py-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
        {/* Left Section */}
        <div className="text-center md:text-left">
          <h2 className="text-xl font-semibold">MyWebsite</h2>
          <p className="mt-2 text-sm">
            Building seamless user experiences, one project at a time.
          </p>
        </div>

        {/* Middle Section: Links */}
        <div className="mt-6 md:mt-0 flex flex-col md:flex-row gap-6 text-center">
          <a href="#skills" className="hover:text-white transition duration-300">
            Skills
          </a>
          <a href="#projects" className="hover:text-white transition duration-300">
            Projects
          </a>
          <a href="#contact" className="hover:text-white transition duration-300">
            Contact
          </a>
        </div>

        {/* Right Section: Social Icons */}
        <div className="mt-6 md:mt-0 flex gap-4 justify-center">
          <a href={portfolio.fbLink} className="hover:text-blue-500 transition duration-300">
            <FaFacebook size={24} />
          </a>
          <a href={portfolio.linkedinLink} className="hover:text-blue-400 transition duration-300">
            <FaLinkedin size={24} />
          </a>
          <a href={portfolio.twitterLink} className="hover:text-pink-500 transition duration-300">
            <FaTwitter size={24} />
          </a>
          <a href={portfolio.githubLink} className="hover:text-gray-500 transition duration-300">
            <FaGithub size={24} />
          </a>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm">
        © {new Date().getFullYear()} MyWebsite. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
