import React, { useState }  from 'react'
import GroupsIcon from '@mui/icons-material/Groups';
import PersonIcon from '@mui/icons-material/Person';
import LeaderboardOutlinedIcon from '@mui/icons-material/LeaderboardOutlined';
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';
import ContactsOutlinedIcon from '@mui/icons-material/ContactsOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

const Sidebar = ({activeSection, onSectionChange }) => {
  // const location = useLocation()


  return (
    <aside>
            <ul>
                <li onClick={() => onSectionChange('team')} className={activeSection === 'team'?'dActive':''}>
                <GroupsIcon/>TEAM
                </li>

                <li onClick={() => onSectionChange('personal')} className={activeSection === 'personal'?'dActive':''}>
                <PersonIcon/>PERSONAL
                </li>

                <li onClick={() => onSectionChange('leaderboard')} className={activeSection === 'leaderboard'?'dActive':''}>
                <LeaderboardOutlinedIcon/>LEADERBOARD
                </li>

                <li onClick={() => onSectionChange('notification')} className={activeSection === 'notification'?'dActive':''}>
                <CampaignOutlinedIcon/>NOTIFICATION
                </li>

                <li onClick={() => onSectionChange('contact')} className={activeSection === 'contact'?'dActive':''}>
                <ContactsOutlinedIcon/>CONTACT
                </li>

                <li onClick={() => onSectionChange('settings')} className={activeSection === 'settings'?'dActive':''}>
                <SettingsOutlinedIcon/>SETTINGS
                </li>

            </ul>
    </aside>
  )
}


export default Sidebar
