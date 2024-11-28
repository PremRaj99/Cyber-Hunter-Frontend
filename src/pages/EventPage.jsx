import React from 'react';
import '../styles/EventPage.css';

const EventPage = () => {
  return (
    <div className="event-container">
      <div className="event-card">
        {/* Event Image */}
        <img
          src="https://images.pexels.com/photos/3184328/pexels-photo-3184328.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt="Event"
          className="event-image"
        />

        {/* Content Section */}
        <div className="event-content">
          {/* Title and Date Row */}
          <div className="title-date-row">
            <h1 className="event-title">
              Event Name: <span className="event-highlight">Code Fest</span>
            </h1>
            <p className="event-date">Date: 15 Aug, 2024</p>
          </div>

          {/* Event Details Row */}
          <div className="event-details-row">
            <ul className="event-details-list">
              <li className="event-detail">Up to 5 members can participate</li>
              <li className="event-detail">2000/- Cash Prize</li>
              <li className="event-detail">Rules should be followed</li>
            </ul>
            <button className="event-button">Register</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventPage;
