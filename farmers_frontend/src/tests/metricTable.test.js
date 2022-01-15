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
        pH: 9
    }]

    const { container } = render(
        <MetricTable metricData={metricData} metric='pH' />
    )
    //Value declarations without spaces
    expect(container).toHaveTextContent('DatepH')
    //Values without spaces
    expect(container).toHaveTextContent('2020-1-23')
    expect(container).toHaveTextContent('2019-4-56')
    expect(container).toHaveTextContent('2018-7-89')
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
        temperature: 9
    }]

    const { container } = render(
        <MetricTable metricData={metricData} metric='temperature' />
    )
    //Value declarations without spaces
    expect(container).toHaveTextContent('Datetemperature')
    //Values without spaces
    expect(container).toHaveTextContent('2020-1-23')
    expect(container).toHaveTextContent('2019-4-56')
    expect(container).toHaveTextContent('2018-7-89')
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
        rainfall: 9
    }]

    const { container } = render(
        <MetricTable metricData={metricData} metric='rainfall' />
    )
    //Value declarations without spaces
    expect(container).toHaveTextContent('Daterainfall')
    //Values without spaces
    expect(container).toHaveTextContent('2020-1-23')
    expect(container).toHaveTextContent('2019-4-56')
    expect(container).toHaveTextContent('2018-7-89')
})