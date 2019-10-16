import { Component, OnInit, Input, ViewChild, ElementRef, Renderer2, HostBinding } from '@angular/core';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { StateService } from '../state.service';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class TextComponent implements OnInit {
  @Input() textData: any;
  @Input() highlights: any[];
  @Input() highlightData: any;
  @ViewChild('mainTextContainer', {static: false}) textContainer: ElementRef;
  
  public keys = Object.keys;
  selecting = false;
  mouseMoved = false;
  private currentHighlight = {
    start: null,
    end: null,
    item_id: null,
    item_name: null,
    group_color: '#FEAC60'
  }

  private whitespaceToken = ' ';

  constructor(private matIconRegistry: MatIconRegistry, public domSanitizer: DomSanitizer,
    private stateService: StateService, private renderer: Renderer2) {
    this.registerSvgAssets();

    this.stateService.$highlightsStack.subscribe(state => {
      this.highlights = Object.assign([], state);
    });
  }

  ngOnInit() { }

  ngOnChanges(changes) {
    console.log(changes);
    // this.value = 'red';
    // this.renderer.setStyle(this.textContainer.nativeElement, 'div::selection', 'red');
  }

  isHighlightModeEnabled() {
    return this.highlightData;
  }

  hasHighlight(wordPosition) {
    return this.highlights.find(highlight => Number(wordPosition) >= highlight.start && Number(wordPosition) <= highlight.end);
  }

  isLastWordInHighlight(wordPosition) {
    return this.highlights.some(highlight => highlight.end === Number(wordPosition));
  }

  endSelection(event, wordPosition = -1) {
    if (this.selecting) {
      try {
        const position = Number(wordPosition);
        const selection = window.getSelection().toString();
        if (selection.trim().length && this.mouseMoved) {

          this.setHighlightRange(selection, position);

          if (!this.highlightOverlap(this.currentHighlight.start, this.currentHighlight.end)) {
            this.currentHighlight.item_id = this.getHighlightId() + 1;
            this.currentHighlight.group_color = this.highlightData.color;
            this.currentHighlight.item_name = this.highlightData.name;
            this.highlights.push(Object.assign({}, this.currentHighlight));
            this.saveActions();
          }
        }
      } catch(error) {
        this.selecting = false;
      }
    }
    this.discardSelection();
  }

  startSelection(event, wordPosition) {
    event.stopPropagation();
    if (this.isHighlightModeEnabled()) {
      this.mouseMoved = false;
      const position = Number(wordPosition);
      if (!this.highlightOverlap(position)) {
        this.selecting = true;
        this.currentHighlight.start = position;
      }
    }    
  }

  deleteHighlight(lastWord) {
    const highlight = this.hasHighlight(lastWord);
    this.highlights = this.highlights.filter(elem => elem.item_id !== highlight.item_id);
    this.saveActions();
  }

  startSelectionOutside(event) {
    if (this.isHighlightModeEnabled()) {
      this.mouseMoved = false;
      this.selecting = true;
      this.currentHighlight.start = null;
    }
  }

  getSelectionColor() {
    return this.isHighlightModeEnabled() ? this.highlightData.color : '#ACCEF7';
  }

  private getHighlightId() {
    return this.highlights.length ? this.highlights[this.highlights.length - 1].item_id : 0;
  }

  private registerSvgAssets() {
    this.matIconRegistry.addSvgIcon(
      'highlight-cross-icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/highlights/comment-cross.svg')
    );
  }

  private discardSelection() {
    if (window.getSelection) {
      if (window.getSelection().empty) {  // Chrome
        window.getSelection().empty();
      } else if (window.getSelection().removeAllRanges) {  // Firefox
        window.getSelection().removeAllRanges();
      }
    }
  }

  private highlightOverlap(start, end = null) {
    const startOverlap = this.highlights.some(elem => start >= elem.start && start <= elem.end);
    
    if (startOverlap) {
      return startOverlap;
    }

    if (end) {
      return this.highlights.some(elem => elem.start >= start && elem.start <= end || elem.end >= start && elem.end <= end);
    }
  }

  private setHighlightRange(selection, endPosition) {
    const splitSelection = selection.split(this.whitespaceToken);
  
    let positionFromSelection = null;

    if (this.currentHighlight.start < 0 || !this.currentHighlight.start || endPosition < 0 || !endPosition) {
      positionFromSelection = this.getPositionFromSelection(selection);
      this.currentHighlight.start = positionFromSelection.start;
      this.currentHighlight.end = positionFromSelection.end
    } else {
      this.currentHighlight.end = Math.max(endPosition, this.currentHighlight.start);
      this.currentHighlight.start = Math.min(endPosition, this.currentHighlight.start);

      if (!splitSelection[0].length) {
        this.currentHighlight.start++;
      }

      if (!splitSelection[splitSelection.length - 1].length) {
        this.currentHighlight.end--;
      }
    }

    // checking if selection text matches the selected words length
    if (selection.trim().split(this.whitespaceToken).length !== this.currentHighlight.end - this.currentHighlight.start + 1 || this.currentHighlight.end - this.currentHighlight.start < 0) {
      throw 'wrong selection';
    }
  }

  private getPositionFromSelection(selection) {
    const splitSelection = selection.trim().split(this.whitespaceToken);
    const firstWord = splitSelection[0];

    const text = this.textContainer.nativeElement.innerText.trim().split(this.whitespaceToken);

    let start = -1;
    let end = -1;

    for (let index = 0; index < text.length; index++) {
      const element = text[index];
      if (element.includes(firstWord)) {
        end = this.isContained(index, text, splitSelection);
        if (end > -1) {
          start = index;
          break; 
        }
      }
    }

    if (start > -1) {
      return {
        start: start,
        end: end
      }
    } else {
      throw 'wrong selection';
    }

  }

  private isContained(start, text, splitSelection) {
    let index;
    for (index = 0; index < splitSelection.length; index++) {
      const element = splitSelection[index];
      if (element !== text[start + index] && index < splitSelection.length && !text[start + index].includes(element)) {
        return -1;
      }
    }

    return start + index - 1;
  }

  private listenMouseMove(event) {
    if (this.selecting && !this.mouseMoved) {
      this.mouseMoved = true;
    }
  }

  private saveActions() {
    this.stateService.registerState(this.highlights);
  }

}