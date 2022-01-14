
import React from 'react'
import { useHistory } from 'react-router-dom'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import AddDataOverlay from './addDataOverlay/addDataOverlay'
import { useDispatch } from 'react-redux'
import { logout } from '../reducers/userReducer'


const Menu = ({ loggedIn }) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const disabled = !loggedIn

    const handleLogout = () => {
        dispatch(logout())
    }

    return (
        <Grid container justifyContent = 'center'>
            <Stack direction = 'row' spacing = {2}>
                {loggedIn
                    ? <Button id='logoutButton' variant = 'contained' onClick = {handleLogout}>logout</Button>
                    : <Button id='loginButton'variant = 'contained' onClick = {()  => history.push('/login')}>login</Button>}
                <AddDataOverlay disabled = {disabled}/>
                <Button id='monthDataButton' disabled = {disabled} variant = 'contained' onClick = {()  => history.push('/monthData')}>Month Data</Button>
                <Button id='metricDataButton' disabled = {disabled} variant = 'contained' onClick = {() => history.push('/metricData')}>Metric Data</Button>
            </Stack>
        </Grid>
    )
}

export default Menu