import React from "react";

import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaNodeJs,
  FaGitAlt,
  FaDocker,
  FaPython,
  FaJava,
} from "react-icons/fa";
import {
  SiMongodb,
  SiExpress,
  SiNextdotjs,
  SiRedux,
  SiTailwindcss,
  SiTypescript,
  SiGraphql,
  SiPostgresql,
  SiDjango,
} from "react-icons/si";

export default function TechStackSection() {
  const techStackIcons = [
    { name: "HTML5", icon: FaHtml5 },
    { name: "CSS3", icon: FaCss3Alt },
    { name: "JavaScript", icon: FaJs },
    { name: "React", icon: FaReact },
    { name: "Node.js", icon: FaNodeJs },
    { name: "Express", icon: SiExpress },
    { name: "MongoDB", icon: SiMongodb },
    { name: "Next.js", icon: SiNextdotjs },
    { name: "Redux", icon: SiRedux },
    { name: "Tailwind CSS", icon: SiTailwindcss },
    { name: "TypeScript", icon: SiTypescript },
    { name: "GraphQL", icon: SiGraphql },
    { name: "PostgreSQL", icon: SiPostgresql },
    { name: "Python", icon: FaPython },
    { name: "Django", icon: SiDjango },
    { name: "Java", icon: FaJava },
    { name: "Git", icon: FaGitAlt },
    { name: "Docker", icon: FaDocker },
  ];

  return <div className="w-full h-full p-6 grid grid-cols-4">
    {techStackIcons.map((Icon, index) => (
        < Icon.icon key={index} className="text-5xl text-gray-300" title={Icon.name} />
    ))}
  </div>;
}
