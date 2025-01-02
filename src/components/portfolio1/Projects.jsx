import React from "react";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
const Projects = ({ projects, preview , update }) => {
  const truncateText = (text, maxLength) => {
    if (!text) return "";
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };
  return (
    <div
      className="min-h-[70vh] py-20 relative flex flex-col items-center gap-4"
      id="projects"
    >
      <h2 className="uppercase text-5xl lg:text-6xl shadow-xl text-center">Portfolio</h2>
      <h2 className="text-3xl shadow-xl text-center">
        my <span className="caveat text-blue-500">Projects</span>
      </h2>

      <div className="flex w-full justify-center flex-wrap  max-w-5xl mx-auto mt-10 gap-4">
        {projects?.map((project, i) => (
          <div
            key={i}
            className="bg-gray-900/50 p-6 rounded-lg shadow-md flex flex-col items-center gap-4 w-[320px] sm:w-[300px] transition-transform transform relative z-10"
          >
            <div className="w-full min-h-[150px] max-h-[200px] overflow-hidden rounded-lg">
              <img
                src={
                  project.image ||
                  "https://daily-tasks-inky.vercel.app/images/navbar.avif"
                }
                alt={project.title}
                className="w-full h-full rounded-lg object-cover transition-transform transform hover:scale-110 duration-300"
              />
            </div>
            <h3 className="text-xl font-semibold text-white text-center">
              {truncateText(project.title, 40)}
            </h3>
            <p className="text-sm text-blue-100 text-center caveat">
              {truncateText(project.description, 150)}
            </p>
            <div className="flex gap-4 mt-4">
              <a
                href={project.code}
                className="flex items-center gap-2 text-blue-300 hover:text-blue-400 text-sm transition-all"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub size={18} />
                <span>Github Code</span>
              </a>
              <a
                href={project.link}
                className="flex items-center gap-2 text-green-300 hover:text-green-400 text-sm transition-all"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaExternalLinkAlt size={18} />
                <span>Live Preview</span>
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="section-border hidden lg:block  bg-blue-100 w-[2px] h-[50%] absolute left-32 top-[50%] translate-y-[-50%]"   
      style={{
        left: preview && '4rem', 
        display: update && 'none'
      }}
      ></div>

      <p className="caveat text-5xl lg:text-9xl absolute bottom-0 left-[50%] translate-x-[-50%] text-nowrap tracking-widest opacity-10">
        My Projects
      </p>

      <button
        className="px-6 py-3 bg-gradient-to-r from-gray-800 via-gray-900 to-black text-gray-300 font-medium text-lg rounded-lg shadow-md hover:text-white hover:shadow-lg hover:from-black hover:to-gray-800 transition-all duration-500 relative z-10 caveat"
        type="button"
      >
        View More
      </button>
    </div>
  );
};

export default Projects;
