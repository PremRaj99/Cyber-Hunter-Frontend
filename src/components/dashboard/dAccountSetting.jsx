import { motion, AnimatePresence } from "framer-motion";
import { useState } from 'react'
import GroupsIcon from '@mui/icons-material/Groups';
import PersonIcon from '@mui/icons-material/Person';
import {FiMail,FiLock} from "react-icons/fi";
import { Link } from 'react-router-dom';
import { FaBars } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { default as profile } from "../../assets/profile.png";

const DAccountSetting = () => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const sidebarItems = [
    { icon: <GroupsIcon />, text: "PROFILE", section: "profile" },
    { icon: <PersonIcon />, text: "PERSONAL", section: "personal" },
  ];

    

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



    const mobileMenuVariants = {
      hidden: {
        opacity: 0,
        y: -50,
        transition: {
          duration: 0.3,
        },
      },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          type: "spring",
          stiffness: 120,
          damping: 20,
          staggerChildren: 0.1,
        },
      },
    };


    const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          delayChildren: 0.2,
          staggerChildren: 0.1,
        },
      },
    };
  
    const itemVariants = {
      hidden: { x: -20, opacity: 0 },
      visible: {
        x: 0,
        opacity: 1,
        transition: {
          duration: 0.5,
          ease: "easeOut",
        },
      },
    };


    const pageVariants = {
      initial: { opacity: 0, y: 20 },
      in: { opacity: 1, y: 0 },
      out: { opacity: 0, y: -20 },
    };
  
    const pageTransition = {
      type: "tween",
      ease: "anticipate",
      duration: 0.5,
    };


  return (
    <div className='_dashboard  w-full min-h-screen px-4 md:px-16 lg:px-32 pb-6 box-border'>

      <motion.h2 className='text-white text-sm md:text-lg font-extrabold tracking-wide mt-6 mb-6 z-[1]'
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        ACCOUNT SETTINGS
      </motion.h2>
        <div className='dMainContainer box-border min-h-[75vh] grid md:grid-cols-[1fr_0.01fr_3.3fr] grid-cols-[1fr_8fr] md:gap-6 gap-0'>
            <motion.aside initial="hidden"
      animate="visible"
      variants={containerVariants}>



            <div className="md:hidden ">
             <button
             className="text-cyan-400 transition-all duration-300 focus:outline-none"
             onClick={toggleMenu}
             >
              {isMenuOpen ? "" : <FaBars className="h-6 w-6" />}
             </button>
            </div>

              {/* ============= */}



              {/* Mobile Menu */}
             <motion.div
               className={`space-y-8 px-4 py-12 text-center list-none fixed inset-0 z-20 bg-black bg-opacity-80 md:hidden ${
                 isMenuOpen ? "block" : "hidden"
               }`}
               variants={mobileMenuVariants}
               initial="hidden"
               animate={isMenuOpen ? "visible" : "hidden"}
              > 

               {/* Close Button */}
               <button
                 className="absolute top-24 left-8 text-gray-400 hover:text-white transition-all"
                 onClick={toggleMenu}
               >
                 <FaXmark className="h-6 w-6" />
               </button>




        

        {/* Menu Items */}
        {sidebarItems.map((item) => (
          <motion.div
            key={item.section}
            className={`flex items-center justify-center text-gray-400 font-bold cursor-pointer p-2 rounded-lg transition-all ${activeSection === item.section ? "dActive" : ""}`}
            onClick={() => {
              setActiveSection(item.section);
              toggleMenu();
            }}
          >
            {item.icon}
            {/* <Icon className="mr-2" /> */}
            {item.text}
          </motion.div>
        ))}
      </motion.div>




              {/* Desktop Menu */}
             <motion.ul className="hidden md:flex flex-col space-y-7">
               {sidebarItems.map((item) => (
                 <motion.li
                   key={item.section}
                   onClick={() => setActiveSection(item.section)}
                   className={`flex items-center cursor-pointer p-2 rounded-2xl border-2 border-cyan-400 text-cyan-400      font-semibold transition-all text-[1.2rem] ${activeSection === item.section ? "dActive" : ""}`}
                   variants={itemVariants}
                   whileHover={{
                     scale: 1.05,
                     transition: { duration: 0.2 },
                    }}
                   whileTap={{ scale: 0.95 }}
                 >
                   {item.icon}
                   {item.text}
                 </motion.li>
               ))}
             </motion.ul>
            </motion.aside>

           <div className='ddivider bg-white'></div>
           <div className='dmain className="relative bg-white/10 rounded-lg p-4 md:p-8"'>
           <motion.div
            initial={{ opacity: 0.6, scale: 0.9 }}
            animate={{ opacity: 0.45, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-brandPrimary w-72 h-72 rounded-full blur-3xl opacity-45 absolute bottom-1/4 left-150"
          ></motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
           </div>
            
        </div>
        
    </div>
  )
}

const inputVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
    },
  },
  hover: {
    scale: 1.02,
    transition: { duration: 0.2 },
  },
};


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
              className="text-2xl font-bold text-cyan-400 mb-8 text-center"
            >
                SETTINGS
            </motion.h2>
            <motion.ul variants={containerVariants} className="w-full max-w-md flex flex-col items-center gap-14 m-auto mt-20">
                <motion.li className="w-full py-3 px-10 border-4 border-dashed border-black rounded-2xl  text-white" variants={itemVariants} whileHover="hover"><Link to="/" className="flex items-center text-xl font-medium capitalize text-white gap-0"> <FiMail />Email Verification</Link></motion.li>
                <motion.li className="w-full py-3 px-10 border-4 border-dashed border-black rounded-2xl  text-white" variants={itemVariants} whileHover="hover"><Link to="/" className="flex items-center text-xl font-medium capitalize text-white gap-0"> <FiMail />Email Change</Link></motion.li>
                <motion.li className="w-full py-3 px-10 border-4 border-dashed border-black rounded-2xl  text-white" variants={itemVariants} whileHover="hover"><Link to="/" className="flex items-center text-xl font-medium capitalize text-white gap-0"><FiLock />Password Change</Link></motion.li>
            </motion.ul>
        </motion.div>
    );

const div2 = () => (
        <motion.div initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={containerVariants} >
            <motion.h2 initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-2xl font-bold text-cyan-400 mb-8 text-center"
            >
                Profile Setup
            </motion.h2>
            <motion.div className="w-full max-w-xl flex flex-col items-center gap-8 m-auto mt-12 dSettingPersonal">
              <motion.div className="flex sm:flex-row flex-col gap-8 justify-center items-center">
                <img src={profile} alt="" className="rounded-full sm:h-32 h-24"/>
                <button className="py-1 px-4 border-4 rounded-lg border-cyan-400 text-cyan-400 font-semibold">Upload Photo</button>
                <button className="py-1 px-4 border-4 rounded-lg border-rose-500 text-rose-500 font-semibold">Delete Avatar</button>
              </motion.div>
              <motion.div className="w-full flex flex-col gap-6 items-center">




            

       <motion.div className="w-full">
         <motion.label for="fullName" className="text-base font-medium text-gray-200"> Full Name </motion.label>
       
         <motion.input
             variants={inputVariants}
             whileHover="hover"
             type="text"
             name="fullName"
             id="fullName"
             required
             placeholder="Enter full name"
             className="w-full border-2 border-cyan-400 rounded-2xl pl-8 bg-black text-white placeholder-gray-400"
         />
       </motion.div>

       <motion.div className="w-full">
         <motion.label for="phone" className="text-base font-medium text-gray-200"> Phone </motion.label>

         <motion.input
            variants={inputVariants}
            whileHover="hover"
            type="text"
            name="phone"
            id="phone"
            required
            placeholder="Enter phone number"
            className="w-full border-2 border-cyan-400 rounded-2xl pl-8 bg-black text-white placeholder-gray-400"
         />
       </motion.div>

       <motion.div className="w-full">

        <motion.label for="gender" className="text-base font-medium text-gray-200"> Full name </motion.label>
        <select name="gender" id="gender" placeholder="Select" className="w-full border-2 border-cyan-400 rounded-2xl pl-8 bg-black text-white placeholder-gray-400 appearance-none">
         <option value="male">Male</option>
         <option value="female">Female</option>
         <option value="other">Other</option>
        </select>

       </motion.div>

        <motion.button
          variants={inputVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="bg-black text-cyan-400 font-semibold border-2 border-cyan-400 rounded-full px-10 py-2  text-lg uppercase"
        >
          Update       
        </motion.button>
                


              </motion.div>

            </motion.div>
        </motion.div>
    );

export default DAccountSetting