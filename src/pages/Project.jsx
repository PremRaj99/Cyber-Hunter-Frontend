import React from "react";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import img from "../assets/DemoProject.png"
import ImageSlider from "../components/Project/ImageSlider";

export default function Project() {
  const skill = [
    "Frontend",
    "Backend",
    "DBMS",
    "Security",
    "DevOps",
    "Frontend",
    "Backend",
    "DBMS",
    "Security",
    "DevOps",
  ];

  return (
    <div className="text-gray-300 p-10 m-2 rounded-md">
      <div className="flex md:flex-row flex-col gap-8">
        <img
          src={img}
          className="md:w-[50%] object-cover rounded-md"
          alt="Thumbnail"
        />
        <div className="flex-1 flex flex-col gap-2 relative">
          <h3 className="text-3xl font-semibold text-[#00D8FF]">
            Cultural Tourism
          </h3>
          <div className="absolute w-32 h-32 rounded-full bg-brandPrimary blur-3xl opacity-60"></div>
          <p className="my-2 text-sm">
            Points: <span className="text-green-500 text-lg text-semibold">69</span>
          </p>
          <div className="flex hover:text-white cursor-pointer items-center mt-4 mb-2 gap-2">
            <FaGithub className="text-white text-lg" />
            <p>GitHub</p>
          </div>
          <div className="flex hover:text-white cursor-pointer items-center mb-2 gap-2">
            <FaExternalLinkAlt className="text-red-600" />
            <p>Live</p>
          </div>
          <div className="bg-gray-900 w-3/4 border rounded-md flex p-4 gap-4">
            <img
              src="https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?q=80&w=1966&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              className="w-20 h-20 object-cover rounded-full shadow-md shadow-gray-600 border border-gray-700"
              alt=""
            />
            <div className="flex flex-col gap-1">
              <h2 className="text-2xl text-[#00D8FF] font-semibold">
                Prem Raj
              </h2>
              <p className="italic hover:underline hover:text-blue-500 cursor-pointer">
                PremRaj_2004
              </p>
              <p>B.Tech CSE 2022-26</p>
              <p>
                Q.Id- <span>22030404</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-full flex md:flex-row flex-col justify-between gap-10 p-2 my-4">
        <dangerouslySetInnerHTML className="w-[100ch] max-w-full text-gray-300">
          Welcome to Cultural Tourism, where every journey is an odyssey of
          discovery, adventure, and enrichment. Founded on the belief that
          travel transcends mere movement from one place to another, we curate
          extraordinary experiences tailored to ignite your wanderlust and
          awaken your senses. At Cultural Tourism, we understand that
          travel is not just about visiting new destinations; it's about
          immersing yourself in diverse cultures, savoring local cuisines, and
          forging connections that transcend borders. Whether you're seeking
          adrenaline-pumping adventures, serene escapes, or cultural immersion,
          we offer a spectrum of meticulously crafted journeys to cater to every
          traveler's wanderlust. Our team of passionate explorers, travel
          experts, and local insiders meticulously handpick each destination,
          activity, and accommodation to ensure every aspect of your journey
          exceeds expectations. With a commitment to sustainability and
          responsible tourism, we strive to leave a positive impact on the
          communities we visit while preserving the natural beauty of our planet
          for future generations. Embark on a voyage of discovery with Cultural Tourism, where every adventure is an opportunity to enrich your
          life, broaden your horizons, and create lasting memories. Join us as
          we redefine the art of travel and inspire wanderlust in the hearts of
          adventurers around the globe.
        </dangerouslySetInnerHTML>
        <div className="w-96 flex-wrap flex h-fit justify-center gap-4 items-start text-[#00D8FF]">
          {skill &&
            skill.map((skill, index) => (
              <div key={index} className="p-1 cursor-pointer ">
                #{skill}
              </div>
            ))}
        </div>
      </div>
      {/* scroll */}
      <div className="border border-[#00D8FF] w-full h-0"></div>
      <h2 className="text-xl text-[#00D8FF] font-semibold mt-8">
        Project ScreenShot
      </h2>
      <div className="w-full">
        <ImageSlider />
      </div>
    </div>
  );
}
