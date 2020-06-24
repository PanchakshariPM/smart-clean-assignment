import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  // Property declarations.
  dataView: any = ['Tabular View', 'Chart View']
  isSelected = 0;

  constructor(public router: Router) { }

  ngOnInit() {
    if (this.router.url.includes('tabular-view')) this.isSelected = 0;
    else this.isSelected = 1;
  }

  typeOfview(view, index) {
    this.isSelected = index;
    if (index === 1) this.router.navigate(['/home/chart-view']);
    else this.router.navigate(['/home/tabular-view'])
  }

}
