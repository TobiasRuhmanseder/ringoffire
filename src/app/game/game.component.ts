import { Component, Inject, OnInit } from '@angular/core';
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
  pickCardAnimation = false;
  end: boolean = false;
  currentCard: string = '';
  game!: Game;
  takeCardSound = new Audio('assets/audio/take-card.mp3');
  unsubParams: any;
  currentId: any;


  constructor(private route: ActivatedRoute, private router: Router, public dialog: MatDialog, private firebaseService: FirebaseService) { }

  ngOnInit() {
    this.newGame();
    this.getParams();
    this.firebaseService.startFirebase();
    this.firebaseService.gameTrigger.subscribe(game => {
      console.log(game);
      console.log(game.stack);
      console.log(game[0].stack);
      this.game.stack = game.stack;
      this.game.players = game.players;
      this.game.playedCard = game.playedCard;
      this.game.currentPlayer = game.currentPlayer;
      console.log(this.game);
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
    if (!this.pickCardAnimation) {
      this.takeCardSound.play();
      this.currentCard = this.game.stack.pop()!;
      this.pickCardAnimation = true;
      setTimeout(() => {
        this.game.playedCard.push(this.currentCard);
      }, 1000)
      setTimeout(() => { this.showNextPlayer() }, 3000);
    }
  }

  showNextPlayer() {
    if (this.game.players.length >= 1) {
      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
    }
    this.pickCardAnimation = false;
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
          this.game.players.push(name);
        }
      });
    }
  }
}




