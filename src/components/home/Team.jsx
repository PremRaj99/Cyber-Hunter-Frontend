// import React from 'react';
import { Carousel } from "flowbite-react";
import namanPic from "../../assets/team/namanKumar.png";
import yashPic from "../../assets/team/yashRana.png";
import premPic from "../../assets/team/premrajpic.png";
import manikPic from "../../assets/team/manikdutt.png";
// Internal Import
import MemberCard from "../Team/MemberCard";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";
import Button from "../Common/Button";

export default function Team() {
  const memberData = [
    {
      id: 1,
      name: "Yash Rana",
      role: "Founder & CTO",
      description:
        "EMPOWERING STUDENTS TO TURN IDEAS INTO IMPACTFUL SOLUTIONS.",
      photo: yashPic,
      portfolio: "https://yashranaportfolio.netlify.app/",
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
        "BLOCKCHAIN ISN’T JUST TECH, IT’S A REVOLUTION WAITING TO BE BUILT",
      photo: namanPic,
      portfolio: "https://www.namankumar.live/",
      socialMedia: {
        github: "https://github.com/6829nkhpas",
        instagram: "https://www.instagram.com/naman_amrit_arjun",
        linkedin: "https://www.linkedin.com/in/namankh",
        twitter: "https://twitter.com/naman_kumar",
      },
    },
    {
      id: 2,
      name: "Prem Raj",
      role: "Co-Founder ",
      description: "SECURE, TRANSPARENT, AND DECENTRALIZED SOLUTIONS",
      photo: premPic,
      portfolio: "https://www.premraj.tech/",
      socialMedia: {
        github: "https://github.com/PremRaj99",
        instagram: "https://www.instagram.com/prem_raj_0009",
        linkedin: "https://www.linkedin.com/in/prem-raj99/",
        twitter: "https://twitter.com/prem_raj99",
      },
    },
    {
      id: 2,
      name: "Manik Dutt",
      role: "Co-Founder",
      description: "EMBRACE THE FUTURE WITH BLOCKCHAIN TECHNOLOGY",
      photo: manikPic,
      portfolio: "https://www.premraj.tech/",
      socialMedia: {
        github: "https://github.com/manikdutt157",
        instagram: "https://www.instagram.com/genius_157",
        linkedin: "https://www.linkedin.com/in/manik-dutt-92b9ab250/",
        twitter: "https://twitter.com/manikdutt157",
      },
    },
  ];

  return (
    <div>
      <div className="mt-10 mb-3 overflow-hidden">
        <div className="text-center ">
          <span className="text-3xl font-bold text-brandPrimary text-500 text-center  md:m-4  border-b-2 md:p-4 border-brandPrimary">
            Our Team
          </span>
          <div className="mt-8">
            <p className="text-sm sm:text-base text-white max-w-2xl mx-auto px-8">
              Meet With our Team Members who are passionate about their work and
              dedicated to delivering exceptional results.
            </p>
          </div>
        </div>
        <div className=" lg:px-16 max-w-screen-2xl mx-auto h-[700px]">
          <Carousel indicators={false} className="w-full my-auto mb-[80px]">
            {memberData.map((member) => (
              <div className="w-3/4  flex flex-col-reverse md:flex-row rounded-2xl md:mb-4 items-center  md:gap-12 bg-transparent border">
                <MemberCard key={member.id} memberData={member} />
              </div>
            ))}
          </Carousel>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <Link to="/ourteam">
          <Button type="submit" rounded="md">
            <span className="flex items-center">
              <p>Our Team</p>
              <FaArrowRight className="h-6 w-6 m-1 " />
            </span>
          </Button>
        </Link>
      </div>
    </div>
  );
}
