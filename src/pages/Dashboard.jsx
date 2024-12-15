import { useState } from 'react'
import Sidebar from "../components/dashboard/Sidebar"
import DTeam from "../components/dashboard/dTeam"
import DPersonal from "../components/dashboard/dPersonal"
import DContact from "../components/dashboard/dContact"
import DLeaderBoard from "../components/dashboard/dLeaderBorad"
import DNotification from "../components/dashboard/dNotification"
import DSetting from '../components/dashboard/dSetting'


export default function Dashboard() {

  const [activeSection, setActiveSection] = useState('team'); // Default section

  // Content for each section
  const renderContent = () => {
    switch (activeSection) {
      case 'team':
        return <DTeam/>;
      case 'personal':
        return <DPersonal/>;
      case 'leaderboard':
        return <DLeaderBoard/>;
      case 'notification':
        return <DNotification/>;
      case 'contact':
        return <DContact/>;
      case 'settings':
        return <DSetting/>;
      default:
        return <h1>Welcome</h1>;
    }
  };



  return (
    <div className='_dashboard'>
      
      <h2>HOME {'>'} DASHBOARD</h2>
      <div className='dMainContainer'>
        <Sidebar onSectionChange={setActiveSection} activeSection={activeSection}/>
        
        <div className='ddivider'></div>
        <div className='dmain'>
          <div className="bg-brandPrimary w-72 h-72 rounded-full blur-3xl opacity-45 absolute bottom-1/4 left-150"></div>
          {renderContent()}
        </div>
      </div>
      {/* <div class="dtos"></div> */}
    </div>
  )
}
