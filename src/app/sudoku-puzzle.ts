const MAX_ROWS = 9;
const MAX_COLS = 9;

export class SudokuPuzzle {

  private _validated = false;
  private _valid = false;

  static loadFromFile(file: File): Promise<SudokuPuzzle> {
    const reader = new FileReader();
    return new Promise<SudokuPuzzle>((resolve, reject) => {
      reader.readAsText(file);

      reader.onload = ev => {
        const result = this.loadFromString(reader.result);
        resolve(result);
      };
      reader.onerror = ev => reject();
    });
  }

  static loadFromString(content: string): SudokuPuzzle {
    let lines = content.split(/(\r?\n)+/);
    lines = lines.map(item => item.trim());
    lines = lines.filter(item => item !== '');

    // validate line count
    if (lines.length < MAX_ROWS) {
      throw new Error('ROW_COUNT');
    }

    // validate each line
    lines.forEach(item => {
      if (item.length !== MAX_COLS) {
        throw new Error('COL_COUNT');
      }
    });

    const result = lines.join('').split('');
    const puzzle = result.map(item => Number(item));

    return new SudokuPuzzle(puzzle);
  }

  private constructor(public puzzle: number[]) {
  }

  get valid() {
    return this._valid;
  }

  get validated() {
    return this._validated;
  }

  validate(): boolean {
    if (this.validated) {
      return this.valid;
    }

    let valid = true;

    // validate all rows
    for (let row = 0; row < MAX_ROWS; row ++) {
      valid = valid && this.validateRow(row);
    }

    // validate all columns
    for (let col = 0; col < MAX_COLS; col ++) {
      valid = valid && this.validateColumn(col);
    }

    // validate all sub-grids
    for (let row = 0; row < MAX_ROWS; row += 3) {
      for (let col = 0; col < MAX_COLS; col += 3) {
        valid = valid && this.validateSubGrid(row, col);
      }
    }

    this._validated = true;
    this._valid = valid;
    return this.valid;
  }

  private validateRow(n: number): boolean {
    const hasNumber = [];
    const start = MAX_COLS * n;

    // count the numbers
    for (let idx = start; idx < start + MAX_COLS; idx ++) {
      hasNumber[this.puzzle[idx]] = true;
    }

    // check if all numbers 1-9 exist
    let total = 0;
    for (let idx = 1; idx < 10; idx ++) {
      total += hasNumber[idx] ? 1 : 0;
    }

    return total === MAX_COLS;
  }

  private validateColumn(n: number): boolean {
    const hasNumber = [];
    const start = n;

    // count the numbers
    for (let idx = start; idx < MAX_COLS * MAX_ROWS; idx += MAX_ROWS) {
      hasNumber[this.puzzle[idx]] = true;
    }

    // check if all numbers 1-9 exist
    let total = 0;
    for (let idx = 1; idx < 10; idx ++) {
      total += hasNumber[idx] ? 1 : 0;
    }

    return total === 9;
  }

  private validateSubGrid(startRow: number, startCol: number): boolean {
    const hasNumber = [];

    for (let row = startRow; row < startRow + 3; row ++) {
      for (let col = startCol; col < startCol + 3; col ++) {
        const idx = row * MAX_COLS + col;
        hasNumber[this.puzzle[idx]] = true;
      }
    }

    // check if all numbers 1-9 exist
    let total = 0;
    for (let idx = 1; idx < 10; idx ++) {
      total += hasNumber[idx] ? 1 : 0;
    }

    return total === 9;
  }

}
