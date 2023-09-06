import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent implements OnInit {
  isHover = false;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  buttonTextIn() {
    this.isHover = true;
  }

  buttonTextOut() {
    this.isHover = false;
  }

  newGame() {
    this.router.navigateByUrl('/game');
  }

}
