import { ComposedChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Line }  from 'recharts'
import React from 'react'

//Renders a graph based on given datapoints and type.
const DataGraph = ({ dataPoints, yType, color, yLabel }) => {
    if (yType === 'rainfall') {
        return <ComposedChart
            width = {400}
            height = {400}
            data = {dataPoints}
            margin = {{ top: 5, right: 20, left: 10, bottom: 5 }}
        >
            <XAxis dataKey = "day" axisLine = {true} label  =  {{ value:'Day', dy:10 }}/>
            <YAxis label = {{ value:yLabel, dx:-10 }} type = "number" domain = {['auto', 'auto']} />
            <Tooltip />
            <CartesianGrid stroke = "#f5f5f5" />
            <Bar type = "monotone" dataKey = {yType} stroke = {color} fill = {color} yAxisId = {0} />
        </ComposedChart>
    }
    return <ComposedChart
        width = {400}
        height = {400}
        data = {dataPoints}
        margin = {{ top: 5, right: 20, left: 10, bottom: 5 }}
    >
        <XAxis dataKey = "day" axisLine = {true} label  =  {{ value:'Day', dy:10 }}/>
        <YAxis label = {{ value:yLabel, dx:-15 }} type = "number" domain = {['auto', 'auto']} />
        <Tooltip />
        <CartesianGrid stroke = "#f5f5f5" />
        <Line type = "monotone" dataKey = {yType} stroke = {color} yAxisId = {0} />
    </ComposedChart>
}

export default DataGraph