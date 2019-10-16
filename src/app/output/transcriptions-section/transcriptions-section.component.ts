import { Component, OnInit, Input } from '@angular/core';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { AudioPlayerStatusService } from '../../audio-player/audio-player-status.service';

@Component({
  selector: 'app-transcriptions-section',
  templateUrl: './transcriptions-section.component.html',
  styleUrls: ['./transcriptions-section.component.scss']
})
export class TranscriptionsSectionComponent implements OnInit {
  @Input() transcription: any;
  @Input() timeSeparator: number = 20;

  public items = [];

  constructor(private matIconRegistry: MatIconRegistry,
    public domSanitizer: DomSanitizer, private audioService: AudioPlayerStatusService) {
      this.registerSvgAssets();
     }

  ngOnInit() {
    this.items = this.getTranscriptionItems();
  }

  public playItem(item) {
    this.audioService.$skipAudio.next(item.timeStart);
    this.audioService.$playing.next(true);
  }

  private getTranscriptionItems() {
    const transcriptionItems = [];
    let item;
    let text = '';
    for (const key in this.transcription) {
      if (this.transcription.hasOwnProperty(key)) {
        const element = this.transcription[key];
        if (element['End'] <= this.timeSeparator * (transcriptionItems.length + 1) * 1000) {
          text = text.concat(element['Text'] + ' ');
        } else {
          const timeEnd = this.timeSeparator * (transcriptionItems.length + 1);
          item = {
            text: text,
            timeStart: Math.max(0, timeEnd - this.timeSeparator),
            timeEnd: timeEnd
          }
          transcriptionItems.push(item);
          text = '';
          item = {};
        }
      }
    }

    return transcriptionItems.filter(item => item.text.length);
  }

  private registerSvgAssets() {
    this.matIconRegistry.addSvgIcon(
      'play-icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../../assets/highlights/play.svg')
    );

    this.matIconRegistry.addSvgIcon(
      'pause-icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../../assets/highlights/pause.svg')
    );
  }
}