import React from "react";

const Skills = ({ skills , preview , update }) => {
  return (
    <div className=" min-h-[70vh] pt-20 relative" id="skills">
      <h2 className="text-center text-4xl md:text-5xl uppercase shadow-lg "  
      >
        Professional Skills
      </h2>

      <div className="flex flex-col md:flex-row items-center  md:flex-wrap gap-5 mx-auto w-full max-w-4xl mt-20 justify-center"    
      style={{
        maxWidth: update && '53rem'
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
            <div className="flex flex-col w-[200px]" key={i}>
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

      <div className="section-border w-[2px] h-[50%] bg-blue-100 absolute right-24 top-[50%] translate-y-[-50%] hidden lg:block"   
      style={{
        right: preview && '2rem'
      }}
      ></div>
    </div>
  );
};

export default Skills;
