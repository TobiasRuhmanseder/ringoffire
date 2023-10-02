import { Injectable, OnDestroy, inject } from '@angular/core';
import { Firestore, addDoc, collection, doc, onSnapshot, where, query } from '@angular/fire/firestore';
import { Game } from 'src/models/game';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FirebaseService implements OnDestroy {

  firestore: Firestore = inject(Firestore);
  gameTrigger = new Subject<any>();
  game: Game[] = [];
  currentId: any = "";
  unsubGame: any;


  constructor() {
  }

  serviceMethod(game: any): void {
    this.gameTrigger.next(game);
  }

  ngOnDestroy() {
    this.unsubGame();
  }

  startFirebase() {
    this.unsubGame = this.subGameList();
  }

  subGameList() {
    return onSnapshot(this.getSingleDocRef(), (element) => {
      this.game = [];
      this.game.push(this.setGameObject(element.data(), element.id));
      console.log(this.game);
      this.serviceMethod(this.game);
    });
  }

  async addNewGame(item: Game) {
    let game = this.getCleanJson(item);
    const docRef = await addDoc(this.getGameRef(), game)
      .catch((err) => { console.log(err) })
      .then((gameInfo: any) => {
        console.log(gameInfo.id);
        this.currentId = gameInfo.id;
      });
  }

  setGameObject(obj: any, id: string): Game {
    return {
      id: id,
      players: obj.players || "",
      stack: obj.stack || "",
      playedCard: obj.playedCard || "",
      currentPlayer: obj.currentPlayer || 0,
    }
  }

  getCleanJson(game: Game) {
    return {
      players: game.players || "",
      stack: game.stack || "",
      playedCard: game.playedCard || "",
      currentPlayer: game.currentPlayer || 0,
    }
  }

  getGameRef() {
    return collection(this.firestore, 'games');
  }

  getSingleDocRef() {
    return doc(collection(this.firestore, 'games'), this.currentId);
  }

}
