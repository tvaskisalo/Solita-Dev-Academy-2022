import React, { useState } from 'react'
import DataForm from './dataForm'
import { Button, Modal, Typography, Box } from '@mui/material'
import Notification from '../Notification'


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
}

const AddDataOverlay = ({ disabled }) => {
    const [open, setOpen] = useState(false)

    return (
        <div>
            <Button disabled = {disabled} onClick={() => setOpen(true)} variant='contained'>Add a datapoint</Button>
            <Modal open = {open} onClose = {() => setOpen(false)}>
                <Box sx = {style}>
                    <Notification type='data' />
                    <Typography component='h2'>
                        Add a new datapoint
                    </Typography>
                    <DataForm />
                </Box>
            </Modal>
        </div>
    )
}

export default AddDataOverlay