import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import StatisticsTable from '../components/monthDataPage/statsTable'

test('Statistics table renders correctly', () => {
    const stats = {
        pHAvg: 1,
        pHMax: 2,
        pHMin: 3,
        rainAvg: 4,
        rainMax: 5,
        rainMin: 6,
        rainSum: 7,
        tempAvg: 8,
        tempMax: 9,
        tempMin: 10,
        tempSum: 11
    }

    const { container } = render(
        <StatisticsTable statsData={stats} />
    )

    expect(container).toHaveTextContent('1')
    expect(container).toHaveTextContent('2')
    expect(container).toHaveTextContent('3')
    expect(container).toHaveTextContent('4')
    expect(container).toHaveTextContent('5')
    expect(container).toHaveTextContent('6')
    expect(container).toHaveTextContent('7')
    expect(container).toHaveTextContent('8')
    expect(container).toHaveTextContent('9')
    expect(container).toHaveTextContent('10')
    expect(container).toHaveTextContent('11')
    expect(container).toHaveTextContent('Metric')
    expect(container).toHaveTextContent('Value')
    expect(container).toHaveTextContent('Average pH')
    expect(container).toHaveTextContent('Maximum pH')
    expect(container).toHaveTextContent('Minimum pH')
    expect(container).toHaveTextContent('Average rainfall')
    expect(container).toHaveTextContent('Maximum rainfall')
    expect(container).toHaveTextContent('Minimum rainfall')
    expect(container).toHaveTextContent('Sum of rainfall values')
    expect(container).toHaveTextContent('Average temperature')
    expect(container).toHaveTextContent('Maximum temperature')
    expect(container).toHaveTextContent('Minimum temperature')
    expect(container).toHaveTextContent('Sum of all temperature values')
})