import { Component, OnInit, Input } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable } from 'rxjs';

// row data to render the TableComponent
// this data is used to mock the inputs the component should have
const ROWS_DATA = [
    {
      code: '#1',
      moduleName: 'Phone + Internet Sales', 
      creationDate: {
        date: '2019/04/18',
        by: 'John Carroll',
        },
      overallAccuracy: '80',
      status: {
        current: 'active',
        values: ['active', 'inactive']
      },
      actions: ['add', 'settings']
    },
    {
      code: '#2',
      moduleName: 'New Product sales test', 
      creationDate: {
        date: '2019/04/18',
        by: 'John Carroll',
        },
      overallAccuracy: '20',
      status: {
        current: 'active',
        values: ['active', 'inactive']
      },
      actions: ['add', 'settings']
    },
    {
      code: '#3',
      moduleName: 'Phone + Internet Sales', 
      creationDate: {
        date: '2019/04/18',
        by: 'John Carroll',
        },
      overallAccuracy: '50',
      status: {
        current: 'inactive',
        values: ['active', 'inactive']
      },
      actions: ['add', 'settings']
    },
    {
      code: '#4',
      moduleName: 'Phone + Internet Sales', 
      creationDate: {
        date: '2019/04/18',
        by: 'John Carroll',
        },
      overallAccuracy: '24',
      status: {
        current: 'active',
        values: ['active', 'inactive']
      },
      actions: ['add', 'settings']
    },
    {
      code: '#5',
      moduleName: 'Phone + Internet Sales', 
      creationDate: {
        date: '2019/04/18',
        by: 'John Carroll',
        },
      overallAccuracy: '50',
      status: {
        current: 'active',
        values: ['active', 'inactive']
      },
      actions: ['add', 'settings']
    },
    {
      code: '#6',
      moduleName: 'New Product sales test', 
      creationDate: {
        date: '2019/04/18',
        by: 'John Carroll',
        },
      overallAccuracy: '19',
      status: {
        current: 'active',
        values: ['active', 'inactive']
      },
      actions: ['add', 'settings']
    },
    {
      code: '#7',
      moduleName: 'New Product sales test', 
      creationDate: {
        date: '2019/04/18',
        by: 'John Carroll',
        },
      overallAccuracy: '90',
      status: {
        current: 'active',
        values: ['active', 'inactive']
      },
      actions: ['add', 'settings']
    },
  ];

  const COLS_DATA = [
    {header: 'Module Name', field: 'moduleName', type: '' },
    {header: 'Code', field: 'code', type: '' },
    {header: 'Creation Date', field: 'creationDate', type: '' },
    {header: 'Overall Accuracy', field: 'overallAccuracy', type: '' },
    {header: 'Status', field: 'status', type: '' },
    {header: 'Actions', field: 'actions', type: '' }
  ];

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})

export class TableComponent implements OnInit {
  @Input() rows: any[];
  @Input() cols: any[];

  dataSource: TableDataSource;
  displayedColumns: string[] = [];

  constructor() { }

  ngOnInit() {
    this.initData();
    this.formatTableData();
    this.dataSource = new TableDataSource(this.rows);
    this.dataSource.loadTableData();
  }

  loadMore() {
    this.dataSource.loadTableData();
  }

  // // helper function to get the accuracy colors based on the values for the label
  // getAccuracyColor(value: number) {
  //   if (value < 40) {
  //     return '#FE6093';
  //   } else if (value >= 40 && value < 60) {
  //     return '#FEAC60';
  //   } else {
  //     return '#59DBC1';
  //   }
  // }

  // helper function to get the accuracy colors based on the values and set the correct class
  getColorClass(value: number) {
    if (value < 40) {
      return 'red-progress';
    } else if (value >= 40 && value < 60) {
      return 'yellow-progress';
    } else {
      return 'green-progress';
    }
  }

  // doing the manual binding between the exernal data and the inputs
  // on a real case sceneario this should be needed
  private initData() {
    this.rows = ROWS_DATA;
    this.cols = COLS_DATA;
  }

  // formatting the table data from the inputs in order to comply with angular material requirements
  private formatTableData() {
    this.cols.forEach(col => this.displayedColumns.push(col.field));
  }

}

// defining the angular material data source
export class TableDataSource extends DataSource<any> {
  /** Stream of data that is provided to the table. */
  data = new BehaviorSubject<any[]>([]);
  hasMore = true;

  private rows: any[];
  private lastPage = 1;
  private pageCount = 2;

  constructor(rows) {
    super();
    this.rows = rows;
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<any[]> {
    return this.data.asObservable();
  }

  disconnect() {}

  loadTableData() {
    if (this.hasMore) {
      this.data.next(this.rows.slice(0, this.lastPage * this.pageCount));
      this.lastPage++;
    }
    this.hasMore = this.rows.length >= this.lastPage * this.pageCount;
  }
}