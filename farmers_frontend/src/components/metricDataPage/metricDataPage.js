import { Grid, Stack } from '@mui/material'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import MetricForm from './metricForm'
import MetricTable from './metricTable'
import Notification from '../Notification'

const MetricDataPage = () => {
    const metricDataArray = useSelector(state => state.metricData)

    const [showMetric, setShowMetric] = useState('')

    const metricData = metricDataArray.find(md => md.metric === showMetric)
    return <Grid>
        <Notification type = 'metric'/>
        <Stack direction = 'row' spacing = {2}>
            <MetricForm setShowMetric = {setShowMetric}/>
            {metricData
                ? <MetricTable metricData = {metricData.dataPoints} metric = {showMetric}/>
                : <div></div>}
        </Stack>
    </Grid>
}

export default MetricDataPage