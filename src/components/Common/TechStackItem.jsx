import React from 'react';
import StackIcon from "tech-stack-icons";

export default function TechStack({ techstack }) {
  return (
    <div className="flex flex-wrap gap-4 items-center justify-center p-4">
      {
        techstack.map((tech, index) => (
          <div key={index} className="aspect-square bg-gray-800/60 rounded-xl border border-gray-700/50 backdrop-blur-sm items-start justify-start p-2"
            style={{
              width: 'clamp(80px, 15vw, 120px)',
              height: 'clamp(80px, 15vw, 120px)'
            }}>
            <StackIcon
              name={tech}

            />
          </div>
        ))
      }
    </div>
  );
}
