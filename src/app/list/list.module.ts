import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu';

import { ListComponent } from './list.component';
import { ChipModule } from '../chip/chip.module'; 

@NgModule({
  imports: [
    FormsModule, CommonModule, MatListModule, MatInputModule, MatCheckboxModule, MatIconModule, NoopAnimationsModule, MatButtonModule,
    MatMenuModule, ChipModule
  ],
  declarations: [ ListComponent ],
  exports: [ ListComponent ]
})
export class ListModule { }