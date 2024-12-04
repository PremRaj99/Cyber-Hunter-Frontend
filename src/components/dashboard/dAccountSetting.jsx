import { motion } from "framer-motion";
import { useState } from 'react'
import GroupsIcon from '@mui/icons-material/Groups';
import PersonIcon from '@mui/icons-material/Person';
import {FiMail,FiLock} from "react-icons/fi";
import { Link } from 'react-router-dom';

const DAccountSetting = () => {

    

    const [activeSection, setActiveSection] = useState('profile');
    const renderContent = () => {
        switch(activeSection){
            case'profile':
               return div1();
            case'personal':
               return div2();
            default:
                return <h1>Welcome</h1>;
        }
    }


  return (
    <div className='_dashboard'>

        <h2>Account Setting</h2>
        <div className='dMainContainer'>
            <aside>
                <ul >
                   <li onClick={() => setActiveSection('profile')} className={activeSection === 'profile'?'dActive':''}>
                   <GroupsIcon/>PROFILE
                   </li>
                   <li onClick={() => setActiveSection('personal')} className={activeSection === 'personal'?'dActive':''}>
                   <PersonIcon/>PERSONAL
                   </li>
                </ul>
            </aside>

           <div className='ddivider'></div>
           <div className='dmain'>
             {renderContent()}
           </div>
            
        </div>
        
    </div>
  )
}



const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 },
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 },
    },
  };






const div1 = () => (
        <motion.div initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={containerVariants}
        className='dSetting'>
            <motion.h2 initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
                SETTINGS
            </motion.h2>
            <motion.ul variants={containerVariants}>
                <motion.li variants={itemVariants} whileHover="hover"><Link to="/"> <FiMail />Email Verification</Link></motion.li>
                <motion.li variants={itemVariants} whileHover="hover"><Link to="/"> <FiMail />Email Change</Link></motion.li>
                <motion.li variants={itemVariants} whileHover="hover"><Link to="/"><FiLock />Password Change</Link></motion.li>
            </motion.ul>
        </motion.div>
    );

const div2 = () => (
        <motion.div initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={containerVariants} >
            <motion.h2>PERSONAL ACCOUNT SETTING</motion.h2>
        </motion.div>
    );

export default DAccountSetting