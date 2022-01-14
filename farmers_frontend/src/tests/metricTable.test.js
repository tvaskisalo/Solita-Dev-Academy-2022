import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import MetricTable from '../components/metricDataPage/metricTable'

test('Metric table renders correctly 1', () => {
    const metricData = [{
        date: {
            year: 2020,
            month: 1,
            day: 2
        },
        pH: 3
    },{
        date: {
            year: 2019,
            month: 4,
            day: 5
        },
        pH: 6
    },{
        date: {
            year: 2018,
            month: 7,
            day: 8
        },
        pH: 10
    }]

    const { container } = render(
        <MetricTable metricData={metricData} metric='pH' />
    )
    expect(container).toHaveTextContent('Date')
    expect(container).toHaveTextContent('pH')

    expect(container).toHaveTextContent('2020-1-2')
    expect(container).toHaveTextContent('2019-4-5')
    expect(container).toHaveTextContent('2018-7-8')
    expect(container).toHaveTextContent('3')
    expect(container).toHaveTextContent('6')
    expect(container).toHaveTextContent('9')
})

test('Metric table renders correctly 2', () => {
    const metricData = [{
        date: {
            year: 2020,
            month: 1,
            day: 2
        },
        temperature: 3
    },{
        date: {
            year: 2019,
            month: 4,
            day: 5
        },
        temperature: 6
    },{
        date: {
            year: 2018,
            month: 7,
            day: 8
        },
        temperature: 10
    }]

    const { container } = render(
        <MetricTable metricData={metricData} metric='temperature' />
    )
    expect(container).toHaveTextContent('Date')
    expect(container).toHaveTextContent('temperature')

    expect(container).toHaveTextContent('2020-1-2')
    expect(container).toHaveTextContent('2019-4-5')
    expect(container).toHaveTextContent('2018-7-8')
    expect(container).toHaveTextContent('3')
    expect(container).toHaveTextContent('6')
    expect(container).toHaveTextContent('9')
})

test('Metric table renders correctly 3', () => {
    const metricData = [{
        date: {
            year: 2020,
            month: 1,
            day: 2
        },
        rainfall: 3
    },{
        date: {
            year: 2019,
            month: 4,
            day: 5
        },
        rainfall: 6
    },{
        date: {
            year: 2018,
            month: 7,
            day: 8
        },
        rainfall: 10
    }]

    const { container } = render(
        <MetricTable metricData={metricData} metric='rainfall' />
    )
    expect(container).toHaveTextContent('Date')
    expect(container).toHaveTextContent('rainfall')

    expect(container).toHaveTextContent('2020-1-2')
    expect(container).toHaveTextContent('2019-4-5')
    expect(container).toHaveTextContent('2018-7-8')
    expect(container).toHaveTextContent('3')
    expect(container).toHaveTextContent('6')
    expect(container).toHaveTextContent('9')
})