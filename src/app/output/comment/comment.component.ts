import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AudioPlayerStatusService } from '../../audio-player/audio-player-status.service';
@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  public comment: string;
  @Output() commentAdded = new EventEmitter<any>();
  
  constructor(private audioStatus: AudioPlayerStatusService) { }

  ngOnInit() {
  }

  addComment() {
    if (this.comment && this.comment.trim().length) {
      const timestamp = this.audioStatus.$currentTime.getValue() * 1000;
      alert(`Comment: ${this.comment}\nTimestamp: ${timestamp}`);
      this.commentAdded.emit({ text: this.comment, timestamp: timestamp});
      this.comment = null;
    }
  }
}