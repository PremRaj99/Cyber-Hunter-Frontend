import { list } from 'postcss'
import React,{useState} from 'react'
import NotificationItem from "./dNotificationItem"

const dNotification = () => {

    const defaultNotifications = [
        { id: 1, message: "Your Notification", time: "2024-11-25 10:30 AM" },
        { id: 2, message: "Your Notification1", time: "2024-11-25 3:00 PM" },
        { id: 3, message: "Your Notification2", time: "2024-11-24 8:00 PM" },
        { id: 3, message: "Your Notification3", time: "2024-11-24 8:00 PM" },
        { id: 3, message: "Your Notification4", time: "2024-11-24 8:00 PM" },
        { id: 3, message: "Your Notification5", time: "2024-11-24 8:00 PM" },
        { id: 3, message: "Your Notification6", time: "2024-11-24 8:00 PM" },
        { id: 3, message: "Your Notification7", time: "2024-11-24 8:00 PM" },
        { id: 3, message: "Your Notification8", time: "2024-11-24 8:00 PM" },
        { id: 3, message: "Your Notification9", time: "2024-11-24 8:00 PM" },
        { id: 3, message: "Your Notification0", time: "2024-11-24 8:00 PM" },
        { id: 3, message: "Your Notification1", time: "2024-11-24 8:00 PM" },
      ];

    const [noteList, setNoteList] = useState(defaultNotifications)

    const [selectedNotification, setSelectedNotification] = useState(null)

    const handleNotificationClick = (notification) => {
        setSelectedNotification(notification);
        console.log("hi")
        console.log(selectedNotification)
    };
    


  return (
    <div className='dNotification'>
        <div className='dNotList'>
            <h4>Notifications</h4>
            <ul>
                {
                    noteList.map((notification)=>(
                        <NotificationItem 
                        key={notification.id}
                        notification={notification} 
                        onclick={()=>handleNotificationClick(notification)}/>
                    ))
                    
                }
            </ul>
        </div>
        <div className='ddivider'></div>
        <div className='dmessage'>
            {
                selectedNotification?(<p>{selectedNotification.message}</p>):(<p>Select a notification to view details</p>)
            }
        </div>
    </div>
  )
}

export default dNotification