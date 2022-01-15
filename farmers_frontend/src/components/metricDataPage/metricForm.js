import { FormControl, FormLabel, FormControlLabel, RadioGroup, Radio, Button } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addMetricData } from '../../reducers/metricReducer'

//Renders a form for fetching by metric
const MetricForm = ({ setShowMetric }) => {
    const [value, setValue] = useState('')
    const dispatch = useDispatch()
    const token = useSelector(state => state.user.token)

    const handleSubmit = async(event) => {
        event.preventDefault()
        dispatch(addMetricData(value, token))
        setShowMetric(value)
    }

    return (
        <div>
            <FormControl component = 'fieldset'>
                <FormLabel component ='legend'>Metric</FormLabel>
                <RadioGroup value = {value} onChange = {({ target }) => setValue(target.value)}>
                    <FormControlLabel id='temperatureRadio' value = 'temperature' control = {<Radio />} label = 'Temperature'/>
                    <FormControlLabel id='pHRadio' value = 'pH' control = {<Radio />} label = 'pH'/>
                    <FormControlLabel id='rainfallRadio' value = 'rainfall' control = {<Radio />} label = 'Rainfall'/>
                </RadioGroup>
                <Button id='metricFetch' variant = 'contained' onClick = {handleSubmit}>Select</Button>
            </FormControl>
        </div>
    )
}
export default MetricForm