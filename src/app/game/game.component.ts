import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  isHover = false;
  isHoverOut = false;
  pickCardAnimation = false;
  constructor(private router: Router) { }

  ngOnInit() {

    document.getElementById('buttonId')?.addEventListener('mouseover', () => {
      this.buttonTextIn();
    })

    document.getElementById('buttonId')?.addEventListener('mouseleave', () => {
      this.buttonTextOut();
    })
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
    this.pickCardAnimation = true;
  }

}


