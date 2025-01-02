import React from "react";
import { Facebook, Twitter, Linkedin, Github } from "lucide-react";

const Hero = ({ portfolio, preview, files }) => {
    console.log(portfolio.image)
  const truncateText = (text, maxLength) => { 
    if (!text) return "";
    if (text.length > maxLength) {
       return text.substring(0, maxLength) + "...";
       }
        return text; 
      };
  return (
    <div className="flex  justify-center flex-wrap-reverse lg:flex-nowrap items-center  w-full max-w-xl mx-auto relative  py-8  gap-3  px-8  lg:px-12 flex-col-reverse lg:flex-row lg:justify-between"  id="hero"  >
      {/* left side  */}
      <div className="flex flex-col gap-5   "  
      >
        <h2 className=" uppercase font-bold text-sm">
          Hello, <span className="text-blue-100">My name is</span>
        </h2>
        <h1 className="text-blue-100 text-sm tracking-wider">
          {truncateText(portfolio.name,20)}
        </h1>
        <h3 className="text-sm  ">
          I am <span className="caveat">{truncateText(portfolio?.title,30)}</span>
        </h3>
        <p className="caveat  tracking-wider text-sm">
          {truncateText(portfolio.description,300)}
        </p>
        <div className="flex space-x-4">
        <Facebook className="w-4 h-4 text-blue-100 cursor-pointer" />
          <Twitter className="w-4 h-4 text-gray-700 cursor-pointer" />
          <Linkedin className="w-4 h-4 text-blue-100 cursor-pointer" />
            <Github className="w-4 h-4 text-blue-100 cursor-pointer" />
        </div>

        
          <button type="button" className="px-6 py-3 bg-gradient-to-r from-gray-800 via-gray-900 to-black text-gray-300 font-medium text-lg rounded-lg shadow-md hover:text-white hover:shadow-lg hover:from-black hover:to-gray-800 transition-all duration-500 relative z-10 caveat w-fit">
            Download CV
          </button>
      </div>

      {/* Right Side  */}
      <div   className=""  >
        <div className="w-[150px] h-[150px] lg:w-[200px] lg:h-[200px] rounded-full relative bg-white shadow-[0_-10px_20px_-5px_rgba(191,219,254,0.5),0_5px_15px_-3px_rgba(0,0,0,0.1)]"  
        >
          {files?.image && (
            <img
            src={URL.createObjectURL(files.image)}
            alt=""
            className="w-full h-full rounded-full "
          />
          )}
          {
            portfolio.image  && (
                <img
                src={
                  typeof portfolio.image === "string"
                    ? portfolio.image // If it's a URL, use it directly
                    : URL.createObjectURL(portfolio.image) // If it's a File, create an object URL
                }
                alt="Portfolio"
                className="w-full h-full rounded-full"
              />
            )
          }
          <div className="absolute bottom-3 -right-10  bg-blue-800 px-2  py-1 rounded-lg"
          >
            <p className="caveat font-bold text-[10px] tracking-wider"         
            >
            Web Developer  
            </p>
          </div>
        </div>
      </div>

      <div className="w-[2px] h-[50%] bg-blue-100 absolute left-4 section-border hidden lg:block"></div>
      <p className="caveat absolute bottom-4 text-5xl  tracking-widest left-[50%] translate-x-[-50%] text-nowrap opacity-10 text-blue-100 ">
      Web Developer
      </p>
    </div>
  );
};

export default Hero;
