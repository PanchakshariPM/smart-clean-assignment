import { Injectable } from '@angular/core';

@Injectable()
export class LineChartOptions {

    lineChartOptions: any = {
        title: {
            text: 'Line chart for dom, dow, hour and sum hourly.'
        },
        subtitle: {
            text: 'Source: smart-clean.com'
        },
        yAxis: {
            title: {
                text: 'Number of types'
            }
        },
        xAxis: {
            accessibility: {
                rangeDescription: 'Range: 3000 to 5010'
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
        },
        plotOptions: {
            series: {
                label: {
                    connectorAllowed: false
                },
                pointStart: 300
            }
        },
        series: [],
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        }
    }

    constructor() { }
}