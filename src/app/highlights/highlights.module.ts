import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';

import { HighlightsComponent } from './highlights.component';
import { HighlightsActionsComponent } from './highlights-actions/highlights-actions.component';
import { TextComponent } from './text/text.component';
import { StateService } from './state.service';
import { AudioPlayerModule } from '../audio-player/audio-player.module';

@NgModule({
  imports: [
    CommonModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatIconModule,
    MatButtonToggleModule,
    MatTooltipModule,
    HttpClientModule,
    AudioPlayerModule
  ],
  declarations: [ HighlightsComponent, HighlightsActionsComponent, TextComponent ],
  exports: [ HighlightsComponent ],
  providers: [StateService]
})
export class HighlightsModule { }