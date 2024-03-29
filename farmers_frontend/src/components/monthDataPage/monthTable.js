import React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

//Renders the table, which shows the months datapoints
const MonthTable = ({ monthData }) => {

    const rawDataPoints = monthData.map((dp) => {
        return {
            date: `${dp.date.year}-${dp.date.month}-${dp.date.day}`,
            temperature: (dp.temperature || dp.temperature === 0)? dp.temperature : '-',
            pH: (dp.pH || dp.pH === 0) ? dp.pH : '-',
            rainfall: (dp.rainfall || dp.rainfall === 0) ? dp.rainfall : '-'
        }
    })

    return (
        <TableContainer component={Paper} className='monthTable' >
            <Table sx = {{ maxWidth : 400 }} >
                <TableHead>
                    <TableRow>
                        <TableCell><b>Date</b></TableCell>
                        <TableCell><b>Temperature</b></TableCell>
                        <TableCell><b>pH</b></TableCell>
                        <TableCell><b>Rainfall</b></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rawDataPoints.map(dataPoint => (
                        <TableRow key = {dataPoint.date}>
                            <TableCell component = 'th' scope = 'row'>{dataPoint.date}</TableCell>
                            <TableCell align = 'right'>{dataPoint.temperature}</TableCell>
                            <TableCell align = 'right'>{dataPoint.pH}</TableCell>
                            <TableCell align = 'right'>{dataPoint.rainfall}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default MonthTable
