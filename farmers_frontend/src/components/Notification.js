import React from "react";
import { useSelector } from "react-redux";

const Notification = ({type}) => {
    console.log(type);
    const notifications = useSelector(state => state.notification);
    const notification = notifications.find((n) => n.type === type)
    console.log(notification);
    if (!notification) {
        return <div></div>
    }
    const style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1,
      visibility: notification.visibility
    }
    return (
      <div style={style}>
        {notification.text}
      </div>
    )
  }


export default Notification;