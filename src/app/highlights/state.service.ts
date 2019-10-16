import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class StateService {

  constructor() { }

  public $highlightsStack = new BehaviorSubject<any[]>([]);
  private highlightsStack = [];
  private stackIndex = 0;

  public initState(state) {
    this.highlightsStack.push(Object.assign([], state));
    this.stackIndex = this.highlightsStack.length - 1;
    this.$highlightsStack.next(this.highlightsStack[this.stackIndex]);
  }

  public registerState(state) {
    this.highlightsStack.splice(this.stackIndex + 1, this.highlightsStack.length, Object.assign([], state));
    this.stackIndex = this.highlightsStack.length - 1;
    this.$highlightsStack.next(this.highlightsStack[this.stackIndex]);
  }

  public undo() {
    const newStackIndex = Math.max(0, this.stackIndex - 1);
    if (newStackIndex !== this.stackIndex) {
      this.stackIndex = newStackIndex;
      this.$highlightsStack.next(this.highlightsStack[this.stackIndex]);
    }
  }

  public redo() {
    const newStackIndex = Math.min(this.highlightsStack.length - 1, this.stackIndex + 1);
    if (newStackIndex !== this.stackIndex) {
      this.stackIndex = newStackIndex;
      this.$highlightsStack.next(this.highlightsStack[this.stackIndex]);
    }
  }

  public hasUndo() {
    return this.stackIndex > 0;
  }

  public hasRedo() {
    return this.stackIndex >= 0 && this.stackIndex < this.highlightsStack.length - 1;
  }
}