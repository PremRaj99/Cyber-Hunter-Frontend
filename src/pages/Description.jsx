import React from 'react';
import '../styles/Description.css';

const Description=()=>{
    return(
        <div className="container">
            <h1 className="title">Description:</h1>
            <p className="text">
                Sure! Here is a bullet point dummy text with the subheading "Lorem Ipsum": </p>
                <h2 className="subheading">Subheading:Lorem Ipsum</h2>
                <ul className="list">
                    <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. </li>
                    <li>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </li>
                    <li>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat</li>
                    <li>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                     fugiat nulla pariatur.</li>
                    <li>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</li>
                    <li>Ut enim add minim veniam , quis nostrud exercitation ullamco laboris nisi ut
                     aliquip ex ea commodo consequat.</li>
                    <li>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                     fugiat nulla pariatur.</li>
                    </ul>
                    <div className="button-container">
        <button className="button">Register</button>
      </div>
    </div>
    );
};
export default Description;