import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-rules-section',
  templateUrl: './rules-section.component.html',
  styleUrls: ['./rules-section.component.scss']
})
export class RulesSectionComponent implements OnInit {
  @Input() rules: any;
  public keys = Object.keys;

  // displayedColumns: string[] = ['rule', 'result'];
  // dataSource = [];

  constructor() { }

  ngOnInit() {
    // this.dataSource = this.keys(this.rules).map(key => { return {rule: this.rules[key].rule_code, result: this.rules[key].result}});
  }

  getBackgroundColor(value) {
    return this.toBoolean(value) ? '#C2F3E9' : '#fe60932b';
  }

  getColor(value) {
    return this.toBoolean(value) ? '#37A38D' : '#FE6093';
  }

  private toBoolean(value: string) {
    return value.toLowerCase() === 'true';
  }

}