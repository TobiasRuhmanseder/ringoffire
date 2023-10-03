import { Injectable, OnDestroy, inject } from '@angular/core';
import { Firestore, addDoc, collection, doc, onSnapshot, where, query, updateDoc } from '@angular/fire/firestore';
import { Game } from 'src/models/game';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FirebaseService implements OnDestroy {

  firestore: Firestore = inject(Firestore);
  gameTrigger = new Subject<any>();
  game: any = new Game();
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
      this.game = this.setGameObject(element.data(), element.id);
      this.serviceMethod(this.game);
    });
  }

  async updateGame(game: Game) {
    if (this.currentId) {
      let docRef = this.getSingleDocRef();
      await updateDoc(docRef, this.getCleanJson(game)).catch(
        (err) => { console.log(err); }
      ).then();
    }
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
      pickCardAnimation: obj.pickCardAnimation || false,
      currentCard: obj.currentCard || ""
    }
  }

  getCleanJson(game: Game) {
    return {
      players: game.players || "",
      stack: game.stack || "",
      playedCard: game.playedCard || "",
      currentPlayer: game.currentPlayer || 0,
      pickCardAnimation: game.pickCardAnimation || false,
      currentCard: game.currentCard || ""
    }
  }

  getGameRef() {
    return collection(this.firestore, 'games');
  }

  getSingleDocRef() {
    return doc(collection(this.firestore, 'games'), this.currentId);
  }

}
