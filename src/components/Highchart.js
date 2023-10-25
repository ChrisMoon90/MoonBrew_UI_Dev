import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import highchartsData from 'highcharts/modules/data.js'
import { ENDPOINT } from '../App'

require("highcharts/modules/exporting")(Highcharts)

highchartsData(Highcharts);

const HighChart = (props) => {

    const [title, setTitle] = useState('')
    const [display, setDisplay] = useState('')
    const [series, setSeries] = useState('')
    const [y_axis, setYAxis] = useState('')

    useEffect(() => { 

        let cache = props.cache
        let d0 = {1: false, 2: false, 3: false, 4: false, 5: false, 6: false}
        let n0 = {1: 'Sensor blah', 2: 'Sensor 2', 3: 'Sensor 3', 4: 'Sensor 4', 5: 'Sensor 5', 6: 'Sensor 6'}
        let s0 = []
        let y0 = []
        let t0 = {'Temp': false, 'SG': false, 'pH': false}

        try {
            var mode = cache['SYSTEM']['Static']['Mode'] 
            if (mode === 'Ferment') {
                setTitle('Fermentation')
                let s = cache['VESSELS']['Fermenter']['Sensors']
                for (let k in s) {
                    d0[s[k]['index'] + 1] = true
                    n0[s[k]['index'] + 1] = s[k]['name']
                    let type = cache['SENSORS'][s[k]['index']]['dev_name']

                    // TEMPERATURE SETTINGS
                    if(type.split(' ')[0] === 'Temp') {
                        let s_add = {
                            name: s[k]['name'],
                            yAxis: 0,
                            tooltip: {
                                valueSuffix: ' °F'
                                }  
                            }
                        s0.push(s_add)  
                        let y_add = {
                            labels: {
                                format: '{value}°F',
                                style: {
                                    color: Highcharts.getOptions().colors[1]
                                }
                            },
                            title: {
                                text: 'Temperature',
                                style: {
                                    color: Highcharts.getOptions().colors[1]
                                }
                            }
                        }
                        if (t0['Temp'] === false) {
                            y0.push(y_add)
                            t0['Temp'] = true
                        }

                    // SPECIFIC GRAVITY SETTINGS
                    } else if (type.split(' ')[0] === 'SG') { 
                        let s_add = {
                            name: s[k]['name'],
                            yAxis: 1,
                            tooltip: {
                                valueSuffix: ' SG'
                                }  
                            }
                        s0.push(s_add)

                        let y_add =  {
                            labels: {
                                format: '{value} SG',
                                style: {
                                    color: Highcharts.getOptions().colors[1]
                                }
                            },
                            title: {
                                text: 'Specific Gravity',
                                style: {
                                    color: Highcharts.getOptions().colors[1]
                                }
                            }
                        }
                        if (t0['SG'] === false) {
                            y0.push(y_add)
                            t0['SG'] = true
                        }               

                    // PH SETTINGS
                    } else { 
                        let s_add = {
                            name: s[k]['name'],
                            yAxis: 2,
                            tooltip: {
                                valueSuffix: ' pH'
                                }  
                            }
                        s0.push(s_add) 
                        
                        let y_add =  {
                            labels: {
                                format: '{value} pH',
                                style: {
                                    color: Highcharts.getOptions().colors[1]
                                }
                            },
                            title: {
                                text: 'pH',
                                style: {
                                    color: Highcharts.getOptions().colors[1]
                                }
                            }
                        }
                        if (t0['pH'] === false) {
                            y0.push(y_add)
                            t0['pH'] = true
                        }
                    }
                }
                setDisplay(d0)
                setSeries(s0)
                setYAxis(y0)
            }
            else if (mode === 'Brew') {
                setTitle('Brewing')
            }     
            else {
                setTitle('Smoker')
            }
        } catch(err){} 
        return () => {}    
    }, [props.cache])

    let locstring = ENDPOINT + '/data'


    // BUILD OPTIONS TREE FOR CHART
    const options = {
        
        chart: {
            type: 'spline'
        },

        title: {
            text: title + ' Data',
        },

        yAxis: y_axis,

        data: {
            // csvURL: 'https://demo-live-data.highcharts.com/time-data.csv',
            csvURL: locstring,
            parsed: function(columns) {
                var i = 1
                try {
                for (let k in display) {
                    if (display[k] === false) {
                        columns.splice(i, 1)
                    } else {
                        i +=1
                    }
                }
                } catch {}
            },
            enablePolling: true
        },

        series: series,

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