import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { finalize, takeUntil, map } from 'rxjs/operators';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  @Output() finish = new EventEmitter();
  @Output() addGoodAnswer = new EventEmitter();
  @Input() numberOfGoodAnswers: number;
  duration = 30;
  value = 0;
  timer$ = timer(0, 1000).pipe(
    finalize(() => this.finish.emit()),
    takeUntil(timer(this.duration * 1000 + 1000)),
    map((value) => this.duration * 1000 - value * 1000)
  );
  number1 = 0;
  number2 = 0;
  sign = 0;
  error = '';

  signMapping = {
    0: '+',
    1: '-',
    2: '*',
    3: '/',
  };

  ngOnInit() {
    this.generateNewQuestion();
  }

  checkValue() {
    let score = 0;
    let userVal = this.value;
    if (this.sign === 0) {
      score = this.number1 + this.number2;
    }
    if (this.sign === 1) {
      score = this.number1 - this.number2;
    }
    if (this.sign === 2) {
      score = this.number1 * this.number2;
    }
    if (this.sign === 3) {
      score = Math.floor(this.number1 / this.number2);
      userVal = Math.floor(Number(userVal));
    }
    console.log(userVal);
    console.log(score);
    if (Number(userVal) === score) {
      this.value = 0;
      this.error = '';
      this.addGoodAnswer.emit();
      this.generateNewQuestion();
    } else {
      this.error = 'Not good, you must try again!';
    }
  }

  generateNewQuestion() {
    this.number1 = Math.floor(Math.random() * 100) + 1;
    this.number2 = Math.floor(Math.random() * 100) + 1;
    this.sign = Math.floor(Math.random() * 4);
  }
}
