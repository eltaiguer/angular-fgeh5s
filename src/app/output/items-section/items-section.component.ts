import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-items-section',
  templateUrl: './items-section.component.html',
  styleUrls: ['./items-section.component.scss']
})
export class ItemsSectionComponent implements OnInit {
  public keys = Object.keys;
  
  @Input() items = [];

  constructor() { }

  ngOnInit() {
  }

  getColorClass(value: number) {
    if (value < 40) {
      return 'red-progress';
    } else if (value >= 40 && value < 60) {
      return 'yellow-progress';
    } else {
      return 'green-progress';
    }
  }

  getAccuracy(value) {
    return Math.round(value * 100);
  }

}