import React, { useState, useEffect } from "react";
import { Facebook, Twitter, Linkedin, Github } from "lucide-react";

const Hero = ({ portfolio }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, 100); // Delay for smooth appearance
    return () => clearTimeout(timeout);
  }, []);

  const truncateText = (text, maxLength) => {
    if (!text) return "";
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  return (
    <div
      className="min-h-[80vh] flex justify-center lg:justify-between items-center w-full max-w-4xl mx-auto relative flex-wrap-reverse lg:flex-nowrap py-8 lg:py-0 gap-5 mt-20"
      id="hero"
    >
      {/* Left Side */}
      <div
        className={`flex flex-col gap-5 items-center lg:items-start ${
          isVisible
            ? "opacity-100 translate-x-0"
            : "opacity-0 translate-x-[-20px]"
        } transition-all duration-1000 relative z-10`}
      >
        <h2 className="uppercase font-bold text-3xl">
          Hello, <span className="text-blue-100">My name is</span>
        </h2>
        <h1 className="text-blue-100 text-3xl tracking-wider">
          {truncateText(portfolio.name, 20)}
        </h1>
        <h3 className="text-3xl">
          I am <span className="caveat">{portfolio?.title}</span>
        </h3>
        <p className="caveat w-[90%] lg:w-[80%] tracking-wider text-lg">
          {truncateText(portfolio.description, 300)}
        </p>
        <div className="flex space-x-4">
          <a
            href={`${portfolio.fbLink}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Facebook className="w-6 h-6 text-blue-100" />
          </a>
          <a
            href={`${portfolio.twitterLink}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Twitter className="w-6 h-6 text-gray-700" />
          </a>
          <a
            href={`${portfolio.linkedinLink}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin className="w-6 h-6 text-blue-100" />
          </a>
          <a
            href={`${portfolio.githubLink}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github className="w-6 h-6 text-blue-100" />
          </a>
        </div>

        <a href={portfolio.cv} target="_blank" rel="noopener noreferrer">
          <button className="px-6 py-3 bg-gradient-to-r from-gray-800 via-gray-900 to-black text-gray-300 font-medium text-lg rounded-lg shadow-md hover:text-white hover:shadow-lg hover:from-black hover:to-gray-800 transition-all duration-500 relative z-10  caveat">
            Download CV
          </button>
        </a>
      </div>

      {/* Right Side */}
      <div
        className={`relative ${
          isVisible
            ? "opacity-100 translate-x-0"
            : "opacity-0 translate-x-[20px]"
        } transition-all duration-1000`}
      >
        <div className="w-[300px] h-[300px] rounded-full relative bg-white shadow-[0_-10px_20px_-5px_rgba(191,219,254,0.5),0_5px_15px_-3px_rgba(0,0,0,0.1)]">
          <img
            src={portfolio.image}
            alt="Profile"
            className="w-full h-full rounded-full"
          />
          <div className="absolute bottom-8 -right-6 md:-right-16 bg-blue-800 px-3 md:px-6 py-3 rounded-lg">
            <p className="caveat font-bold text-xl tracking-wider">
              Web Developer
            </p>
          </div>
        </div>
      </div>

      <div
        className={`w-[2px] h-[50%] bg-blue-100 absolute -left-10 section-border hidden lg:block ${
          isVisible
            ? "opacity-100 translate-x-0"
            : "opacity-0 translate-x-[-20px]"
        } transition-all duration-1000`}
      ></div>

      <p className="caveat absolute bottom-0 text-6xl lg:text-9xl tracking-widest left-[50%] translate-x-[-50%] text-nowrap opacity-10  text-blue-100">
        Web Developer
      </p>
    </div>
  );
};

export default Hero;
