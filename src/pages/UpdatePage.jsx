import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import Navigation from "../components/portfolio1/Navigation";
import PreviewHero from "../components/portfolio1/PreviewHero";
import Skills from "../components/portfolio1/Skills";
import Projects from "../components/portfolio1/Projects";
import { rootUrl } from "../constants";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const UpdatePage = () => {
  const { pid } = useParams();
  const [portfolio, setPortfolio] = useState(null);
  function isValidURL(url) {
    try {
      new URL(url); // Tries to create a URL object
      return true;
    } catch (error) {
      return false; // If it throws, the URL is invalid
    }
  }
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    description: "",
    skills: [],
    projects: [],
    logo: "",
    sublogo: "",
    image: "",
    cv: "",
    fbLink: "",
    githubLink: "",
    linkedinLink: "",
    twitterLink: "",
  });
  const [loading, setLoading] = useState(false);

  const getPortfolioBYId = async () => {
    try {
      const res = await axios.get(`${rootUrl}/api/v1/portfolio/${pid}`, {
        withCredentials: true,
      });
      const data = res.data;
      if (data.success) {
        setPortfolio(data.data);
        setFormData({
          name: data.data.name || "",
          title: data.data.title || "",
          description: data.data.description || "",
          skills: data.data.skills || [],
          projects: data.data.projects || [],
          logo: data.data.logo || "",
          sublogo: data.data.sublogo || "",
          image: data.data.image || "",
          cv: data.data.cv || "",
          fbLink: data.data.fbLink || "",
          githubLink: data.data.githubLink || "",
          linkedinLink: data.data.linkedinLink || "",
          twitterLink: data.data.twitterLink || "",
        });
      }
    } catch (error) {
      console.error("Error fetching portfolio:", error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
  };

  const handleSkillChange = (index, field, value) => {
    const updatedSkills = [...formData.skills];
    updatedSkills[index][field] = value;
    setFormData({ ...formData, skills: updatedSkills });
  };

  const handleProjectChange = (index, field, value) => {
    const updatedProjects = [...formData.projects];
    updatedProjects[index][field] = value;
    setFormData({ ...formData, projects: updatedProjects });
  };

  const handleAddSkill = () => {
    setFormData({
      ...formData,
      skills: [...formData.skills, { title: "", efficiency: "" }],
    });
  };

  const handleAddProject = () => {
    setFormData({
      ...formData,
      projects: [
        ...formData.projects,
        { title: "", description: "", link: "", image: "", code: "" },
      ],
    });
  };

  const updatePortfolio = async () => {
    if (
      !formData.name ||
      !formData.title ||
      !formData.description ||
      !formData.skills.length ||
      !formData.projects.length ||
      !formData.image ||
      !formData.cv ||
      !formData.fbLink ||
      !formData.githubLink ||
      !formData.linkedinLink ||
      !formData.twitterLink
    ) {
      return toast.error("Please fill in all required fields.");
    }

    if (
      !isValidURL(formData.fbLink) ||
      !isValidURL(formData.githubLink) ||
      !isValidURL(formData.linkedinLink) ||
      !isValidURL(formData.twitterLink)
    ) {
      return toast.error("Please enter  valid URLs");
    }

    if (
      formData.image &&
      typeof formData.image !== "string" &&
      !formData.image.type.startsWith("image/")
    ) {
      return toast.error("Please upload a valid image file.");
    }
    if (
      formData.cv &&
      typeof formData.cv !== "string" &&
      formData.cv.type !== "application/pdf"
    ) {
      return toast.error("Please upload a valid PDF file.");
    }

    setLoading(true);
    try {
      const formDataObj = new FormData();
      Object.keys(formData).forEach((key) => {
        if (Array.isArray(formData[key])) {
          formData[key].forEach((item, index) => {
            formDataObj.append(`${key}[${index}]`, JSON.stringify(item));
          });
        } else {
          formDataObj.append(key, formData[key]);
        }
      });
      const res = await axios.put(
        `${rootUrl}/api/v1/portfolio/${pid}`,
        formDataObj,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      const data = res.data;
      if (data.success) {
        toast.success("Portfolio updated successfully!");
      } else {
        toast.error(data.message || "Failed to update portfolio.");
      }
    } catch (error) {
      console.error("Error updating portfolio:", error);
      const errorMessage =
        error.response?.data?.message || "Something went wrong";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPortfolioBYId();
  }, []);

  if (!portfolio)
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <div class="flex flex-row gap-2">
          <div class="w-4 h-4 rounded-full bg-blue-700 animate-bounce"></div>
          <div class="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.3s]"></div>
          <div class="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.5s]"></div>
        </div>
      </div>
    );

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-8">
        <h1 className="text-5xl font-bold mb-4 kaushan text-center">
          Update Portfolio
        </h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            updatePortfolio();
          }}
        >
          {/* Basic Info */}
          <div className="">
            <label className="caveat">Logo:</label>
            <input
              type="text"
              name="logo"
              value={formData.logo}
              onChange={handleInputChange}
              className="w-full p-2 mb-4 border-b rounded bg-transparent"
            />
            <label className="caveat">SubLogo:</label>
            <input
              type="text"
              name="sublogo"
              value={formData.sublogo}
              onChange={handleInputChange}
              className="w-full p-2 mb-4 border-b rounded bg-transparent"
            />
            <label className="caveat">Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-2 mb-4 border-b rounded bg-transparent"
            />
            <label className="caveat">Title:</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full p-2 mb-4 border-b rounded bg-transparent"
            />
            <label className="caveat">Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full p-2 py-4 mb-8 border-b rounded bg-transparent"
            />
          </div>

          <div
            className=" bg-black relative w-[350px] h-[350px] overflow-hidden overflow-y-scroll lg:w-full
        mx-auto"
          >
            <Navigation portfolio={formData} preview={true} />
            <PreviewHero portfolio={formData} preview={true} />
          </div>

          {/* Image & CV */}
          <div>
            <div className="flex gap-5 my-10">
              <div className="flex flex-col flex-1">
                <label className="caveat">Image:</label>
                <input
                  type="file"
                  name="image"
                  onChange={handleFileChange}
                  className="w-full p-2 mb-4 border rounded"
                />
              </div>
              <div className="flex flex-col flex-1">
                <label className="caveat">CV:</label>
                <input
                  type="file"
                  name="cv"
                  onChange={handleFileChange}
                  className="w-full p-2 mb-4 border rounded"
                />
              </div>
            </div>
            <div className="flex justify-evenly items-center flex-wrap gap-4 md:gap-0">
              {formData.image && (
                <img
                  src={
                    typeof formData.image === "string"
                      ? formData.image // If it's a URL, use it directly
                      : URL.createObjectURL(formData.image) // If it's a File, create an object URL
                  }
                  alt="Portfolio Image"
                  className="mb-4 w-24 rounded-lg"
                />
              )}
              {formData.cv && (
                <div className="my-4 h-[200px] overflow-y-scroll w-fit">
                  <embed
                    src={
                      typeof formData.cv === "string"
                        ? formData.cv // If it's a URL, use it directly
                        : URL.createObjectURL(formData.cv) // If it's a File, create an object URL
                    }
                    type="application/pdf"
                    className="w-full  border border-gray-300 rounded-lg"
                  />
                </div>
              )}
            </div>
          </div>

          <h3 className="text-center text-5xl kaushan">Skills</h3>
          <div>
            <h2 className="font-bold mb-2">Skills</h2>
            {formData.skills.map((skill, index) => (
              <div key={index} className="flex gap-2 mb-2 flex-wrap">
                <input
                  type="text"
                  placeholder="Skill Title"
                  value={skill.title}
                  onChange={(e) =>
                    handleSkillChange(index, "title", e.target.value)
                  }
                  className="p-2 border-b rounded flex-1 bg-transparent"
                />
                <input
                  type="text"
                  placeholder="Effeciency (%)"
                  value={skill.effeciency}
                  onChange={(e) =>
                    handleSkillChange(index, "effeciency", e.target.value)
                  }
                  className="p-2 border-b rounded flex-1 bg-transparent"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddSkill}
              className="text-blue-500 my-5"
            >
              Add Skill
            </button>
          </div>

          <div className="bg-black w-full pb-10 overflow-y-scroll">
            <Skills skills={formData?.skills} preview={true} update={true} />
          </div>

          {/* Projects */}
          <div>
            <h2 className="font-bold my-8 text-center text-5xl kaushan">
              Projects
            </h2>
            {formData.projects.map((project, index) => (
              <div
                key={index}
                className="my-6 bg-black/60 rounded-lg p-4 shadow-[0_0_10px_rgba(255,255,255,0.8)] hover:shadow-[0_0_20px_rgba(255,255,255,1)] transition-shadow duration-300"
              >
                <h3 className="caveat text-3xl my-4">0{index + 1}</h3>
                <input
                  type="text"
                  placeholder="Project Title"
                  value={project.title}
                  onChange={(e) =>
                    handleProjectChange(index, "title", e.target.value)
                  }
                  className="w-full p-2 mb-2 border-b border-b-gray-700 rounded bg-transparent text-gray-200 text-sm"
                />
                <textarea
                  placeholder="Project Description"
                  value={project.description}
                  onChange={(e) =>
                    handleProjectChange(index, "description", e.target.value)
                  }
                  className="w-full p-2 mb-2 border-b border-b-gray-700 rounded bg-transparent text-gray-200 text-sm"
                />
                <input
                  type="text"
                  placeholder="Project Link"
                  value={project.link}
                  onChange={(e) =>
                    handleProjectChange(index, "link", e.target.value)
                  }
                  className="w-full p-2 mb-2 border-b border-b-gray-700 rounded bg-transparent text-gray-200 text-sm"
                />
                <input
                  type="text"
                  placeholder="Project Code Link"
                  value={project.code}
                  onChange={(e) =>
                    handleProjectChange(index, "code", e.target.value)
                  }
                  className="w-full p-2 mb-2 border-b border-b-gray-700 rounded bg-transparent text-gray-200 text-sm"
                />
                <input
                  type="text"
                  placeholder="Project Image Url"
                  value={project.image}
                  onChange={(e) =>
                    handleProjectChange(index, "image", e.target.value)
                  }
                  className="w-full p-2 mb-2 border-b border-b-gray-700 rounded bg-transparent text-gray-200 text-sm"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddProject}
              className="text-blue-500"
            >
              Add Project
            </button>
          </div>

          <div className="bg-black w-full pb-5 overflow-y-scroll h-[70vh] my-10">
            <Projects
              projects={formData.projects}
              preview={true}
              update={true}
            />
          </div>

          {/* Social Links */}

          <h3 className="text-center text-5xl kaushan my-24">Links</h3>
          <div>
            <label className="caveat">Facebook Link:</label>
            <input
              type="text"
              name="fbLink"
              value={formData.fbLink}
              onChange={handleInputChange}
              className="w-full p-2 px-4 mb-4 border-b rounded-full bg-transparent my-2"
            />
            <label className="caveat">Github Link:</label>
            <input
              type="text"
              name="githubLink"
              value={formData.githubLink}
              onChange={handleInputChange}
              className="w-full p-2 px-4 mb-4 border-b rounded-full bg-transparent my-2"
            />
            <label className="caveat">LinkedIn Link:</label>
            <input
              type="text"
              name="linkedinLink"
              value={formData.linkedinLink}
              onChange={handleInputChange}
              className="w-full p-2 px-4 mb-4 border-t rounded-full bg-transparent my-2"
            />
            <label className="caveat">Twitter Link:</label>
            <input
              type="text"
              name="twitterLink"
              value={formData.twitterLink}
              onChange={handleInputChange}
              className="w-full p-2 px-4 mb-4 border-t rounded-full bg-transparent my-2"
            />
          </div>

          <button
            type="submit"
            className="px-6 py-3 bg-gradient-to-r from-gray-800 via-gray-900 to-black text-gray-300 font-medium text-lg rounded-lg shadow-md hover:text-white hover:shadow-lg hover:from-black hover:to-gray-800 transition-all duration-500 relative z-10 caveat"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Portfolio"}
          </button>
        </form>
      </div>
      <Footer/>
    </>
  );
};

export default UpdatePage;
