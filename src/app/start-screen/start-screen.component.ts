import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent implements OnInit {
  isHover = false;
  isHoverOut = false;

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

  newGame() {
    this.router.navigateByUrl('/game');
  }

}
