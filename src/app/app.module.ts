import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { TableComponent } from './table/table.component';
import { CdkTableModule } from '@angular/cdk/table';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';

import { ListModule } from './list/list.module';
import { HighlightsModule } from './highlights/highlights.module';
import { OutputComponent } from './output/output.component';
import { OutputModule } from './output/output.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports:      [ HttpClientModule, BrowserModule, BrowserAnimationsModule, FormsModule, 
    CdkTableModule, MatProgressBarModule, MatSelectModule, ListModule, HighlightsModule, OutputModule ],
  declarations: [ AppComponent, TableComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
