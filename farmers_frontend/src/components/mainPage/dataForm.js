//This component is responsible for creating UI for adding datapoints

import React, {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { addDataPoint } from "../../reducers/dataReducer";

const DataForm = ({visibility}) => {
    const [date, setDate] = useState('')
    const [pH, setpH] = useState(undefined)
    const [temperature, setTemperature] = useState(undefined)
    const [rainfall, setRainfall] = useState(undefined)

    const dispatch = useDispatch()
    const token = useSelector(state => state.user.token)
    const show = { display: visibility ? 'none' : '' }

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
        setRainfall(undefined)
        setTemperature(undefined)
        setpH(undefined)
    }

    return <form onSubmit={handleAdd} style={show}>
        <div>date</div>
        <input type="text" value={date} onChange={({target}) => setDate(target.value)}/>
        <div>pH</div>
        <input type="number" value={pH} onChange={({target}) => setpH(target.value)}/>
        <div>temperature</div>
        <input type="number" value={temperature} onChange={({target})=> setTemperature(target.value)}/>
        <div>rainfall</div>
        <input type="number" value={rainfall} onChange={({target}) => setRainfall(target.value)}/>
        <div><button type="submit">submit</button></div>
    </form>
}

export default DataForm

