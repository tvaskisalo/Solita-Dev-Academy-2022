import React, {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMonthInfo } from "../../reducers/dataReducer";
import { setStateDate } from "../../reducers/dateReducer";
import { fetchMonthStatistics } from "../../reducers/statisticsReducer";

const MonthForm = ({visibility}) => {
    const [month, setMonth] = useState('')
    const [year, setYear] = useState('')

    const dispatch = useDispatch()
    const token = useSelector(state => state.user.token)
    const show = { display: visibility ? '' :'none'}

    const handleAdd = (event) => {
        event.preventDefault()
        const date = {
            month: month,
            year: year
        }
        dispatch(fetchMonthInfo(date, token))
        dispatch(fetchMonthStatistics(date,token))
        dispatch(setStateDate(`y${date.year}m${date.month}`))
        setYear('')
        setMonth('')
    }

    return <form onSubmit={handleAdd} style={show}>
        <div>month</div>
        <input type="number" value={month} onChange={({target}) => setMonth(target.value)}/>
        <div>year</div>
        <input type="number" value={year} onChange={({target})=> setYear(target.value)}/>
        <div><button type="submit">submit</button></div>
    </form>
}

export default MonthForm