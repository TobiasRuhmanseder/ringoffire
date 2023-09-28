import { Injectable, OnDestroy, inject } from '@angular/core';
import { Firestore, collection, onSnapshot } from '@angular/fire/firestore';
import { Game } from 'src/models/game';
@Injectable({
  providedIn: 'root'
})
export class FirebaseService implements OnDestroy {

  firestore: Firestore = inject(Firestore);

  games: Game[] = [];

  unsubGame;


  constructor() {
    this.unsubGame = this.subGameList;
  }

  ngOnDestroy() {
    this.unsubGame();
  }

  subGameList() {
    return onSnapshot(this.getGameRef(), (list) => {
      this.games = [];
      list.forEach(element => {
        this.games.push(this.setGameObject(element.data(), element.id))
      });
    })
  }

  getGameRef() {
    return collection(this.firestore, 'games')
  }

  setGameObject(obj: any, id: string): Game {
    return {
      id: id,
      players: obj.players || "",
      stack: obj.stack || "",
      playedCard: obj.playedCard || "",
      currentPlayer: obj.currentPlayer || "",
    }
  }


}
