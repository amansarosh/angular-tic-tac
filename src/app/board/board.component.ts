import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  squares: string[];
  xIsNext: boolean; //Help Determine Current Player
  winner: string; //X, or O

  constructor() { } //Used to inject dependancies

  ngOnInit() { //Used for inital setup work
    this.newGame(); //Method to setup inital values for a new game
  }

  newGame() { //Function for starting new game
    this.squares = Array(9).fill(null); //An array of 9 squares
    this.winner = null; //No winner at start
    this.xIsNext = true; //X always starts first
  }

  get player() {
    return this.xIsNext ? 'X' : 'O'; //Determines which player will be using the game board | If, then else
  }

  makeMove(idx: number) { //Serves as even handeler. 
    if (!this.squares[idx]) { //We will check the index in the array they clicked on; if blank then nothing
      this.squares.splice(idx, 1, this.player);  //If empty or null, we'll splice int the index of the square with the current player
      this.xIsNext = !this.xIsNext; //Toggle XIsNext to its opposite value by using "!"
    }

    this.winner = this.calculateWinner(); //Algorithm to determine what user has won the game
  }

  calculateWinner() {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        this.squares[a] &&
        this.squares[a] === this.squares[b] &&
        this.squares[a] === this.squares[c]
      ) {
        return this.squares[a];
      }
    }
    return null;
  }
}