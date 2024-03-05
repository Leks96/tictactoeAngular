import { Component } from '@angular/core';
import { Gamelogic } from '../gamelogic';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
  providers: [Gamelogic]
})
export class GameComponent {
  startGame():  void {
    this.game.gameStart();

      const currentPlayer = 'Current turn: player' + this.game.currentTurn;
      const information = document.querySelector('#current-status');
      information!.innerHTML = currentPlayer;
  }

  async clickSubfield( subfield: any ): Promise<void> {
    if (this.game.gameStatus === 1) { 
      const position = subfield.currentTarget.getAttribute('position');
      console.log(position);

      //pass the square's data to the model
      this.game.setField(position, this.game.currentTurn);

      //get players color and update grid with it
      const color = this.game.getPlayerColorClass();
      subfield.currentTarget.classList.add(color);

      await this.game.checkGameEndFull().then((end: boolean) => {
        if (this.game.gameStatus === 0 && end) {
          const information = document.querySelector('#current-status')
          information!.innerHTML = `the winner is player` + this.game.currentTurn
        }
      });

      this.game.changePlayer();
    }
}

  constructor(public game: Gamelogic) {}
}