// import React from 'react';

import { Link } from "react-router-dom";

export default function Listevent() {
  const hackathons = [
    {
      id: 1,
      title: "Hackathon 2k24",
      date: "22 DEC 2024",
      image:
        "https://plus.unsplash.com/premium_photo-1663040543387-cb7c78c4f012?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGhhY2thdGhvbnxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      id: 2,
      title: "Hackathon 2k24",
      date: "22 DEC 2024",
      image:
        "https://plus.unsplash.com/premium_photo-1663040543387-cb7c78c4f012?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGhhY2thdGhvbnxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      id: 3,
      title: "Hackathon 2k24",
      date: "22 DEC 2024",
      image:
        "https://plus.unsplash.com/premium_photo-1663040543387-cb7c78c4f012?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGhhY2thdGhvbnxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      id: 4,
      title: "Hackathon 2k24",
      date: "22 DEC 2024",
      image:
        "https://plus.unsplash.com/premium_photo-1663040543387-cb7c78c4f012?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGhhY2thdGhvbnxlbnwwfHwwfHx8MA%3D%3D",
    },
  ];

  return (
    <div className=" p-4 sm:p-6 lg:p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 gap-x-14 max-w-7xl w-fit mx-auto">
        {hackathons.map((hackathon) => (
          <div
            key={hackathon.id}
            className="relative group overflow-hidden rounded-lg drop-shadow-[0px_0px_2px_#00D8FF]"
          >
            {/* Image Container */}
            <div className="relative aspect-video w-[444px] overflow-hidden">
              <img
                src={hackathon.image}
                alt={hackathon.title}
                className="w-full h-full aspect-square  overflow-hiddenobject-cover transition-transform duration-300 group-hover:scale-[1.05]"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20" />
            </div>

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-4  ">
              <h3 className="text-lg  font-bold text-white ">
                {hackathon.title}
              </h3>
              <p className="text-cyan-400 mb-2 text-sm">{hackathon.date}</p>
              <Link to="/eventdetail">
                <button className="bg-transparent text-sm hover:bg-cyan-400 text-cyan-400 hover:text-gray-900 border border-cyan-400 font-semibold py-1 px-3 rounded-md transition-colors duration-300">
                  Register
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
