import React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import highchartsData from 'highcharts/modules/data.js'
import { ENDPOINT } from '../App'
require("highcharts/modules/exporting")(Highcharts)

highchartsData(Highcharts);

const HighChart = () => {
    let locstring = ENDPOINT + '/data'
    const options = {
        chart: {
            type: 'spline'
        },
        title: {
            text: 'Sensor Data',
            // align: 'left'
        },
        data: {
            // csvURL: 'https://demo-live-data.highcharts.com/time-data.csv',
            csvURL: locstring,
            enablePolling: true
        },
        style: {
            overflow: 'visible',
          },  
        accessibility: {
            enabled: false
        }
    }


    return(
        <div>
            <HighchartsReact highcharts={Highcharts} options={options} allowChartUpdate = { true } />
        </div>       
    )
}

export default HighChart;