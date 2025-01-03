import React, { useEffect, useState } from "react";

const Skills = ({ skills, preview, update }) => {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    // Set up the IntersectionObserver to detect when the section enters the viewport
    const observer = new IntersectionObserver(
      (entries) => {
        // If the section is in view, set isInView to true
        if (entries[0].isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.5 } // Trigger when 20% of the section is visible
    );

    // Target the section to observe
    const section = document.getElementById("skills");
    if (section) observer.observe(section);

    // Clean up observer when component unmounts
    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  return (
    <div className="min-h-[70vh] pt-20 relative" id="skills">
      <h2
        className={`text-center text-3xl md:text-5xl uppercase shadow-lg transition-opacity duration-1000 ${
          isInView ? "opacity-100" : "opacity-0"
        }`}
      >
        Professional Skills
      </h2>

      <div
        className={`flex flex-col md:flex-row items-center md:flex-wrap gap-5 mx-auto w-full max-w-4xl mt-20 justify-center transition-all duration-1000 ${
          isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
        style={{
          maxWidth: update && "53rem",
        }}
      >
        {skills?.map((skill, i) => {
          // Ensure efficiency always ends with a "%" sign
          let efficiency = skill.effeciency;
          if (!efficiency?.endsWith("%")) {
            efficiency += "%";
          }

          // Extract the numerical value from the efficiency string
          const efficiencyValue = parseFloat(efficiency);

          return (
            <div
              className={`flex flex-col w-[200px] transition-all duration-1000 ${
                isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              key={i}
            >
              <p className="text-3xl">{skill.title}</p>
              <div className="relative">
                <div className="w-full h-[2px] bg-blue-100"></div>
                <div
                  className="w-3 h-3 rounded-full bg-blue-800 absolute -bottom-1"
                  style={{ left: `${efficiencyValue}%` }}
                ></div>
              </div>
              <p className="text-right caveat mt-2 font-bold">{efficiency}</p>
            </div>
          );
        })}
      </div>

      <p className="caveat text-6xl md:text-9xl tracking-widest absolute bottom-0 opacity-10 left-[50%] translate-x-[-50%] text-nowrap">
        My Skills
      </p>

      <div
        className={`section-border w-[2px] h-[50%] bg-blue-100 absolute right-24 top-[50%] translate-y-[-50%] hidden lg:block transition-all duration-1000 ${
          isInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-5"
        }`}
        style={{
          right: preview && "2rem",
        }}
      ></div>
    </div>
  );
};

export default Skills;
