import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, NgZone, ChangeDetectorRef, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { AudioPlayerStatusService } from '../audio-player/audio-player-status.service';
import WaveSurfer from 'wavesurfer.js';
import TimelinePlugin from 'wavesurfer.js/dist/plugin/wavesurfer.timeline.min.js';
import RegionsPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.regions.min.js';

@Component({
  selector: 'app-output',
  templateUrl: './output.component.html',
  styleUrls: ['./output.component.scss']
})
export class OutputComponent implements OnInit, AfterViewInit {
  @Input() files: any;
  public keys = Object.keys;

  @ViewChild('waveformContainer', {static: false}) waveContainer: ElementRef;
  @ViewChild('foundItemsContainer', {static: false}) foundItemsContainer: ElementRef;
  public showComments = false;
  public audioSectionExpanded = false;

  public comments = [];
  public audioFile = null;
  public foundItems = null;
  public transcription = null;
  public parameters = null;
  public rules =  null;



  private wavesurfer = null;

  constructor(private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer, private audioPlayerStatus: AudioPlayerStatusService,
    private zone: NgZone, private http: HttpClient, private cdRef: ChangeDetectorRef) {
      this.registerSvgAssets();

      this.audioPlayerStatus.$playing.subscribe(isPlaying => {
        if (this.wavesurfer) {
          if (isPlaying) {
            this.wavesurfer.play();
          } else {
            this.wavesurfer.pause();
          }
        }
      });

      this.audioPlayerStatus.$skipAudio.subscribe(skip => {
        if (this.wavesurfer && skip > -1) {
          this.unsubscribeWavesurferSeek();
          const currentTime = this.wavesurfer.getCurrentTime();
          this.wavesurfer.skip(skip - currentTime);
          this.subscribeWavesurferSeek();
        }
      });
     }

  ngOnInit() {
    this.loadAudioData(this.keys(this.files)[0], true);
  }

  ngAfterViewInit() {
    setTimeout(() => this.initWavesurfer());
  }

  toggleComments(value) {
    this.showComments = !this.showComments;
    if (this.showComments) {
      this.wavesurfer.setHeight(118);
    } else {
      this.wavesurfer.setHeight(250);
    }
  }

  initWavesurfer() {
    const timeoutHandle = setInterval(() => {
      if (!this.wavesurfer) {
        clearTimeout(timeoutHandle);

        this.wavesurfer = WaveSurfer.create({
          container: '#waveform',
          waveColor: '#E1E3E7',
          progressColor: '#677083',
          cursorColor: '#FE6093',
          cursorWidth: 2,
          barWidth: 5,
          barHeight: 3,
          height: 250,
          barGap: 4,
          responsive: true,
          // scrollParent: true,
          plugins: [
           TimelinePlugin.create({
              container: '#wave-timeline',
              timeInterval: 2,
              formatTimeCallback: function(sec, pxPerSec) {
                const minutes = '00' + Math.trunc(sec / 60);
                const seconds = '00' + sec % 60;
                return minutes.slice(minutes.length - 2) + ':' + seconds.slice(seconds.length - 2);
              },
              primaryLabelInterval: function(pxPerSec) {
                return 1;
              }
            }),
            RegionsPlugin.create()
          ]
        });

        this.wavesurfer.load(this.audioFile);
        this.wavesurfer.setMute(true);

        this.wavesurfer.on('ready', () => {
          this.addFoundItemsRegions();
          this.calculateFoundItemsPosition();
          this.subscribeZoomChanges();
        });

        this.trackPlayerScroll();
        this.subscribeWavesurferSeek();
        this.subscribeWaveSurferRegionEvents();       
      }
    }, 500);
  }

  zoomChanged(value) {
    this.wavesurfer.zoom(value);
    this.calculateFoundItemsPosition();
  }

  expand() {
    this.audioSectionExpanded = !this.audioSectionExpanded;
    this.cdRef.detectChanges();
    this.resizeHandler();
  }

  private resizeHandler() {
    setTimeout(() => {
      this.wavesurfer.empty();
      this.wavesurfer.drawBuffer();
      this.audioPlayerStatus.$skipAudio.next(this.audioPlayerStatus.$currentTime.getValue());
    }, 150);
  }



  calculateFoundItemsPosition() {
    if (this.waveContainer && this.waveContainer.nativeElement && this.waveContainer.nativeElement.children.length) {
      this.zone.run(() => {
        for (const key in this.foundItems) {
          if (this.foundItems.hasOwnProperty(key)) {
            const element = this.foundItems[key];
            
            const width = this.waveContainer.nativeElement.children[0].scrollWidth;
            const audioLength = this.wavesurfer.getDuration();
            const itemInterval = this.getFoundItemTimeInterval(element);
            element['width'] = (itemInterval.end - itemInterval.start) * width / audioLength;
            element['left'] = itemInterval.start * width / audioLength;
          }
        }
      })
    }
  }

  commentAdded(comment) {
    this.comments.push(comment);
  }

  selectAudio(event) {
    this.loadAudioData(event.target.value);
  }

  private subscribeZoomChanges() {
    this.audioPlayerStatus.$zoom.subscribe(zoom => this.zoomChanged(zoom));
  }

  private loadAudioData(id, init = false) {
    const file = this.files[id]
    this.comments = file.comments;
    this.audioFile = file.audio_file;
    this.foundItems = file.found_items;
    this.parameters = file.parameters;
    this.rules =  file.rules;
    this.http.get(file.transcription)
      .toPromise().then((response: any) => { 
        this.transcription = response;
      });
    
    if (!init) {
      this.wavesurfer.load(this.audioFile);
      this.wavesurfer.setMute(true);
    }
    
    this.cdRef.detectChanges();
  }

  private addFoundItemsRegions() {
    this.wavesurfer.clearRegions()
    for (const key in this.foundItems) {
      if (this.foundItems.hasOwnProperty(key)) {
        const element = this.foundItems[key];
        this.wavesurfer.addRegion({start: element.timestamp_init / 1000, end: element.timestamp_end / 1000, drag: false, color: 'transparent'});
      }
    }
  }

  private handleRegionEntered(region) {
    const item = this.getItemInRegion(region);
    this.foundItems[item]['expanded'] = true;
  }

  private handleRegionExit(region) {
    const item = this.getItemInRegion(region);
    this.foundItems[item]['expanded'] = false;
  }

  private getItemInRegion(region) {
    const regionStart = region.start;
    const regionEnd = region.end;
    return this.keys(this.foundItems).find(key => {
      const itemInterval = this.getFoundItemTimeInterval(this.foundItems[key]);
      return itemInterval.start >= regionStart && itemInterval.end <= regionEnd
    });
  }

  private getFoundItemTimeInterval(item) {
    return {
      start: item.timestamp_init / 1000,
      end: item.timestamp_end / 1000,
    }
  }

  private registerSvgAssets() {
    this.matIconRegistry.addSvgIcon(
      'speech-icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/highlights/speech.svg')
    );

    this.matIconRegistry.addSvgIcon(
      'right-arrow',
      this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/output/right-arrow.svg')
    );
  }

  private trackPlayerScroll() {
    this.wavesurfer.on('scroll', event => {
      this.foundItemsContainer.nativeElement.scrollLeft = event.target.scrollLeft;
    });
  }

  private subscribeWaveSurferRegionEvents() {
    this.wavesurfer.on('region-in', event => {
      this.handleRegionEntered(event);
    });

    this.wavesurfer.on('region-out', event => {
      this.handleRegionExit(event);
    });
  }

  private subscribeWavesurferSeek() {
    this.wavesurfer.on('seek', event => {
      this.audioPlayerStatus.$skipAudio.next(this.wavesurfer.getCurrentTime());
    });
  }

  private unsubscribeWavesurferSeek() {
    this.wavesurfer.un('seek');
  }
}