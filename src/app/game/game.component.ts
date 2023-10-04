import { Component, Inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { DialogRef } from '@angular/cdk/dialog';
import { FirebaseService } from '../firebase-services/firebase.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  isHover = false;
  end: boolean = false;
  game!: Game;
  takeCardSound = new Audio('assets/audio/take-card.mp3');
  unsubParams: any;
  currentId: any;
  greyAddButton: boolean = false;
  gameInfo: any;
  messageOnScreen: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router, public dialog: MatDialog, private firebaseService: FirebaseService) { }

  ngOnInit() {
    this.newGame();
    this.getParams();
    this.firebaseService.startFirebase();
    this.firebaseService.gameTrigger.subscribe(game => {
      this.game.stack = game.stack;
      this.game.players = game.players;
      this.game.playedCard = game.playedCard;
      this.game.currentPlayer = game.currentPlayer;
      this.game.pickCardAnimation = game.pickCardAnimation;
      this.game.currentCard = game.currentCard;
    })
  }
  ngOnDestroy() {
    this.unsubParams.unsubscribe();
  }

  newGame() {
    this.game = new Game;
  }

  getParams() {
    this.unsubParams = this.route.params.subscribe(params => {
      this.currentId = params['id'];
      this.firebaseService.currentId = this.currentId;
    })
  }

  buttonTextIn() {
    this.isHover = true;
  }

  buttonTextOut() {
    this.isHover = false;
  }

  endGame() {
    this.end = true;
    setTimeout(() => { this.router.navigateByUrl('/'); }, 3000);
  }

  takeCard() {
    if (!this.game.pickCardAnimation && this.game.players.length > 1) {

      this.takeCardSound.play();
      this.game.currentCard = this.game.stack.pop()!;
      this.game.pickCardAnimation = true;
      this.firebaseService.updateGame(this.game);
      setTimeout(() => {
        this.game.playedCard.push(this.game.currentCard);
        this.firebaseService.updateGame(this.game);
      }, 1000)
      setTimeout(() => { this.showNextPlayer() }, 3000);
    } else if (this.game.players.length <= 1 && this.messageOnScreen == false) this.showMessageOnScreen();
  }

  showNextPlayer() {
    if (this.game.players.length >= 1) {
      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      this.firebaseService.updateGame(this.game);
    }
    this.game.pickCardAnimation = false;
    this.firebaseService.updateGame(this.game);

  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    if (this.game.players.length > 7) {
      this.greyAddButton = true;
    }
    else {
      const dialogRef = this.dialog.open(DialogAddPlayerComponent, {
        width: '250px',
        enterAnimationDuration,
        exitAnimationDuration,
      });
      dialogRef.afterClosed().subscribe((name: string) => {
        if (name == undefined || name == '') { }
        else {
          this.game.players.push(name);
          this.firebaseService.updateGame(this.game);
          if (this.game.players.length > 7) { this.greyAddButton = true; }
        }
      });
    }
  }

  showMessageOnScreen() {
    this.messageOnScreen = true;
    setTimeout(() => { this.messageOnScreen = false }, 2000);
  }
}




