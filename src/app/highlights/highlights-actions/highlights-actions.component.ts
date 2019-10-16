import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { StateService } from '../state.service';

@Component({
  selector: 'app-highlights-actions',
  templateUrl: './highlights-actions.component.html',
  styleUrls: ['./highlights-actions.component.scss']
})
export class HighlightsActionsComponent implements OnInit {
  @Input() audioFile: string;
  @Input() hasComments: boolean;
  @Output() toggleAudioPlayer = new EventEmitter<boolean>();
  @Output() toggleComments = new EventEmitter<boolean>();

  public showAudioPlayer: boolean;
  public showComments: boolean;
  public hasUndo = false;
  public hasRedo = false;

  constructor(private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer, private stateService: StateService) {
      this.registerSvgAssets();

      this.stateService.$highlightsStack.subscribe(elem => {
        this.hasUndo = this.stateService.hasUndo();
        this.hasRedo = this.stateService.hasRedo();
      })
  }

  ngOnInit() {
    this.showAudioPlayer = !!this.audioFile;
  }

  toggleAudioPlayerChange(value) {
    this.showAudioPlayer = value;
    if (!this.showAudioPlayer && this.showComments) {
      this.toggleCommentsChange(false);
    }
    this.toggleAudioPlayer.emit(value);
  }

  toggleCommentsChange(value) {
    this.showComments = (value != null && typeof value !== 'undefined') ? value : !this.showComments;
    this.toggleComments.emit(this.showComments);
  }

  undo() {
    this.stateService.undo();
  }

  redo() {
    this.stateService.redo();
  }

  private registerSvgAssets() {
    this.matIconRegistry.addSvgIcon(
      'undo-icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/highlights/undo.svg')
    );

    this.matIconRegistry.addSvgIcon(
      'redo-icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/highlights/undo.svg')
    );

    this.matIconRegistry.addSvgIcon(
      'speech-icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/highlights/speech.svg')
    );
  }

}