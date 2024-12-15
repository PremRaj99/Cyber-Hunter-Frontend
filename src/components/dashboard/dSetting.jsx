import React from 'react'
import { Link } from 'react-router-dom'
import { FiSettings } from "react-icons/fi";
import { MdGroups } from "react-icons/md";
import { BsPersonCircle } from "react-icons/bs";

const dSetting = () => {
  return (
    <div className='dSetting'>
      <h2>SETTINGS</h2>
      <ul>
        <li><Link to="/profileSetting"><BsPersonCircle />Profile Settings</Link></li>
        <li><Link to="/teamSetting"><MdGroups />Team Settings</Link></li>
        <li><Link to="/accountSetting"><FiSettings />Account Settings</Link></li>
      </ul>
    </div>
  )
}

export default dSetting