/* eslint-disable react/jsx-key */
// import React from 'react';
import { Carousel } from "flowbite-react";
import namanPic from "../../assets/team/namanKumar.png";
import yashPic from "../../assets/team/yashRana.png";

// Internal Import
import MemberCard from "../Team/MemberCard";

export default function Team() {
  const memberData = [
    {
      id: 1,
      name: "Yash Rana",
      role: "Founder & CTO",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.",
      photo: yashPic,
      portfolio:"https://yashranaportfolio.netlify.app/",
      socialMedia: {
        github: "https://github.com/yash-rana0101",
        instagram: "https://www.instagram.com/yashrana.ai",
        linkedin: "https://www.linkedin.com/in/devop-yash-rana",
        twitter: "https://twitter.com/YashRana0101",
      },
    },
    {
      id: 2,
      name: "Naman Kumar",
      role: "Founder & CEO",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.",
      photo: namanPic,
      socialMedia: {
        github: "https://github.com/naman-kumar",
        instagram: "https://www.instagram.com/naman_kumar",
        linkedin: "https://www.linkedin.com/in/naman-kumar-",
        twitter: "https://twitter.com/naman_kumar",
      },
    },
  ];
  

  return (
    <div>
      <div className="mt-10 mb-3 overflow-hidden">
        <div className="text-center ">
          <span className="text-3xl font-semibold text-brandPrimary text-500 text-center  md:m-4  border-b-2 md:p-4 border-brandPrimary">
            Our Team
          </span>
          <div className="mt-8">
            <p className="text-sm sm:text-base text-white max-w-2xl mx-auto">
              Meet With our Team Members who are passionate about their work and
              dedicated to delivering exceptional results.
            </p>
          </div>
        </div>
        <div className=" lg:px-16 max-w-screen-2xl mx-auto h-[700px] md:h-screen">
          <Carousel indicators={false} className="w-full my-auto mb-[80px]">
              {memberData.map((member) => (
            <div className="w-3/4  flex flex-col-reverse md:flex-row rounded-2xl md:mb-4 items-center  md:gap-12 bg-transparent border">
                <MemberCard key={member.id} memberData={member} />
            </div>
              ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
}
