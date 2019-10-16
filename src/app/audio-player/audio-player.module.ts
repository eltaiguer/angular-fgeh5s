import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AudioPlayerComponent } from './audio-player.component';
import { AudioCommentDialogComponent } from './audio-comment-dialog/audio-comment-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { AudioPlayerStatusService } from './audio-player-status.service';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatButtonToggleModule,
    MatSliderModule,
    FormsModule
  ],
  declarations: [AudioPlayerComponent, AudioCommentDialogComponent],
  exports: [AudioPlayerComponent],
  providers: [AudioPlayerStatusService, AudioPlayerStatusService]
})
export class AudioPlayerModule { }