import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StateService } from './state.service';

@Component({
  selector: 'app-highlights',
  templateUrl: './highlights.component.html',
  styleUrls: ['./highlights.component.scss']
})
export class HighlightsComponent implements OnInit {
  public comments = [
    {
      text: 'This is a comment',
      author: 'John Carrol',
      title: 'Comment #3456',
      timestamp: 2000
    },
    {
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      author: 'John Carrol',
      title: 'Comment #3457',
      timestamp: 4761.9065
    }
  ];

  public highlights = [
    {
      start: 0,
      end: 5,
      item_id: 0,
      item_name: 'highlight 1',
      group_color: '#A8E1D3'
    },
    {
      start: 10,
      end: 12,
      item_id: 1,
      item_name: 'highlight 2',
      group_color: '#E691A1'
    }
  ]

  public highlightButtons = [
    {
      'id': 1,
      'name': 'Item 1',
      'color': '#d4efee'
    },
    {
      'id': 2,
      'name': 'Item 2',
      'color': '#d9120e'
    }
  ]

  public audioFile = 'https://ccrma.stanford.edu/~jos/mp3/gtr-jazz.mp3'; 
  public showAudioPlayer: boolean;
  public showComments: boolean;
  public textData: any;
  public selectedHighlightData = null;

  constructor(private http: HttpClient, private stateService: StateService) { }

  ngOnInit() {
    this.showAudioPlayer = !!this.audioFile;
    this.showComments = false;

    this.http.get('assets/highlights/text-data.json')
      .toPromise().then((response: any) => { 
        this.textData = response;
      });

    this.stateService.initState(this.highlights);
  }

  toggleAudioPlayer(value) {
    this.showAudioPlayer = value;
  }

  toggleComments(value) {
    this.showComments = value;
  }

  colorClicked(group) {
   if (this.selectedHighlightData && this.selectedHighlightData.id === group.value.id) {
     this.selectedHighlightData = null;
     group.value = null;
   } else {
     this.selectedHighlightData = group.value;
   }
  }

}