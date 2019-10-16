import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AudioPlayerModule } from '../audio-player/audio-player.module';
import { OutputComponent } from './output.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { TranscriptionsSectionComponent } from './transcriptions-section/transcriptions-section.component';
import { ItemsSectionComponent } from './items-section/items-section.component';
import { ParametersSectionComponent } from './parameters-section/parameters-section.component';
import { ChipModule } from '../chip/chip.module'; 
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { HighlightChipComponent } from './highlight-chip/highlight-chip.component';
import { CardItemComponent } from './card-item/card-item.component';
import { CommentComponent } from './comment/comment.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { RulesSectionComponent } from './rules-section/rules-section.component';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  imports: [
    CommonModule,
    AudioPlayerModule,
    MatButtonToggleModule,
    MatIconModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatTabsModule,
    ChipModule,
    MatProgressBarModule,
    MatInputModule,
    FormsModule,
    MatTableModule,
    MatTooltipModule
  ],
  declarations: [OutputComponent, TranscriptionsSectionComponent, ItemsSectionComponent, ParametersSectionComponent, HighlightChipComponent, CardItemComponent, CommentComponent, RulesSectionComponent],
  exports: [OutputComponent]
})
export class OutputModule { }