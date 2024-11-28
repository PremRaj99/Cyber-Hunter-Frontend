import React from 'react';
import '../styles/AddProject3.css';

const AddProject3 = () => {
    return (
        <div className="add-project-container-3">
            <h2 className="add-project-title-3">Add Project</h2>

            <div className="input-section-3">
                <label htmlFor="languages" className="input-label-3">Languages</label>
                <textarea
                    id="languages"
                    placeholder="Search and select the languages you used to develop the project"
                    className="input-field-3"
                />
            </div>

            <div className="input-section-3">
                <label htmlFor="github-link" className="input-label-3">GitHub Link</label>
                <textarea
                    id="github-link"
                    placeholder="Enter project GitHub Link"
                    className="input-field-3"
                />
            </div>

            <div className="input-section-3">
                <label htmlFor="live-link" className="input-label-3">Live Link</label>
                <textarea
                    id="live-link"
                    placeholder="Enter project Live Link"
                    className="input-field-3"
                />
            </div>

            <div className="note-section-3">
                <p className="note-title-3"><strong>NOTE:</strong></p>
                <ul className="note-list-3">
                    <li>Your project will be approved within 24 hours.</li>
                    <li>Copied projects can lead to a ban.</li>
                </ul>
            </div>

            <div className="sign-up-button-container-3">
                <button type="submit" className="sign-up-button-3">
                    Sign Up
                </button>
            </div>
        </div>
    );
};

export default AddProject3;
