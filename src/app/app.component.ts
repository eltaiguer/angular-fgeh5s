import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  files = {
    0: {
      audio_name: '20190923_ag23_3456.wav',
      // audio_file: 'https://wavesurfer-js.org/example/elan/transcripts/001z.mp3',
      audio_file: 'https://cdn.jsdelivr.net/gh/eltaiguer/angular-fgeh5s@master/src/assets/output/test.mp3',
      found_items: {
        '0': {
          'start': 0, 
          'end': 5,
          'item_id': 57,
          'item_name': 'saludo_inicial',
          'accuracy': 0.8,
          'group_color': '#32A560',
          timestamp_init: 0,
          timestamp_end: 5000
        },
        '1': {
          'start': 8, 
          'end': 12,
          'item_id': 100,
          'item_name': 'respuesta_ok',
          'accuracy': 0.8,
          'group_color': '#AAA560',
          timestamp_init: 8000,
          timestamp_end: 12000
        },
      },
      transcription: 'assets/highlights/text-data.json',
      parameters: {
        'dni_cliente': '11356699J',
        'localidad': 'Madrid'
      },
      time_separator: 20,
      comments: [{
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
      }],
      rules: {
        '0':
          {
            'rule_code': 'XXXXXX', 
            'result': 'TRUE'
          },
        '1':
          {
            'rule_code': 'XXXXXX', 
            'result': 'TRUE'
          }
      }
    },
    1: {
      audio_name: '222222_ag23_3456.wav',
      audio_file: 'https://wavesurfer-js.org/example/media/demo.wav',
      found_items: {
        '0': {
          'start': 0, 
          'end': 5,
          'item_id': 57,
          'item_name': 'otro_saludo',
          'accuracy': 0.8,
          'group_color': '#32A560',
          timestamp_init: 0,
          timestamp_end: 5000
        },
        '1': {
          'start': 8, 
          'end': 12,
          'item_id': 100,
          'item_name': 'respuesta_ok',
          'accuracy': 0.8,
          'group_color': '#AAA560',
          timestamp_init: 8000,
          timestamp_end: 12000
        },
      },
      transcription: 'assets/highlights/text-data.json',
      parameters: {
        'dni_cliente': '11356699J',
        'localidad': 'Madrid'
      },
      time_separator: 20,
      comments: [{
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
      }],
      rules: {
        '0':
          {
            'rule_code': 'XXXXXX', 
            'result': 'TRUE'
          },
        '1':
          {
            'rule_code': 'XXXXXX', 
            'result': 'TRUE'
          }
      }
    }
  }
}
