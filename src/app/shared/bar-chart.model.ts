import { Injectable } from '@angular/core';

@Injectable()
export class BarChartOptions {

    barChartOptions: any = {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Bar chart for dom, dow, hour and sum hourly.'
        },
        xAxis: {},
        credits: {
            enabled: false
        },
        series: []
    }

    constructor() { }
}