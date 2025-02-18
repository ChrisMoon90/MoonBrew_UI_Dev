import React, {useEffect, useState} from 'react';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import highchartsData from 'highcharts/modules/data.js'
import { ENDPOINT, socket } from '../App'

require("highcharts/modules/exporting")(Highcharts)

highchartsData(Highcharts);

const HighChart = (props) => {

    console.log("HighCharts Render")

    let cache = props.cache
    let locstring
    let size = props.size
    let title
    let names
    let types
    let series
    let y_axis

    // const [locstring, setLocString] = useState('')
    const [update, setUpdate] = useState(0)

    useEffect(() => {

        // let isMounted = true
        // if (isMounted) {
        
            socket.on("sensor_log_update",  msg => {
                setUpdate(update => update + 1)
                console.log('Sensor Log Update: ', update)
            })
        // }
        return () => { 
            // isMounted = false
            socket.off("sensor_log_update")
        }

    }, [cache, update]);


    let title0 = ''
    let n0 = {1: null, 2: null, 3: null, 4: null, 5: null, 6: null}
    let t0 = {1: null, 2: null, 3: null, 4: null, 5: null, 6: null}
    let ty0 = [] // List of active y-axes
    let s0 = [] // List of data series
    let y0 = [] // List of added y-axis info

    // SET UP CHART SETTINGS
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
                    
                    if (ty0.indexOf('Temp') === -1) {
                        ty0.push('Temp')
                        let opp
                        if (ty0.indexOf('Temp') === 0) {opp = false} else {opp = true}
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
                            },
                            opposite: opp
                        }
                        y0.push(y_add)
                    }

                    let s_add = {
                        name: n0[i],
                        yAxis: ty0.indexOf('Temp'), 
                        tooltip: {
                            valueSuffix: ' °F'
                            }  
                        }
                    s0.push(s_add)  



                // SPECIFIC GRAVITY SETTINGS
                } else if (t0[i] === 'SG') { 

                    if (ty0.indexOf('SG') === -1) {
                        ty0.push('SG')
                        let opp
                        if (ty0.indexOf('SG') === 0) {opp = false} else {opp = true}
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
                            opposite: opp
                        }
                        y0.push(y_add)
                        
                    } 

                    let s_add = {
                        name: n0[i],
                        yAxis: ty0.indexOf('SG'),
                        tooltip: {
                            valueSuffix: ' SG'
                            }  
                        }
                    s0.push(s_add)

            

                // PH SETTINGS
                } else { 

                    if (ty0.indexOf('pH') === -1) {
                        ty0.push('pH')
                        let opp
                        if (ty0.indexOf('pH') === 0) {opp = false} else {opp = true}
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
                            opposite: opp
                        }
                        y0.push(y_add)
                    }

                    let s_add = {
                        name: n0[i],
                        yAxis: ty0.indexOf('pH'),
                        tooltip: {
                            valueSuffix: ' pH'
                            }  
                        }
                    s0.push(s_add) 
                }
            }
        }
    }
            
    // MAIN CHART RENDERING SCRIPT
    try {
        locstring = ENDPOINT + '/api/sensors'

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

        title = title0
        types = t0
        names = n0
        series = s0
        y_axis = y0

    } catch(err){ } //console.log(err)} 

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
            enablePolling: false
        },

        series: series,

        exporting: {
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
            <HighchartsReact highcharts={Highcharts} options={options} allowChartUpdate = {true} /> 
        </div>       
    )
}

export default HighChart;