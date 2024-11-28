import React from "react";
import "../styles/HackathonEvents.css";

const HackathonEvents = () => {
  const hackathonImages = [
    "https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/943096/pexels-photo-943096.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/2653362/pexels-photo-2653362.jpeg?auto=compress&cs=tinysrgb&w=600",
  ];

  return (
    <div className="cards-container">
      {hackathonImages.map((image, index) => (
        <div key={index} className="card">
          <img
            src={image}
            alt={`Hackathon ${index + 1}`}
            className="card-image"
          />
          <div className="card-content">
            <div className="card-text">
              <h2 className="card-title">Hackathon 2k24</h2>
              <p className="card-date">22 Dec 2024</p>
            </div>
            <button className="card-button">Register</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HackathonEvents;
