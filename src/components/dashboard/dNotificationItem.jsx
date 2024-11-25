import React from 'react'

const NotificationItem = ({notification}) => {
  return (
    <li>
      <p>{notification.message}</p>
    </li>
  )
}

export default NotificationItem