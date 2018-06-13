import {SudokuPuzzle} from './sudoku-puzzle';

const data1 =
  `534678912
   672195348
   198342567
   859761423
   426853791
   713924856
   961537284
   287419635
   345286179`;

const data2 = `534678912

672195348


198342567

859761423

426853791

713924856

961537284

287419635

345286179`;

const data3 = `534678912
672195348
19834256
859761423
426853791
713924856
961537284
287419635
345286179`;

const data4 = `534678912
672195348
859761423
426853791
713924856
961537284
287419635
345286179`;

const data5 = `534678912
672195348
198342567
859761422
426853791
713924856
961537284
287419635
345286179`;

const data6 =
  `534678912
   672195348
   198342567
   859761427
   426853791
   713924856
   961537284
   287419635
   345286179`;

describe('SudokuPuzzle', () => {

  describe('loadFromString()', () => {
    it('should load puzzle from new line separate strings', () => {
      const loaded = SudokuPuzzle.loadFromString(data1);
      expect(loaded.puzzle.length).toEqual(81);
    });

    it('should load puzzle from new line separated string, stripping new lines and empty lines', () => {
      const loaded = SudokuPuzzle.loadFromString(data2);
      expect(loaded.puzzle.length).toEqual(81);
    });

    it('should throw exception when any line doesn\'t have a length of 9', () => {
      expect(() => {
        const loaded = SudokuPuzzle.loadFromString(data3);
      }).toThrow();
    });

    it('should throw exception when less than 9 lines', () => {
      expect(() => {
        const loaded = SudokuPuzzle.loadFromString(data4);
      }).toThrow();
    });
  });

  describe('loadFromFile()', () => {
    it('should load from `File` object', async () => {
      const file = new File([data1], 'input.txt', {type: 'text/plain'});
      const puzzle = await SudokuPuzzle.loadFromFile(file);
      expect(puzzle.validated).toBeFalsy();
      puzzle.validate();
      expect(puzzle.valid).toBeTruthy();
    });
  });

  describe('validate()', () => {
    it('should not be called if the puzzle is just created', () => {
      const loaded = SudokuPuzzle.loadFromString(data1);
      expect(loaded.validated).toBeFalsy();
    });

    it('should be invalid if the puzzle is just created', () => {
      const loaded = SudokuPuzzle.loadFromString(data1);
      expect(loaded.valid).toBeFalsy();
    });

    it('should set validated to true when data is valid', () => {
      const loaded = SudokuPuzzle.loadFromString(data1);
      loaded.validate();
      expect(loaded.validated).toBeTruthy();
    });

    it('should set validated to true when data is invalid', () => {
      const loaded = SudokuPuzzle.loadFromString(data5);
      loaded.validate();
      expect(loaded.validated).toBeTruthy();
    });

    it('should set valid to true when data is valid', () => {
      const loaded = SudokuPuzzle.loadFromString(data1);
      loaded.validate();
      expect(loaded.valid).toBeTruthy();
    });

    it('should set valid to true when data is valid (with empty lines)', () => {
      const loaded = SudokuPuzzle.loadFromString(data2);
      loaded.validate();
      expect(loaded.valid).toBeTruthy();
    });

    it('should set valid to false when data is invalid (1)', () => {
      const loaded = SudokuPuzzle.loadFromString(data5);
      loaded.validate();
      expect(loaded.valid).toBeFalsy();
    });


    it('should set valid to false when data is invalid (2)', () => {
      const loaded = SudokuPuzzle.loadFromString(data6);
      loaded.validate();
      expect(loaded.valid).toBeFalsy();
    });
  });

});
