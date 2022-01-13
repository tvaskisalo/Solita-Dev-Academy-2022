import React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

const StatisticsTable = ({ statsData }) => {
    if (!statsData) {
        return <div></div>
    }
    return (
        <TableContainer component = {Paper} >
            <Table sx = {{ maxWidth : 400 }} >
                <TableHead>
                    <TableRow>
                        <TableCell><b>Metric</b></TableCell>
                        <TableCell><b>Value</b></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell component = 'th' scope = 'row'>Average pH</TableCell>
                        <TableCell align = 'right'>{statsData.pHAvg}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell component = 'th' scope = 'row'>Maximum pH</TableCell>
                        <TableCell align = 'right'>{statsData.pHMax}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell component = 'th' scope = 'row'>Minimum pH</TableCell>
                        <TableCell align = 'right'>{statsData.pHMin}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell component = 'th' scope = 'row'>Average rainfall</TableCell>
                        <TableCell align = 'right'>{statsData.rainAvg}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell component = 'th' scope = 'row'>Maximum rainfall</TableCell>
                        <TableCell align = 'right'>{statsData.rainMax}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell component = 'th' scope = 'row'>Minimum rainfall</TableCell>
                        <TableCell align = 'right'>{statsData.rainMin}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell component = 'th' scope = 'row'>Sum of rainfall values</TableCell>
                        <TableCell align = 'right'>{statsData.rainSum}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell component = 'th' scope = 'row'>Average temperature</TableCell>
                        <TableCell align = 'right'>{statsData.tempAvg}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell component = 'th' scope = 'row'>Maximum temperature</TableCell>
                        <TableCell align = 'right'>{statsData.tempMax}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell component = 'th' scope = 'row'>Minimum temperature</TableCell>
                        <TableCell align = 'right'>{statsData.tempMin}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell component = 'th' scope = 'row'>Sum of all temperature values</TableCell>
                        <TableCell align = 'right'>{statsData.tempSum}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default StatisticsTable