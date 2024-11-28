import React from "react";
import '../styles/HackathonEvent2.css';

const HackathonEvent2 = () => {
  return (
    <section className="hero">
      <div className="carousel-container">
        <div className="carousel">
          <img 
            src="https://images.pexels.com/photos/5380664/pexels-photo-5380664.jpeg?auto=compress&cs=tinysrgb&w=600" 
            alt="Hackathon Event"
            className="carousel-image"
          />
          <div className="carousel-text">
            <h2 className="event-title">Hackathon 2K24</h2>
            <p className="event-date">12 Dec 2024</p>
            <div className="carousel-buttons">
              <button className="view-details">View Details</button>
              <button className="register">Register</button>
            </div>
          </div>
        </div>
      </div>
      <div className="status-tabs">
        <button className="status-tab">Upcoming</button>
        <button className="status-tab active">On Going</button>
        <button className="status-tab">Completed</button>
      </div>
    </section>
  );
};

export default HackathonEvent2;
