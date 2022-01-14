//This component is responsible for creating UI for adding datapoints

import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addDataPoint } from '../../reducers/dataReducer'
import { Box, Input, InputLabel, Button } from '@mui/material'


const DataForm = () => {
    const [date, setDate] = useState('')
    const [pH, setpH] = useState('')
    const [temperature, setTemperature] = useState('')
    const [rainfall, setRainfall] = useState('')

    const dispatch = useDispatch()
    const token = useSelector(state => state.user.token)

    const handleAdd = (event) => {
        event.preventDefault()
        const dataPoint = {
            date: date,
            pH: pH,
            temperature: temperature,
            rainfall: rainfall
        }
        dispatch(addDataPoint(dataPoint, token))
        setDate('')
        setRainfall(0)
        setTemperature(0)
        setpH(0)
    }

    return (
        <Box
            component ='form'
            autoComplete = 'off'
            onSubmit = {handleAdd}
        >
            <InputLabel htmlFor = 'date'>Date</InputLabel>
            <Input id = 'date' placeholder = 'yyyy-mm-dd' value = {date} onChange = {({ target }) => setDate(target.value)}/>
            <InputLabel htmlFor = 'temperature'>Temperature</InputLabel>
            <Input type = 'number' placeholder = '[-50,100]' id = 'temperature' value = {temperature} onChange = {({ target }) => setTemperature(target.value)}/>
            <InputLabel htmlFor = 'pH'>pH</InputLabel>
            <Input type = 'number' placeholder = '[0,14]' id = 'pH' value = {pH} onChange = {({ target }) => setpH(target.value)}/>
            <InputLabel htmlFor = 'rainfall'>Rainfall</InputLabel>
            <Input type = 'number' placeholder = '[0,500]' id = 'rainfall' value = {rainfall} onChange = {({ target }) => setRainfall(target.value)}/>
            <div></div>
            <Button type = 'submit' variant = 'contained' id='submitData'>Submit </Button>
        </Box>
    )
}

export default DataForm