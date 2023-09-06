import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  isHover = false;
  pickCardAnimation = false;
  currentCard: string = '';
  game!: Game;

  constructor(private router: Router, public dialog: MatDialog) { }

  ngOnInit() {
    this.newGame();
  }

  newGame() {
    this.game = new Game();
    console.log(this.game);

  }

  buttonTextIn() {
    this.isHover = true;
  }

  buttonTextOut() {
    this.isHover = false;
  }

  endGame() {
    document.getElementById('buttonId')?.classList.remove('end-button');
    document.getElementById('buttonId')?.classList.add('end-button-reverse');
    setTimeout(() => { this.router.navigateByUrl('/'); }, 3000);

  }

  takeCard() {
    if (!this.pickCardAnimation) {
      this.currentCard = this.game.stack.pop()!;
      this.pickCardAnimation = true;

      setTimeout(() => {
        this.pickCardAnimation = false
        this.game.playedCard.push(this.currentCard);
      }, 1000)
    }
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    if (this.game.players.length > 7) { alert("Maximal 8 Spieler!"); }
    else {
      const dialogRef = this.dialog.open(DialogAddPlayerComponent, {
        width: '250px',
        enterAnimationDuration,
        exitAnimationDuration,
      });
      dialogRef.afterClosed().subscribe((name: string) => {
        if (name == undefined || name == '') { console.log('nothing') }
        else {
          console.log(name);
          this.game.players.push(name);
        }
      });
    }
  }
}




