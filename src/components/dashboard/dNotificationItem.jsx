import React from 'react'

const NotificationItem = ({notification,onclick}) => {
  return (
    <li onClick={onclick}>
      <p>{notification.message.slice(0,17)}</p>
    </li>
  )
}

export default NotificationItem