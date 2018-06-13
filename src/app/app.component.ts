import { Component } from '@angular/core';
import {SudokuPuzzle} from './sudoku-puzzle';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private _file?: File;
  private _text?: string;

  title = 'Sudoku Validator';

  valid = false;
  validated = false;

  fileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this._file = input.files[0];
    }
  }

  textAreaChange(value: string) {
    this._text = value;
  }

  async submit(event: Event) {
    event.preventDefault();

    try {
      if (this._file) {
        const puzzle = await SudokuPuzzle.loadFromFile(this._file);
        puzzle.validate();
        this.valid = puzzle.valid;
        this.validated = puzzle.validated;
        return;
      } else if (this._text) {
        const puzzle = SudokuPuzzle.loadFromString(this._text);
        puzzle.validate();
        this.valid = puzzle.valid;
        this.validated = puzzle.validated;
        return;
      }

      alert('Please have upload a file or paste the puzzle in the text area.');
    } catch (ex) {
      alert('Illegal input format. Please correct the puzzle.');
    }
  }
}
