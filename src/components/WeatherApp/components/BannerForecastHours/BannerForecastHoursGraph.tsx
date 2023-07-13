import ChartDataLabels from 'chartjs-plugin-datalabels'
import { colors } from '../../assets/styles/Common.styles'

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Filler
} from 'chart.js'
  
ChartJS.register(
    ChartDataLabels,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Filler
);
  
export const optionsGraphTemp = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
        overflow: 'visible',
        padding: {
            top: 30,
            left: 10,
            right: 10
        }
    },
    elements: {
        point:{
            radius: 0
        }
    },
    scales: {
        x: {
          grid: {
            display: false
          },
          ticks: {
            display: false
          },
        },
        y: {
          grid: {
            display: false
          },
          ticks: {
            display: false
          },
        },
    },
    plugins: {
        datalabels: {
            align: "top",
            color: 'grey',
            offset: 2,
            font: {
                size: 16,
                weight: 600
            },
        },
    },
}
  
const labels = ['hour1', 'hour2', 'hour3', 'hour4', 'hour5', 'hour6', 'hour7', 'hour8']

  
export const setGraphData = (array: any, graphType: string) => { 
    let borderColor
    let backgroundColor

    if (graphType === "temp") {
        borderColor = colors.temp
        backgroundColor = colors.tempLight

    } else if (graphType === "rain") {
        borderColor = colors.rain
        backgroundColor = colors.rainLight 
    } else {
        borderColor = colors.wind
        backgroundColor = colors.windLight
    }
    
    return {
        labels,
        legend: {
            display: false
        },
        plugins: {
            datalabels: {
                display: true,
                color: "black",
                // @ts-ignore
                formatter: function (value, ctx) {
                    return ((value * 100) / 3).toFixed(2) + '%'; 
                },
            }
        },
        datasets: [
            {
                fill: true,
                data: array,
                borderColor: borderColor,
                backgroundColor: backgroundColor,
                lineTension: 0.5,
            }
        ]
    }
}