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
    expect(container).toHaveTextContent('Date')
    expect(container).toHaveTextContent('Temperature')
    expect(container).toHaveTextContent('pH')
    expect(container).toHaveTextContent('Rainfall')
    expect(container).toHaveTextContent('2020-7-8')
    expect(container).toHaveTextContent('2020-2-3')
    expect(container).toHaveTextContent('4')
    expect(container).toHaveTextContent('5')
    expect(container).toHaveTextContent('6')
    expect(container).toHaveTextContent('9')
    expect(container).toHaveTextContent('10')
    expect(container).toHaveTextContent('11')
})