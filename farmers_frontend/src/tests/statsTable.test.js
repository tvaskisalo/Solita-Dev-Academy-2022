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
    //Table value declarations without spaces
    expect(container).toHaveTextContent('MetricValue')
    //Metric and value without spaces
    expect(container).toHaveTextContent('Average pH1')
    expect(container).toHaveTextContent('Maximum pH2')
    expect(container).toHaveTextContent('Minimum pH3')
    expect(container).toHaveTextContent('Average rainfall4')
    expect(container).toHaveTextContent('Maximum rainfall5')
    expect(container).toHaveTextContent('Minimum rainfall6')
    expect(container).toHaveTextContent('Sum of rainfall values7')
    expect(container).toHaveTextContent('Average temperature8')
    expect(container).toHaveTextContent('Maximum temperature9')
    expect(container).toHaveTextContent('Minimum temperature10')
    expect(container).toHaveTextContent('Sum of all temperature values11')
})