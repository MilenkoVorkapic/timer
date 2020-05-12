import { Component } from '@angular/core';

type STEP = 'LOGIN' | 'GAME' | 'FINISH';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  step: STEP = 'LOGIN';
  name = '';
  numberOfGoodAnswers = 0;
  go() {
    this.step = 'GAME';
  }

  finish() {
    this.step = 'FINISH';
  }

  addGoodAnswer() {
    ++this.numberOfGoodAnswers;
  }
}
