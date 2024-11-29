
import { Link } from 'react-router-dom';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import SettingsIcon from '@mui/icons-material/Settings';

const dPersonal = () => {
  return (
    <div className='dPersonal'>
      <h2>PERSONAL</h2>
          <ul>
            <li>
              <Link to="/addProject">
              <AddCircleRoundedIcon/>
              ADD PROJECT
              </Link>
            </li>

            <li>
              <Link to="/viewProject">
              <VisibilityOutlinedIcon/>
              VIEW PROJECT
              </Link>
            </li>
            
            <li>
              <Link to="/verifyProject">
              <VerifiedOutlinedIcon style={{color:'#06db62'}}/>
              VERIFY ACHIEVEMENT
              </Link>
            </li>
            
            <li>
              <Link to="/comment">
              <ChatBubbleIcon/>
              COMMENT
              </Link>
            </li>

            <li>
              <Link to="/accountsetting">
              <SettingsIcon/>
              PERSONAL MANAGEMENT
              </Link>
            </li>

          </ul>
    </div>
  )
}

export default dPersonal