import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AudioPlayerStatusService {
  public $playing = new BehaviorSubject<boolean>(false);
  public $skipAudio = new BehaviorSubject<number>(-1);
  public $zoom = new BehaviorSubject<number>(0);
  public $currentTime = new BehaviorSubject<number>(0);
  
  constructor() { }

}