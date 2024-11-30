// import React from 'react';
import { Link } from "react-router-dom";
import ServiceCard from "../components/Service/ServiceCard";


export default function Service() {
  // const [data, setdata] = useState([]);
  const data = [
    {
      id: 1,
      title: "Web Development",
      description:
        "we design your website according to your needs and budget and we give you the best result ever with the best quality and the best price. ",
      image: "https://picsum.photos/200/300",
    },

    {
      id: 2,
      title: "App Development",
      description: "we develop your app according to your needs and budget and we give you the best result ever with the best quality and the best price. ",
      image: "https://picsum.photos/200/300",
    },
    {
      id: 3,
      title: "Blockchain Development",
      description: "we develop your app according to your needs and budget and we give you the best result ever with the best quality and the best price. ",
      image: "https://picsum.photos/200/300",
    },
    {
      id: 4,
      title: "Cyber Security",
      description: "we develop your app according to your needs and budget and we give you the best result ever with the best quality and the best price. ",
      image: "https://picsum.photos/200/300",
    },
    {
      id: 5,
      title: "Security Audit",
      description: "we develop your app according to your needs and budget and we give you the best result ever with the best quality and the best price. ",
      image: "https://picsum.photos/200/300",
    },
    {
      id: 6,
      title: "Freelanceing",
      description: "we develop your app according to your needs and budget and we give you the best result ever with the best quality and the best price. ",
      image: "https://picsum.photos/200/300",
    },
    {
      id: 7,
      title: "App Development",
      description: "we develop your app according to your needs and budget and we give you the best result ever with the best quality and the best price. ",
      image: "https://picsum.photos/200/300",
    },
    {
      id: 8,
      title: "App Development",
      description: "we develop your app according to your needs and budget and we give you the best result ever with the best quality and the best price. ",
      image: "https://picsum.photos/200/300",
    },
  ];
  return (
    <div>
      <div className="bg-black-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-brandPrimary mb-4">
              Our Services
            </h1>
            <p className="text-l text-stone-400 max-w-2xl mx-auto">
              We provide cutting-edge solutions to help your business grow and
              succeed in the digital age.
            </p>
          </div>
        </div>
      </div>
      <div className="grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 p-6 lg:p-0">
        {data.map((item, index) => (
          <Link to={`/service/${item.id}`} key={index}>
            <ServiceCard service={item} key={index} />
          </Link>
        ))}
      </div>
    </div>
  );
}

