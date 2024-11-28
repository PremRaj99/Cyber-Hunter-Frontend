import React from 'react';
import '../styles/AddProject.css';

const AddProject = () => {
    return (
        <div className="add-project-container-1">
            <h2 className="add-project-title-1">Add Project</h2>
            <div className="input-section-1">
                <label htmlFor="project-name" className="input-label-1">Project Name</label>
                <textarea
                    id="project-name"
                    placeholder="Enter your Project Name"
                    className="input-field-1"
                />
            </div>

            <div className="input-section-1">
                <label htmlFor="project-description" className="input-label-1">Project Description</label>
                <textarea
                    id="project-description"
                    placeholder="Enter Project Description"
                    className="input-field-1"
                />
            </div>

            <div className="file-upload-section-1">
                <label htmlFor="thumbnail" className="input-label-1">Thumbnail</label>
                <div>
                    <a href="#" className="file-upload-link-1">Click here</a>
                </div>
                <ul className="upload-instructions-1">
                    <li>Do not upload the image more than 2MB.</li>
                    <li>Only jpg, png, jpeg are supported.</li>
                </ul>
            </div>
        </div>
    );
};

export default AddProject;
