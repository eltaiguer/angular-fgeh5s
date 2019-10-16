import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-chip',
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.scss']
})
export class ChipComponent implements OnInit {
  @Input() label: string;
  @Input() color: string;
  @Input() backgroundColor: string;
  
  constructor() { }

  ngOnInit() {
  }

}