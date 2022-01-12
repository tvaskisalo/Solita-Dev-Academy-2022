import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


const MetricTable = ({metricData, metric}) => {
    let rawMetricData;

    switch (metric) {
        case 'pH':
            rawMetricData = metricData.map((dp) => {
                return {
                    date: `${dp.date.year}-${dp.date.month}-${dp.date.day}`,
                    pH: dp.pH ? dp.pH : '-',
                }
            })
            break;
        case 'temperature':
            rawMetricData = metricData.map((dp) => {
                return {
                    date: `${dp.date.year}-${dp.date.month}-${dp.date.day}`,
                    temperature: dp.temperature ? dp.temperature : '-',
                }
            })
            break;
        case 'rainfall':
            rawMetricData = metricData.map((dp) => {
                return {
                    date: `${dp.date.year}-${dp.date.month}-${dp.date.day}`,
                    rainfall: dp.rainfall ? dp.rainfall : '-'
                }
            })
            break;
        default:
            return <div></div>
    }
    return (
        <TableContainer component={Paper} >
        <Table sx={{maxWidth : 400}} >
            <TableHead>
                <TableRow>
                    <TableCell><b>Date</b></TableCell>
                    <TableCell><b>{metric}</b></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {rawMetricData.map(dataPoint => (
                    <TableRow key={dataPoint.date}>
                    <TableCell component = 'th' scope ='row'>{dataPoint.date}</TableCell>
                    {dataPoint.temperature ? <TableCell align='right'>{dataPoint.temperature}</TableCell>: null}
                    {dataPoint.pH ? <TableCell align='right'>{dataPoint.pH}</TableCell> : null}
                    {dataPoint.rainfall ? <TableCell align='right'>{dataPoint.rainfall}</TableCell>: null}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>
    )

}

export default MetricTable