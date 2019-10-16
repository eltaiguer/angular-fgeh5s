import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'app-audio-comment-dialog',
  templateUrl: './audio-comment-dialog.component.html',
  styleUrls: ['./audio-comment-dialog.component.scss']
})
export class AudioCommentDialogComponent implements OnInit {
  @Input() comment: any;
  @Output() toggleComment = new EventEmitter<any>();

  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
    this.registerSvgAssets();
   }

  ngOnInit() {
  }

  closeDialog() {
    this.toggleComment.emit();
  }

  private registerSvgAssets() {
    this.matIconRegistry.addSvgIcon(
      'cross-icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/highlights/comment-cross.svg')
    );
  }

}