import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-highlight-chip',
  templateUrl: './highlight-chip.component.html',
  styleUrls: ['./highlight-chip.component.scss']
})
export class HighlightChipComponent implements OnInit {
  @Input() color: string;

  constructor() { }

  ngOnInit() {
  }

}