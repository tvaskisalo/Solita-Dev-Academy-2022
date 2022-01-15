import MonthTable from '../components/monthDataPage/monthTable'
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'

test('Month table renders correctly', () => {
    const monthData = [
        { date: {
            year: 2020,
            month: 2,
            day: 3
        },
        temperature: 4,
        pH: 5,
        rainfall: 6
        },{
            date: {
                year: 2020,
                month: 7,
                day: 8
            },
            temperature: 9,
            pH: 10,
            rainfall: 11
        }
    ]
    const { container } = render(
        <MonthTable monthData={monthData} />
    )

    //Value declarations without spaces
    expect(container).toHaveTextContent('DateTemperaturepHRainfall')
    //Values without spaces
    expect(container).toHaveTextContent('2020-7-891011')
    expect(container).toHaveTextContent('2020-2-3456')

})