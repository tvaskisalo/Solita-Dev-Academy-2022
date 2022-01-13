import React from 'react'
import { useSelector } from 'react-redux'
import { Alert, Collapse } from '@mui/material'

const Notification = ({ type }) => {
    const notifications = useSelector(state => state.notification)
    const notification = notifications.find((n) => n.type === type)
    if (!notification) {
        return <div></div>
    }
    return (
        <Collapse in = {!notification.hide}>
            <Alert severity = {notification.positive ? 'success' : 'error'}>
                {notification.text}
            </Alert>
        </Collapse>
    )
}


export default Notification