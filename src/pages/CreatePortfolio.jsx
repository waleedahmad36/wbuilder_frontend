import React, { useState, useRef } from "react";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import axios from "axios";
import Navbar from "../components/Navbar";
import {  Plus, FileText,  Image, LoaderPinwheel,  Folder } from "lucide-react";
import toast from "react-hot-toast";
import Navigation from '../components/portfolio1/Navigation'
import PreviewHero from '../components/portfolio1/PreviewHero'
import Skills from "../components/portfolio1/Skills";
import Projects from "../components/portfolio1/Projects";
import Contact from "../components/portfolio1/Contact";
import Footer from "../components/portfolio1/Footer";
import { useNavigate } from "react-router-dom";
import { rootUrl } from "../constants";
import FooterMain from "../components/Footer";

const CreatePortfolio = () => {
  const user = useRecoilValue(userAtom);
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    logo: "",
    sublogo: "",
    name: "",
    title: "",
    description: "",
    address: "",
    phone: "",
    email: "",
    fbLink: "",
    githubLink: "",
    linkedinLink: "",
    twitterLink: "",
    template: "template1",
  });

  const [files, setFiles] = useState({
    image: null,
    cv: null,
  });

  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);

  const imageInputRef = useRef(null);
  const cvInputRef = useRef(null);

  function isValidURL(url) {
    try {
      new URL(url); // Tries to create a URL object
      return true;
    } catch (error) {
      return false; // If it throws, the URL is invalid
    }
  }

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFiles({ ...files, [e.target.name]: e.target.files[0] });
  };

  const handleAddSkill = () => {
    setSkills([...skills, { title: "", effeciency: "" }]);
  };

  const handleSkillChange = (index, field, value) => {
    const updatedSkills = [...skills];
    updatedSkills[index][field] = value;
    setSkills(updatedSkills);
  };

  const handleAddProject = () => {
    setProjects([
      ...projects,
      { title: "", description: "", image: "", link: "", code: "" },
    ]);
  };

  const handleProjectChange = (index, field, value) => {
    const updatedProjects = [...projects];
    updatedProjects[index][field] = value;
    setProjects(updatedProjects);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.logo || !formData.sublogo || !formData.name || !formData.title || !formData.description || !formData.address || !formData.phone || !formData.email || !formData.fbLink || !formData.githubLink || !formData.linkedinLink || !formData.twitterLink || !files.image || !files.cv || skills.length === 0 || projects.length === 0) {  
      return toast.error("Please fill all the fields");   
    }

    if(!isValidURL(formData.fbLink)){
      return toast.error("Invalid Facebook Link");
    }
    if(!isValidURL(formData.githubLink)){
      return toast.error("Invalid GitHub Link");
    }
    if(!isValidURL(formData.linkedinLink)){
      return toast.error("Invalid LinkedIn Link");
    }
    if(!isValidURL(formData.twitterLink)){
      return toast.error("Invalid Twitter Link");
    }

    function validateProjectURLs(projects) {
      for (let i = 0; i < projects.length; i++) {
        const project = projects[i];
        if (!isValidURL(project.image)) {
          toast.error(`Invalid Project Image URL for project ${i + 1}`);
          return false; // Stop execution
        }
        if (!isValidURL(project.link)) {
          toast.error(`Invalid Project Link URL for project ${i + 1}`);
          return false; // Stop execution
        }
        if (!isValidURL(project.code)) {
          toast.error(`Invalid Project Code URL for project ${i + 1}`);
          return false; // Stop execution
        }
      }
      return true; // All project URLs are valid
    }
    
    // Example usage:
    if (!validateProjectURLs(projects)) {
      return; // Stop execution
    } 

    if(files.image.type.split("/")[0] !== "image"){
      return toast.error("Invalid Image File Type");
    }
    if(files.cv.type !== "application/pdf"){
      return toast.error("Invalid CV File, it has to be a PDF file");
    }
    

    const formDataObj = new FormData();
    Object.keys(formData).forEach((key) => formDataObj.append(key, formData[key]));
    Object.keys(files).forEach((key) => formDataObj.append(key, files[key]));
    formDataObj.append("skills", JSON.stringify(skills));
    formDataObj.append("projects", JSON.stringify(projects));
    formDataObj.append("userId", user._id);
    setLoading(true);

    try {
      const response = await axios.post(`${rootUrl}/api/v1/portfolio/create`, formDataObj, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      if(response.data.success){
        toast.success("Portfolio created successfully");
        navigate(`/dashboard`);
      }else{
         const errorMessage = response.data?.message || "Something went wrong";
    toast.error(errorMessage);
      }
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Something went wrong";
        toast.error(errorMessage);
    }finally {
        setLoading(false)
    }
  };

  

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center w-full h-[30vh] bg-gradient-to-r from-gray-900 to-black/60 text-white">
        <h1 className="text-4xl font-bold">Create Your Portfolio</h1>
        <p className="text-lg mt-2 caveat">
          Let’s build something amazing with <span className="font-semibold kaushan">wBuilder</span>
        </p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-6 p-8 bg-gray-900 text-white rounded-lg w-full max-w-4xl mx-auto mt-8"
      >
        {/* Form Fields */}

        <div className="w-full">
          <input
            type="text"
            name="logo"
            placeholder="Logo Text"
            className="w-full p-3 mb-4 bg-gray-800 rounded focus:outline-none focus:border-b focus:border-b-blue-500"
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="sublogo"
            placeholder="Sublogo Text"
            className="w-full p-3 mb-4 bg-gray-800 rounded focus:outline-none focus:border-b focus:border-b-blue-500"
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            className="w-full p-3 mb-4 bg-gray-800 rounded focus:outline-none focus:border-b focus:border-b-blue-500"
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="title"
            placeholder="Title"
            className="w-full p-3 mb-4 bg-gray-800 rounded focus:outline-none focus:border-b focus:border-b-blue-500"
            onChange={handleInputChange}
          />
          <textarea
            name="description"
            placeholder="Description"
            className="w-full p-3 mb-4 bg-gray-800 rounded focus:outline-none focus:border-b focus:border-b-blue-500"
            onChange={handleInputChange}
          />
        </div>
          

          <div  className=" bg-black relative w-[350px] h-[350px] overflow-hidden overflow-y-scroll lg:w-full"  >
            <Navigation portfolio={formData} preview={true} />
            <PreviewHero portfolio={formData}  preview={true} files={files}  />
          </div>

        {/* File Uploads */}
        <div className="w-full">
          <h3 className="text-xl font-semibold mb-2">Uploads</h3>
          <div className="flex gap-4">
            <div
              className="flex items-center justify-center gap-2 p-3 bg-gray-800 rounded cursor-pointer hover:bg-gray-700"
              onClick={() => imageInputRef.current.click()}
            >
              <Image className="text-blue-500" />
              <span>Upload Image</span>
              <input
                type="file"
                name="image"
                ref={imageInputRef}
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
            <div
              className="flex items-center justify-center gap-2 p-3 bg-gray-800 rounded cursor-pointer hover:bg-gray-700"
              onClick={() => cvInputRef.current.click()}
            >
              <FileText className="text-blue-500" />
              <span>Upload CV</span>
              <input
                type="file"
                name="cv"
                ref={cvInputRef}
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          </div>
        </div>

        {(files.image || files.cv) && (
            <div  className="flex gap-6 items-center" >
                {files.image && (
                    <img src={URL.createObjectURL(files.image)} className="w-20 h-20 rounded-full"  />
                )}
                {files.cv && (
                    <p>{files.cv.name}</p>
                )}
            </div>
        )}

        {/* Skills Section */}
        <div className="w-full">
          <h3 className="text-xl font-semibold mb-2">Skills</h3>
          {skills.map((skill, index) => (
            <div key={index} className="flex gap-4 mb-2 flex-wrap">
              <input
                type="text"
                placeholder="Skill Title"
                value={skill.title}
                className="flex-1 p-3 bg-gray-800 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => handleSkillChange(index, "title", e.target.value)}
              />
              <input
                type="text"
                placeholder="Efficiency (%)"
                value={skill.effeciency}
                className="flex-1 p-3 bg-gray-800 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => handleSkillChange(index, "effeciency", e.target.value)}
              />
            </div>
          ))}
          <button
            type="button"
            className="flex items-center gap-2 text-blue-500 hover:underline mt-2"
            onClick={handleAddSkill}
          >
            <Plus /> Add Skill
          </button>
        </div>

        <div   className="bg-black w-full pb-10 overflow-y-scroll" >
        <Skills  skills={skills} preview={true}/>
        </div>

        {/* Projects Section */}
        <div className="w-full">
          <h3 className="text-xl font-semibold mb-2">Projects</h3>
          {projects.map((project, index) => (
            <div key={index} className="mb-4">
              <input
                type="text"
                placeholder="Project Title"
                value={project.title}
                className="w-full p-3 bg-gray-800 rounded mb-2"
                onChange={(e) => handleProjectChange(index, "title", e.target.value)}
              />
              <textarea
                placeholder="Project Description"
                value={project.description}
                className="w-full p-3 bg-gray-800 rounded mb-2"
                onChange={(e) => handleProjectChange(index, "description", e.target.value)}
              />
              <input
                type="text"
                placeholder="Project Image URL (we need to manage memory that's why)😊"
                value={project.image}
                className="w-full p-3 bg-gray-800 rounded mb-2"
                onChange={(e) => handleProjectChange(index, "image", e.target.value)}
              />
              <input
                type="text"
                placeholder="Project Link"
                value={project.link}
                className="w-full p-3 bg-gray-800 rounded mb-2"
                onChange={(e) => handleProjectChange(index, "link", e.target.value)}
              />
              <input
                type="text"
                placeholder="Project Code URL"
                value={project.code}
                className="w-full p-3 bg-gray-800 rounded mb-2"
                onChange={(e) => handleProjectChange(index, "code", e.target.value)}
              />
            </div>
          ))}
          <button
            type="button"
            className="flex items-center gap-2 text-blue-500 hover:underline mt-2"
            onClick={handleAddProject}
          >
            <Plus /> Add Project
          </button>
        </div>

        <div  className="bg-black w-full pb-5 overflow-y-scroll h-[70vh]" >
          <Projects  projects={projects}   preview={true} />
        </div>


       {/* Contact  */}
        <div className="w-full">
        <input
            type="text"
            name="address"
            placeholder="Address"
            className="w-full p-3 mb-4 bg-gray-800 rounded focus:outline-none focus:border-b focus:border-b-blue-500"
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            className="w-full p-3 mb-4 bg-gray-800 rounded  focus:outline-none focus:border-b focus:border-b-blue-500"
            onChange={handleInputChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-3 mb-4 bg-gray-800 rounded focus:outline-none focus:border-b focus:border-b-blue-500"
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="fbLink"
            placeholder="Facebook Link"
            className="w-full p-3 mb-4 bg-gray-800 rounded focus:outline-none focus:border-b focus:border-b-blue-500"
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="githubLink"
            placeholder="GitHub Link"
            className="w-full p-3 mb-4 bg-gray-800 rounded focus:outline-none focus:border-b focus:border-b-blue-500"
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="linkedinLink"
            placeholder="LinkedIn Link"
            className="w-full p-3 mb-4 bg-gray-800 rounded focus:outline-none focus:border-b focus:border-b-blue-500"
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="twitterLink"
            placeholder="Twitter Link"
            className="w-full p-3 mb-4 bg-gray-800 rounded focus:outline-none focus:border-b focus:border-b-blue-500"
            onChange={handleInputChange}
          />
        </div>

        <div className="w-full h-[60vh] overflow-y-scroll bg-black"  >
          <Contact  portfolio={formData}  />
          <Footer  portfolio={formData} />
        </div>

        <button
          type="submit"
          className="px-6 py-3 bg-gradient-to-r from-gray-800 via-gray-900 to-black text-gray-300 font-medium text-lg rounded-lg shadow-md hover:text-white hover:shadow-lg hover:from-black hover:to-gray-800 transition-all duration-500 relative z-10 caveat"
        >
          {loading ? <div  className="flex gap-2" ><LoaderPinwheel   className="animate-spin" /><span>Creating...</span></div> : <div  className="flex gap-2" ><span>Create Portfolio</span><Folder /></div>}
        </button>
      </form>
      <FooterMain />
    </>
  );
};

export default CreatePortfolio;
