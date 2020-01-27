import { Component, OnInit, ViewChild } from '@angular/core';

import { LazyLoadEvent, DataTable } from 'primeng/primeng';

import { CarService } from './app.service'
import { Car } from './car.model'

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit {
    @ViewChild('dt') public dataTable: DataTable;
    
    public cars: Car[];
    public datasource: Car[];
    public totalRecords: number;
    public loading: boolean;
    public selectedColumns: any[];
    public cols: any[];
    public colors: any[];
    public brands: any[];
    public columnOptions: any[];
    private colsTempor: any[] = [];
    
    constructor(private carService: CarService) {}

    public ngOnInit() {
      this.cols = [
        { field: 'vin', header: 'Vin', index: 1 },
        { field: 'year', header: 'Year', index: 2 },
        { field: 'brand', header: 'Brand', index: 3 },
        { field: 'color', header: 'Color', index: 4 }
      ];

      this.brands = [
        { label: 'All Brands', value: null },
        { label: 'Audi', value: 'Audi' },
        { label: 'BMW', value: 'BMW' },
        { label: 'Fiat', value: 'Fiat' },
        { label: 'Honda', value: 'Honda' },
        { label: 'Jaguar', value: 'Jaguar' },
        { label: 'Mercedes', value: 'Mercedes' },
        { label: 'Renault', value: 'Renault' },
        { label: 'VW', value: 'VW' },
        { label: 'Volvo', value: 'Volvo' }
      ];

      this.colors = [
        { label: 'White', value: 'White' },
        { label: 'Green', value: 'Green' },
        { label: 'Silver', value: 'Silver' },
        { label: 'Black', value: 'Black' },
        { label: 'Red', value: 'Red' },
        { label: 'Maroon', value: 'Maroon' },
        { label: 'Brown', value: 'Brown' },
        { label: 'Orange', value: 'Orange' },
        { label: 'Blue', value: 'Blue' }
      ];
      // this.selectedColumns = this.cols;
      this.columnOptions = [];
      this.selectedColumns = [];
      for (let i = 0; i < this.cols.length; i++) {
        this.columnOptions.push({label: this.cols[i].header, value: this.cols[i]});
      }
      this.loading = true;
      setTimeout(() => {
      this.carService.getCars().subscribe(cars => {
        this.datasource = cars.data;
        this.totalRecords = this.datasource.length;
        this.cars = this.datasource.slice(0, 27);  
        this.loading = false;
        console.log(this.dataTable)
      });
      }, 500);
    }
  

    public selectionItemForFilter(e) {
    const colsTempor = e.value;
    colsTempor.sort(function (a, b) {
      return a.index - b.index;
    });
    this.cols = [];
    this.cols = colsTempor;
    if (e.value.length > 10) {
      e.value.pop();
    }
  }


    public loadCarsLazy(event: LazyLoadEvent) {
      // console.log(event.first, this.historicFirstPage, event.first >= this.historicFirstPage)
      this.loading = true;
        setTimeout(() => {
          if (this.datasource) { 
            this.cars = this.datasource.slice(event.first, (event.first + event.rows));
            console.log(
              event.first,
              event.rows,
              event.first + event.rows
          );
            this.loading = false;
          }
        }, 1000);
    }
}
