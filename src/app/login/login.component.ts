import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  @Input() name = '';
  @Output() go = new EventEmitter();

  enterGame() {
    if (this.name) {
      this.go.emit();
    }
  }
}
