import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpService } from '../http.service';
import { ToastrService } from 'ngx-toastr';

export interface JsonData {
  SumHourly: number;
  dom: number;
  dow: number;
  hour: number;
  insid: string;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  // Table property declarations.
  displayedColumns: string[] = ['dom', 'dow', 'insid', 'hour', 'SumHourly'];
  dataSource: MatTableDataSource<JsonData>;
  fetchedData: any;

  // data imports.
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(public httpService: HttpService, private toastr: ToastrService) { }

  ngOnInit() { this.getLocalJson() }

  async getLocalJson() {
    const jsonData = await this.httpService.getJsonFile()
    this.fetchedData = await jsonData
    this.dataSource = await new MatTableDataSource(this.fetchedData);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    if (this.fetchedData) this.toastr.success('Fetched json data successfully.', '');
    else this.toastr.error('Failed to fetch the json data.', '')
  }

}
