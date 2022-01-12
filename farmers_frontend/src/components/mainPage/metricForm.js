import React, {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMetricData } from "../../reducers/metricReducer";


const MetricForm = ({visibility}) => {
    const [value, setValue] = useState('')

    const dispatch = useDispatch()
    const token = useSelector(state => state.user.token)
    const show = { display: visibility ? '' :'none'}

    const handleSubmit = async(event) => {
        event.preventDefault()
        console.log(value);
        dispatch(addMetricData(value, token))
    }

    return <form onSubmit={handleSubmit} style={show}>
        <input type='radio' id='temperature' name='metric' value="Temperature"onChange={({target}) => setValue('temperature')}/>
        Temperature
        <div></div>
        <input type='radio' id='pH' name='metric' value="pH" onChange={({target}) => setValue('pH')}/>
        pH
        <div></div>
        <input type='radio' id='rainfall' name='metric' value="Rainfall" onChange={({target}) => setValue('rainfall')}/>
        rainfall
        <div></div>
        <button type="submit">fetch</button>
    </form>
}

export default MetricForm