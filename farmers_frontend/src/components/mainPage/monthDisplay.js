import React from "react";
import { useSelector } from "react-redux";
import MonthTable from "./monthTable";
import DataGraph from "./dataGraph";
import StatisticsTable from "./statsTable";


const MonthDisplay = () => {
    const data = useSelector(state => state.dataPoints);
    const stats = useSelector(state => state.monthStatistics)
    const date = useSelector(state => state.date)
    const monthData = data.find((dp) => dp.id === date)
    const monthStats = stats.find((stat) => stat.id === date)

    console.log(monthData);
    console.log(monthStats);
    console.log(date);

    if (!monthData || !monthStats) {
        return <div></div>
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
    
    return <div>
        <MonthTable monthData={monthData.dataPoints}/>
        <StatisticsTable statsData={monthStats.monthStats}/>
        <DataGraph style={{float: 'left'}} dataPoints={datapH} yType={'pH'} color={"brown"}/>
        <DataGraph style={{float: 'left'}} dataPoints={dataTemp} yType={'temperature'} color={"green"}/>
        <DataGraph dataPoints={dataRain} yType={'rainfall'} color={"blue"}/>
    </div>
}

export default MonthDisplay;