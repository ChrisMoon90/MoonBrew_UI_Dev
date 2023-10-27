import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import highchartsData from 'highcharts/modules/data.js'
import { ENDPOINT } from '../App'

require("highcharts/modules/exporting")(Highcharts)

highchartsData(Highcharts);

const HighChart = (props) => {

    let locstring = ENDPOINT + '/data'
    let cache = props.cache
    let size = props.size
    const [title, setTitle] = useState('')
    const [names, setNames] = useState('')
    const [types, setTypes] = useState('')
    const [series, setSeries] = useState('')
    const [y_axis, setYAxis] = useState('')
    

    useEffect(() => { 

        let title0 = ''
        let n0 = {1: null, 2: null, 3: null, 4: null, 5: null, 6: null}
        let t0 = {1: null, 2: null, 3: null, 4: null, 5: null, 6: null}
        let ty0 = {'Temp': false, 'SG': false, 'pH': false}
        let s0 = []
        let y0 = []


        function ChartSettings(vessels) {

            for (let x in vessels) {
                let sensors = cache['VESSELS'][vessels[x]]['Sensors']
                for (let k in sensors) {
                    let index = parseInt(sensors[k]['index'])
                    n0[index + 1] = sensors[k]['name']
                    t0[index + 1] = cache['SENSORS'][index]['dev_name'].split(' ')[0]
                }
            }

            for (let i in t0) {
                if (t0[i] != null) {

                    // TEMPERATURE SETTINGS
                    if(t0[i] === 'Temp') {
                        let s_add = {
                            name: n0[i],
                            yAxis: 0,
                            tooltip: {
                                valueSuffix: ' °F'
                                }  
                            }
                        s0.push(s_add)  

                        if (ty0['Temp'] === false) {
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
                            y0.push(y_add)
                            ty0['Temp'] = true
                        }

                    // SPECIFIC GRAVITY SETTINGS
                    } else if (t0[i] === 'SG') { 
                        let s_add = {
                            name: n0[i],
                            yAxis: 1,
                            tooltip: {
                                valueSuffix: ' SG'
                                }  
                            }
                        s0.push(s_add)

                        if (ty0['SG'] === false) {
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
                                },
                                opposite: true
                            }
                            y0.push(y_add)
                            ty0['SG'] = true
                        }               

                    // PH SETTINGS
                    } else { 
                        let s_add = {
                            name: n0[i],
                            yAxis: 2,
                            tooltip: {
                                valueSuffix: ' pH'
                                }  
                            }
                        s0.push(s_add) 
                        
                        if (ty0['pH'] === false) {
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
                                },
                                opposite: true
                            }
                            y0.push(y_add)
                            ty0['pH'] = true
                        }
                    }
                }
            }
        }
        

        // MAIN CHART RENDERING SCRIPT
        try {
            var mode = cache['SYSTEM']['Static']['Mode'] 

            if (mode === 'Ferment') {
                title0 = 'Fermentation'
                ChartSettings(['Fermenter'])
            }
            else if (mode === 'Brew') {
                title0 = 'Brew'
                ChartSettings(['Boil_Kettle', 'Mash_Tun', 'Hot_Liquor_Tank'])
            }     
            else {
                title0 = 'Smoker'
                ChartSettings(['Smoker'])
            }
            setTitle(title0)
            setTypes(t0)
            setNames(n0)
            setSeries(s0)
            setYAxis(y0)
        } catch(err){} //console.log(err)} 

        return () => {}    
    }, [cache])


    // BUILD OPTIONS TREE FOR CHART
    const options = {
    
        chart: {
            type: 'spline',
            height: size
        },

        title: {
            text: title + ' Data',
            style: {
                // fontWeight: 'bold',
                fontSize: '22'
            }
        },

        xAxis: {
            gridLineWidth: 1
        },

        yAxis: y_axis,

        data: {
            // csvURL: 'https://demo-live-data.highcharts.com/time-data.csv',
            csvURL: locstring,
            parsed: function(columns) {
                var i = 1
                try {
                for (let k in types) {
                    if (types[k] === null) {
                        columns.splice(i, 1)
                    } else {
                        columns[i][0] = names[k]
                        i +=1
                    }
                }
                } catch {}
            },     
            enablePolling: true
        },

        series: series,

        exporting: {
            // width: 2000,
            sourceWidth: 2000,
            sourceHeight: 1000,
            },

        responsive: {
            rules: [{
                condition: {
                    maxWidth: 750
                },
                chartOptions: {
                    chart: {
                        height: '60%'
                    }
                }
            }]
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