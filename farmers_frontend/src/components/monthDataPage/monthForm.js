import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMonthInfo } from '../../reducers/dataReducer'
import { setStateDate } from '../../reducers/dateReducer'
import { fetchMonthStatistics } from '../../reducers/statisticsReducer'
import { Box, Input, InputLabel, Button } from '@mui/material'

//Renders the form for selecting a month and year
const MonthForm = () => {
    const [month, setMonth] = useState('')
    const [year, setYear] = useState('')

    const dispatch = useDispatch()
    const token = useSelector(state => state.user.token)

    const handleAdd = (event) => {
        event.preventDefault()
        const date = {
            month: month,
            year: year
        }
        dispatch(fetchMonthInfo(date, token))
        dispatch(fetchMonthStatistics(date,token))
        dispatch(setStateDate(`y${date.year}m${date.month}`))
        setYear('')
        setMonth('')
    }

    return (
        <Box
            component = 'form'
            autoComplete = 'off'
            onSubmit = {handleAdd}
        >
            <InputLabel htmlFor = 'month'>Month</InputLabel>
            <Input type = 'number' id = 'month' placeholder = 'month' value = {month} onChange = {({ target })  => setMonth(target.value)}/>
            <InputLabel htmlFor = 'year'>Year</InputLabel>
            <Input type = 'number' placeholder = 'year' id = 'year' value = {year} onChange = {({ target })  => setYear(target.value)}/>
            <div></div>
            <Button id='fetchMonth' type = 'submit' variant = 'contained'>Fetch</Button>
        </Box>
    )
}

export default MonthForm