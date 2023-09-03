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
  isHoverOut = false;
  pickCardAnimation = false;
  currentCard: string = '';
  game!: Game;

  constructor(private router: Router, public dialog: MatDialog) { }

  ngOnInit() {
    this.newGame();
    document.getElementById('buttonId')?.addEventListener('mouseover', () => {
      this.buttonTextIn();
    })
    document.getElementById('buttonId')?.addEventListener('mouseleave', () => {
      this.buttonTextOut();
    })
  }

  newGame() {
    this.game = new Game();
    console.log(this.game);

  }

  buttonTextIn() {
    if (!this.isHover) {
      document.getElementById('buttonTextId')?.classList.remove('buttonTextOut');
      document.getElementById('buttonTextId')?.classList.add('buttonTextIn');
      document.getElementById('buttonTextId')?.classList.remove('d-none');
      this.isHover = true;
    }
  }

  buttonTextOut() {
    if (this.isHover && !this.isHoverOut) {
      this.isHoverOut = true;
      document.getElementById('buttonTextId')?.classList.remove('buttonTextIn');
      document.getElementById('buttonTextId')?.classList.add('buttonTextOut');
      setTimeout(() => {
        document.getElementById('buttonTextId')?.classList.add('d-none');
        this.isHover = false;
        this.isHoverOut = false;
      }, 300)
    }

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
    const dialogRef = this.dialog.open(DialogAddPlayerComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
    // this.dialog.open(DialogAddPlayerComponent, {
    //   width: '250px',
    //   enterAnimationDuration,
    //   exitAnimationDuration,
    // });
    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('The dialog was closed', result);
    });
  }
}




