import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as __Highcharts from 'highcharts';
import { HttpService } from '../http.service';
import { LineChartOptions } from '../shared/line-graph.model';
import { BarChartOptions } from '../shared/bar-chart.model';
import { AreaChartOptions } from '../shared/area-chart.model';
import { PieChartOptions } from '../shared/pie-chart.model';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit {

  // General property declarations.
  chartTypes: any = ['Line Chart', 'Bar Chart', 'Area Chart', 'Pie Chart']
  isSelected = 0;
  fetchedData: any = [];

  // Graph's properyt declarations.
  lineChart = __Highcharts;
  barChart = __Highcharts;
  areaChart = __Highcharts;
  pieChart = __Highcharts;
  updatedLineChartOptions = {
    lineChartOptions: {}
  };
  updatedBarChartOptions = {
    barChartOptions: {}
  };
  updatedAreaChartOptions = {
    areaChartOptions: {}
  };
  updatedPieChartOptions = {
    pieChartOptions: {}
  };
  lineChartOptions = new LineChartOptions();
  barChartOptions = new BarChartOptions();
  areaChartOptions = new AreaChartOptions();
  pieChartOptions = new PieChartOptions();

  constructor(public router: Router, private httpService: HttpService) { }

  ngOnInit() { this.getLocalJsonData() }

  dispalyChartType(view, index) { this.isSelected = index }

  async getLocalJsonData() {
    let domObj = { name: 'dom', data: [] }
    let dowObj = { name: 'dow', data: [] }
    let hourObj = { name: 'hour', data: [] }
    let sumHourObj = { name: 'SumHourly', data: [] }
    const jsonData = await this.httpService.getJsonFile()
    this.fetchedData = jsonData
    await this.fetchedData.map(ele => domObj.data.push(ele.dom))
    await this.fetchedData.map(ele => dowObj.data.push(ele.dow))
    await this.fetchedData.map(ele => hourObj.data.push(ele.hour))
    await this.fetchedData.map(ele => sumHourObj.data.push(ele.SumHourly))

    await this.lineChartOptions.lineChartOptions.series.push(domObj, dowObj, hourObj, sumHourObj)
    this.updatedLineChartOptions.lineChartOptions = await Object.assign({}, this.lineChartOptions.lineChartOptions)

    await this.barChartOptions.barChartOptions.series.push(domObj, dowObj, hourObj, sumHourObj)
    this.updatedBarChartOptions.barChartOptions = await Object.assign({}, this.barChartOptions.barChartOptions)

    await this.areaChartOptions.areaChartOptions.series.push(domObj, dowObj, hourObj, sumHourObj)
    this.updatedAreaChartOptions.areaChartOptions = await Object.assign({}, this.areaChartOptions.areaChartOptions)

    this.displayPieChart()
  }

  displayPieChart() {
    this.pieChartOptions.pieChartOptions.series[0].data = []
    let domObj = { name: 'dom', y: this.fetchedData[0].dom, sliced: true, selected: true }
    let dowObj = { name: 'dow', y: this.fetchedData[0].dow }
    let hourObj = { name: 'hour', y: this.fetchedData[0].hour }
    let sumHourObj = { name: 'SumHourly', y: this.fetchedData[0].SumHourly }
    this.pieChartOptions.pieChartOptions.series[0].data.push(domObj, dowObj, hourObj, sumHourObj)
    this.updatedPieChartOptions.pieChartOptions = Object.assign({}, this.pieChartOptions.pieChartOptions)
  }

  displayChart(type: string) {
    let displayFlag = false
    if ((this.isSelected === 0) && (type === 'lineChart')) displayFlag = true;
    else if ((this.isSelected === 1) && (type === 'barChart')) displayFlag = true;
    else if ((this.isSelected === 2) && (type === 'areaChart')) displayFlag = true;
    else if ((this.isSelected === 3) && (type === 'pieChart')) displayFlag = true;
    return displayFlag
  }

}
