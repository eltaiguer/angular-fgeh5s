import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, Input, Renderer2, QueryList, ViewChildren,
  HostListener, Output, EventEmitter } from '@angular/core';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { AudioPlayerStatusService } from './audio-player-status.service';

const AUDIO_SKIP = 2;

@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.scss']
})

export class AudioPlayerComponent implements OnInit, AfterViewInit {
  @ViewChild('audioElem', {static: false}) audioElem: ElementRef;
  @ViewChildren('commentDialog', { read: ElementRef }) commentElems: QueryList<ElementRef>;
  
  @Input() comments: any[];
  @Input() showComments: boolean;
  @Input() audioFile: string;
  @Input() zoomControl: boolean;
  // @Output() zoomChange = new EventEmitter<any>();

  public currentTime: number = 0;
  public duration: number = 0;
  public visibleComments = {};
  public zoomValue = 0;

  constructor(private matIconRegistry: MatIconRegistry,
    public domSanitizer: DomSanitizer, private renderer: Renderer2,
    private audioStatus: AudioPlayerStatusService) {
      this.registerSvgAssets();

      this.audioStatus.$skipAudio.subscribe(time => {
        if (time >= 0){
          this.updateAudioPosition(time);
        }
      })

      this.audioStatus.$playing.subscribe(play => this.playPauseAudio(play));

      this.audioStatus.$zoom.subscribe(zoom => this.zoomValue = zoom);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.handleWindowResizePosition();
  }

  ngOnInit() { }

  ngOnChanges(changes) {
    if (changes.showComments && !changes.showComments.currentValue) {
      this.visibleComments = null;
    }
  }

  ngAfterViewInit() {
    this.initAudioBindings();
  }

  togglePlayback() {
    const audio = this.audioElem.nativeElement;
    this.audioStatus.$playing.next(audio.paused);
  }

  playPauseAudio(play = null) {
    if (this.audioElem) {
      const audio = this.audioElem.nativeElement;
      play ? audio.play() : audio.pause();
    }
  }

  getMarkerPosition(comment) {
    if (this.audioElem) {
      const audio = this.audioElem.nativeElement;
      return (comment.timestamp / 10) / audio.duration;
    }
  }

  isCommentVisible(comment) {
    return this.visibleComments == comment;
  }

  toggleComment(comment) {

    if (this.visibleComments == null || this.visibleComments && this.visibleComments !== comment) {
      this.visibleComments = comment;
    } else {
      this.visibleComments = null;
    }

    if (this.visibleComments) {
      setTimeout(() => {
        const commentElem: ElementRef = this.commentElems.find(elem => elem.nativeElement.parentElement.classList.contains('showing-comment'));
        this.renderer.removeClass(commentElem.nativeElement, 'show-comment');
        this.renderer.removeClass(commentElem.nativeElement, 'left-comment');
        this.renderer.removeClass(commentElem.nativeElement, 'bottom-comment');

        if (document.body.scrollWidth > document.body.clientWidth) {
          this.getCommentPosition(commentElem.nativeElement);
        }
        
        this.renderer.addClass(commentElem.nativeElement, 'show-comment');
      });
    } else {
      setTimeout(() => {
        const commentElem: ElementRef = this.commentElems.find(elem => elem.nativeElement.classList.contains('show-comment'));
        if (commentElem) {
          this.renderer.removeClass(commentElem.nativeElement, 'show-comment');
        }
      });
    }
  }
  
  onZoomChanged(event) {
    // this.zoomChange.emit(event.value);
    this.audioStatus.$zoom.next(event.value);
  }

  private handleWindowResizePosition() {
    if (this.visibleComments) {
      const commentElem: ElementRef = this.commentElems.find(elem => elem.nativeElement.parentElement.classList.contains('showing-comment'));
      if (commentElem) {
        this.renderer.removeClass(commentElem.nativeElement, 'left-comment');
        this.renderer.removeClass(commentElem.nativeElement, 'bottom-comment');
        this.getCommentPosition(commentElem.nativeElement);
      }
    }
  }

  private checkLeftPositionOverflow(commentElem) {
    const parentOffsetLeft = commentElem.nativeElement.parentElement.offsetLeft;
    const commentOffsetLeft = commentElem.nativeElement.offsetLeft;

    if (commentOffsetLeft < parentOffsetLeft) {
      return commentOffsetLeft + parentOffsetLeft < 0;
    } else {
      return false;
    }
  }

  forwardAudio() {
    const audio = this.audioElem.nativeElement;
    const skip = Math.min(audio.currentTime + AUDIO_SKIP, audio.duration);
    // this.updateAudioPosition(skip);
    this.audioStatus.$skipAudio.next(skip);
  }

  rewindAudio() {
    const audio = this.audioElem.nativeElement;
    const skip = Math.max(audio.currentTime - AUDIO_SKIP, 0);
    // this.updateAudioPosition(skip);
    this.audioStatus.$skipAudio.next(skip);
  }

  private getCommentPosition(comment) {
    if (comment.parentElement.offsetLeft + comment.offsetWidth > document.body.offsetWidth) {
      // check if element can be moved to the left
      if (comment.parentElement.offsetLeft > comment.offsetWidth) {
        this.renderer.addClass(comment, 'left-comment');
      } else {
        this.renderer.addClass(comment, 'bottom-comment');
      }
    }
  }

  private getResponsivePosition(comment) {
    if (document.body.offsetWidth <= 450) {
      return 50 - this.getMarkerPosition(comment);
    }
  }

  private initAudioBindings() {
    const audio = this.audioElem.nativeElement;

    audio.addEventListener('timeupdate', currentTime => {
      const time = audio.currentTime;
      this.currentTime = time;
      this.audioStatus.$currentTime.next(time);
    });

    audio.addEventListener('durationchange', duration => {
      this.duration = audio.duration;
    });
  }

  private registerSvgAssets() {
    this.matIconRegistry.addSvgIcon(
      'back-icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/highlights/back.svg')
    );

    this.matIconRegistry.addSvgIcon(
      'forward-icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/highlights/forward.svg')
    );

    this.matIconRegistry.addSvgIcon(
      'play-icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/highlights/play.svg')
    );

    this.matIconRegistry.addSvgIcon(
      'pause-icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/highlights/pause.svg')
    );
  }

  private progressClicked(event) {
    // this.updateAudioPosition((event.x / event.target.offsetWidth) * this.getAudioDuration());
    this.audioStatus.$skipAudio.next((event.x / event.target.offsetWidth) * this.getAudioDuration());
  }

  private getAudioDuration() {
    const audio = this.audioElem.nativeElement;
    return audio.duration;
  }

  private updateAudioPosition(time) {
    const audio = this.audioElem.nativeElement;
    audio.currentTime = time;
  }
}