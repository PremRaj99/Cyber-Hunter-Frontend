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
    { name: "HTML5", icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/HTML5_logo_and_wordmark.svg/800px-HTML5_logo_and_wordmark.svg.png" },
    { name: "CSS3", icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/CSS3_logo_and_wordmark.svg/1200px-CSS3_logo_and_wordmark.svg.png" },
    { name: "JavaScript", icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/1200px-Unofficial_JavaScript_logo_2.svg.png" },
    { name: "React", icon: "https://dabeng.github.io/img/reactjs.png" },
    { name: "Node.js", icon: "https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg" },
    { name: "Express", icon: "https://adware-technologies.s3.amazonaws.com/uploads/technology/thumbnail/20/express-js.png" },
    { name: "MongoDB", icon: "https://miro.medium.com/v2/resize:fit:512/1*doAg1_fMQKWFoub-6gwUiQ.png" },
    { name: "Next.js", icon: "https://www.drupal.org/files/project-images/nextjs-icon-dark-background.png" },
    { name: "Redux", icon: "https://juststickers.in/wp-content/uploads/2018/08/redux.png" },
    { name: "Tailwind CSS", icon: "https://miro.medium.com/v2/resize:fit:512/1*JEHLmWo6_SrpHPiP4AimIw.png" },
    { name: "TypeScript", icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/768px-Typescript_logo_2020.svg.png" },
    { name: "GraphQL", icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/GraphQL_Logo.svg/1200px-GraphQL_Logo.svg.png" },
    { name: "PostgreSQL", icon: "https://miro.medium.com/v2/resize:fit:1220/0*epnKnkKuLx2RAajt" },
    { name: "Python", icon: "https://learnersgalaxy.ai/wp-content/uploads/2024/01/Python-Symbol.png" },
    { name: "Django", icon: "https://miro.medium.com/v2/resize:fit:400/0*v8Ot7LRl6TSDXtBR.png" },
    { name: "Java", icon: "https://upload.wikimedia.org/wikipedia/en/thumb/3/30/Java_programming_language_logo.svg/800px-Java_programming_language_logo.svg.png" },
    { name: "Git", icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/GitHub_Invertocat_Logo.svg/1200px-GitHub_Invertocat_Logo.svg.png" },
    { name: "Docker", icon: "https://miro.medium.com/v2/resize:fit:594/1*MLFxdoY6ImiTghX9l0lDTA.png" },
  ];

  return <div className="w-full h-full p-6 flex gap-4 flex-wrap">
    {techStackIcons.map((Icon, index) => (
      < img src={Icon.icon} key={index} className="md:h-12 h-20 text-white" title={Icon.name} />
    ))}
  </div>;
}
