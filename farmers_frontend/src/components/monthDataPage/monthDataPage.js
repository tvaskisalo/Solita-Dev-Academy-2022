import React from 'react'
import { useSelector } from 'react-redux'
import MonthTable from './monthTable'
import DataGraph from './dataGraph'
import StatisticsTable from './statsTable'
import MonthForm from './monthForm'
import { Stack, Grid } from '@mui/material'
import Notification from '../Notification'

const MonthDataPage = () => {
    const data = useSelector(state => state.dataPoints)
    const stats = useSelector(state => state.monthStatistics)
    const date = useSelector(state => state.date)
    const monthData = data.find((dp) => dp.id === date)
    const monthStats = stats.find((stat) => stat.id === date)

    if (!monthStats || !monthData) {
        return <div>
            <Notification type='month' />
            <MonthForm />
        </div>
    }

    const datapH = monthData.dataPoints.map(dp => {
        return {
            day: dp.date.day,
            pH: dp.pH,
        }
    })
    const dataTemp = monthData.dataPoints.map(dp => {
        return {
            day: dp.date.day,
            temperature: dp.temperature,
        }
    })
    const dataRain = monthData.dataPoints.map(dp => {
        return {
            day: dp.date.day,
            rainfall: dp.rainfall,
        }
    })
    return (
        <Grid container>
            <Grid sx = {{ padding: 5 }}>
                <Stack direction = 'row' spacing ={2}>
                    <Notification type='month' />
                    <MonthForm />
                    <MonthTable monthData = {monthData.dataPoints}/>
                    <StatisticsTable statsData = {monthStats.monthStats}/>
                </Stack>
            </Grid>

            <Grid sx = {{ padding: 5 }}>
                <Stack spacing = {5}>
                    <DataGraph style = {{ float: 'left' }} dataPoints = {datapH} yType = {'pH'} yLabel = {'pH'} color = {'brown'}/>
                    <DataGraph style = {{ float: 'left' }} dataPoints = {dataTemp} yType = {'temperature'} yLabel = {'°C'} color = {'green'}/>
                    <DataGraph dataPoints = {dataRain} yType = {'rainfall'} yLabel = {'mm'} color = {'blue'}/>
                </Stack>
            </Grid>
        </Grid>
    )
}

export default MonthDataPage