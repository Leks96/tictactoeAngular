import { Status } from "./gamestatus";

export class Gamelogic {
    gameStatus!: Status;
    currentTurn!: number;

    gameField: Array<number> = [];

    //winning conditions
    winConditionsOne: Array<Array<number>> = [
        [1,1,1,0,0,0,0,0,0], // Horizontal wins
        [0,0,0,1,1,1,0,0,0],
        [0,0,0,0,0,0,1,1,1],
        [1,0,0,1,0,0,1,0,0], // Vertical wins
        [0,1,0,0,1,0,0,1,0],
        [0,0,1,0,0,1,0,0,1],
        [1,0,0,0,1,0,0,0,1], // Diagonal wins
        [0,0,1,0,1,0,1,0,0],
    ]
    winConditionsTwo: Array<Array<number>> = [
        [2,2,2,0,0,0,0,0,0], // Horizontal wins
        [0,0,0,2,2,2,0,0,0],
        [0,0,0,0,0,0,2,2,2],
        [2,0,0,2,0,0,2,0,0], // Vertical wins
        [0,2,0,0,2,0,0,2,0],
        [0,0,2,0,0,2,0,0,2],
        [2,0,0,0,2,0,0,0,2], // Diagonal wins
        [0,0,2,0,2,0,2,0,0],
    ]

    public constructor () {
        this.gameField = [0,0,0,0,0,0,0,0,0]
        this.gameStatus = Status.STOP;
        this.currentTurn = 1;
    }

    randomPlayerStart(): number {
        const startPlayer = Math.floor(Math.random() * 2) + 1;
        return startPlayer;
    }

    gameStart(): void {
        this.gameStatus = Status.START;
        this.gameField = [0,0,0,0,0,0,0,0,0];
        this.currentTurn = this.randomPlayerStart();
        console.log(this.currentTurn);
    }

    getPlayerColorClass(): string {
        const colorClass = (this.currentTurn === 2) ? 'player-two' : 'player-one';
        return colorClass;
    }

    changePlayer(): void {
        this.currentTurn = (this.currentTurn === 2) ? 1 : 2;
    }

    setField(position: number, value: number): void {
        //store the current player's id number for the given square
        this.gameField[position] = value;
        console.log(this.gameField);
      }

    async checkGameEndFull(): Promise<boolean> {
        let isFull = true

        if (this.gameField.includes(0)) {
            console.log('Empty spaces still exists');

            isFull = false;
        }

        if (isFull) {
            console.log('All spaces taken');
            this.gameEnd();
            return true;
        } else {
            return false;
        }
    }

    arrayEquals(a: Array<any>, b: Array<any>): boolean {
        return Array.isArray(a) && Array.isArray(b) && a.length === b.length && a.every((value, index) => value === b[index]);
    }

    async checkGameEndWinner(): Promise<boolean> {
        let isWinner = false;

        const checkWin = (this.currentTurn === 1) ? this.winConditionsOne : this.winConditionsTwo;
        const currentBoard: any = [];

        this.gameField.forEach((subfield, index) => {
            if (subfield != this.currentTurn) {
                currentBoard[index] = 0;
            } else {
                currentBoard[index] = subfield;
            }
        });

        console.log(`Here is the current state of the board: ${currentBoard}`);

        checkWin.forEach((checkfield, checkindex) => {
            if (this.arrayEquals(checkfield, currentBoard)) {
                isWinner = true
            }
        });

        if (isWinner) {
            console.log('Three in a row: TIC-TAC-TOE!!!');
            this.gameEnd();
            return true;
        } else {
            return false;
        }
     }

    gameEnd(): void {
        this.gameStatus = Status.STOP;
    }
}