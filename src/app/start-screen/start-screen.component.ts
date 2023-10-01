import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../firebase-services/firebase.service';
import { Game } from 'src/models/game';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent implements OnInit {
  isHover = false;

  constructor(private firebaseService: FirebaseService, private router: Router) { }

  ngOnInit() {
  }

  buttonTextIn() {
    this.isHover = true;
  }

  buttonTextOut() {
    this.isHover = false;
  }

  async newGame() {
    let game = new Game;
    console.log(game);

    await this.firebaseService.addNewGame(game);
    let id = this.firebaseService.currentId;
    console.log(id);

    this.router.navigateByUrl('/game/' + id);
  }

}
