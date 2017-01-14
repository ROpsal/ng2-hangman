import { Component, AfterViewInit, ViewChild } from '@angular/core';

import { PlayGameService } from './playgame.service' ;
import { ControlComponent } from './control/control.component' ;
import { KeyboardComponent } from './keyboard/keyboard.component' ;
import { HangmanComponent } from './hangman/hangman.component' ;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: []
})

export class AppComponent  implements AfterViewInit {

  @ViewChild(KeyboardComponent) private keyboardComponent : KeyboardComponent ;
  @ViewChild(ControlComponent) private controlComponent : ControlComponent ;
  @ViewChild(HangmanComponent) private hangmanComponent : HangmanComponent ;

  constructor(private playGameService : PlayGameService) {}

  ngAfterViewInit() : void {
    this.controlComponent.consumeNewGame(this.playGameService.newGame) ;
    this.controlComponent.consumeNewGame(this.keyboardComponent.resetKeyboard) ;
    this.keyboardComponent.consumeLetters(this.playGameService.playLetter) ;
    this.playGameService.consumeBodyParts(this.hangmanComponent.drawBody) ;
  }
}
