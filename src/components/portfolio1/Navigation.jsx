import { Home, Code, Mail, User } from "lucide-react";
import React, { useState } from "react";

const Navigation = ({ portfolio , preview }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false); // Tracks menu visibility

  const toggleMenu = () => {
    if (menuOpen) {
      setMenuVisible(false); // Hide menu items
      setTimeout(() => setMenuOpen(false), 700); // Close menu after animation
    } else {
      setMenuOpen(true);
      setTimeout(() => setMenuVisible(true), 200); // Show menu items with delay
    }
  };

  const closeMenu = () => {
    setMenuVisible(false);
    setTimeout(() => setMenuOpen(false), 700);
  };

  const menuItems = [
    { label: "Home", icon: <Home />, link: "#hero" },
    { label: "Skills", icon: <Code />, link: "#skills" },
    { label: "Projects", icon: <Code />, link: "#projects" },
    { label: "Contact", icon: <Mail />, link: "#contact" },
  ];

  return (
    <div className="relative">
      {/* Navbar */}
      <nav className="navbar px-8 py-6 flex items-center justify-between bg-gradient-to-r from-black/60 to-black/60  top-0 z-40 w-full"  style={{
        position: !preview ? 'fixed'  : 'relative'
      }}  >
        <h3 className="text-lg">
          {portfolio?.logo}
          <span className="caveat text-3xl text-blue-100">{portfolio?.sublogo}</span>
        </h3>

        {
          !menuOpen && (
            <div  className="hidden lg:flex gap-4" >
          <a href="#hero">Home</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </div>
          )
        }
        <div className="menu-icon flex flex-col gap-1 cursor-pointer" onClick={toggleMenu}>
          <div
            className={`line-1 w-8 h-[2px] bg-blue-100 transition-transform ${
              menuOpen ? "rotate-45 translate-y-[6px]" : ""
            }`}
          ></div>
          <div
            className={`line-2 w-6 h-[2px] bg-blue-100 transition-all ${
              menuOpen ? "opacity-0" : ""
            }`}
          ></div>
          <div
            className={`line-3 w-8 h-[2px] bg-blue-100 transition-transform ${
              menuOpen ? "-rotate-45 -translate-y-[6px]" : ""
            }`}
          ></div>
        </div>
      </nav>

      {/* Overlay Navigation */}
      <div
        className={` top-0 left-0 w-full h-screen bg-black z-30 flex transition-all duration-700 ${
          menuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        style={{
           position: !preview ? 'fixed' : 'absolute',
           height : preview && '350px',
        }}
      >
        {/* Left Section */}
        <div
          className={`navigation-left w-0 md:w-1/2 h-full overflow-hidden transition-all duration-700 ${
            menuOpen ? "w-1/2 opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={portfolio?.image || "https://daily-tasks-inky.vercel.app/images/navbg.avif"}
            alt="Navigation Background"
            className={`w-full h-full object-cover grayscale opacity-50 hover:opacity-100 hover:scale-105 transition-all hover:grayscale-0 duration-300 ${
              menuOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          />
        </div>

        {/* Right Section */}
        <div
          className={`flex flex-col items-center justify-center gap-8 w-full md:w-1/2 h-full z-50 transition-opacity duration-700 ${
            menuOpen ? "opacity-100" : "opacity-0"
          }`}
        >
          {menuItems.map((item, index) => (
            <a
              key={item.label}
              href={item.link}
              className={`flex gap-4 items-center text-lg text-white opacity-0 ${
                menuVisible ? `opacity-100 delay-${index * 200}` : ""
              } transition-all duration-500 hover:text-blue-500 hover:scale-105`}
              onClick={closeMenu}
            >
              {item.icon}
              <span>{item.label}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navigation;
