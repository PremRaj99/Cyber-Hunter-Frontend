// import React from 'react';

export default function ServiceCard(service, key) {
  return (
    <div className="max-w-sm py-2 px-6 mb-8 mx-auto ">
      {/* <!-- Service Card 1 --> */}
      <div
        className="bg-black border-brandPrimary border-4 rounded-lg shadow-md p-6 hover:shadow-xl transition duration-300"
        key={key}
      >
        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
          <svg
            className="w-6 h-6 text-blue-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            ></path>
          </svg>
        </div>
        <h3 className="text-xl text-brandPrimary font-semibold mb-2">
          {service.service.title}
        </h3>
        <p className="text-white">{service.service.description}</p>
      </div>
    </div>
  );
}
