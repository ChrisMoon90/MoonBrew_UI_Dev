import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import highchartsData from 'highcharts/modules/data.js'
import { ENDPOINT } from '../App'

highchartsData(Highcharts);


function HighChart() {
    let locstring = ENDPOINT + '/data'
    let options = {
        chart: {
            type: 'spline'
        },
        title: {
            text: 'Sensor Data'
        },
        data: {
            // csvURL: 'https://demo-live-data.highcharts.com/time-data.csv',
            csvURL: locstring,
            enablePolling: true
        }               
    }

    return(
        <div>
            <HighchartsReact highcharts={Highcharts} options={options} allowChartUpdate = { true } />
        </div>       
    )
}

export default HighChart;