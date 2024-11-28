import React from 'react';
import '../styles/AddProject2.css';

const AddProject2 = () => {
    return (
        <div className="add-project-container-2">
            <h2 className="add-project-title-2">Add Project</h2>
            
            <div className="input-section-2">
                <label htmlFor="project-screenshots" className="input-label-2">Upload Project Screenshots</label>
                <a href="#" className="upload-link-2">Click here</a>
                <p className="upload-instructions-2">
                    Do not upload the image more than 5MB.<br />
                    Only .jpg, .png, .jpeg, .webp supported.
                </p>
            </div>
            
            <div className="input-section-2">
                <label htmlFor="skills-required" className="input-label-2">Skills Required</label>
                <textarea
                    id="skills-required"
                    placeholder="Search and select the skills you gained during the projects"
                    className="input-field-2"
                />
            </div>
            
            <div className="input-section-2">
                <label htmlFor="tech-stacks" className="input-label-2">Tech Stacks</label>
                <textarea
                    id="tech-stacks"
                    placeholder="Select the technologies you used in the project"
                    className="input-field-2"
                />
            </div>
        </div>
    );
};

export default AddProject2;
