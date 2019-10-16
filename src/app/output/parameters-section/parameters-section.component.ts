import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-parameters-section',
  templateUrl: './parameters-section.component.html',
  styleUrls: ['./parameters-section.component.scss']
})
export class ParametersSectionComponent implements OnInit {
  public keys = Object.keys;
  @Input() parameters: any;

  // displayedColumns: string[] = ['key', 'value'];
  // dataSource = [];

  constructor() { }

  ngOnInit() {
    // this.dataSource = this.keys(this.parameters).map(key => { return {key: key, value: this.parameters[key]}});
  }

}