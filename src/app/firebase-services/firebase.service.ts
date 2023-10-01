import { Injectable, OnDestroy, inject } from '@angular/core';
import { Firestore, addDoc, collection, doc, onSnapshot, where, query } from '@angular/fire/firestore';
import { Game } from 'src/models/game';
@Injectable({
  providedIn: 'root'
})
export class FirebaseService implements OnDestroy {

  firestore: Firestore = inject(Firestore);

  game: Game[] = [];
  currentId: any = "";
  unsubGame: any;


  constructor() {
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
      this.game.push(this.setGameObject(element.data(), element.id))
      console.log(this.game);
    });
  }

  getGameRef() {
    return collection(this.firestore, 'games');
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

  getSingleDocRef() {
    return doc(collection(this.firestore, 'games'), this.currentId);
  }

}
