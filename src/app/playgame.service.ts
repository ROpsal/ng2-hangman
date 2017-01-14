import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { Hangman as hm } from './hangman.helper';
import { WordService } from './word.service';

// Holder of state information for the Hangman game.
export interface StatusInfo {
  caption   : string ;
  hangWord  : string ;
  guessWord : string ;
  guessSet  : Set<string> ;
  active    : boolean ;
  wins      : number ;
  losses    : number ;
}

@Injectable()
export class PlayGameService {

  public statusInfo : StatusInfo = {
    caption   : 'Welcome to the Hangman Word Guessing Game!',
    hangWord  : 'HANGMAN',
    guessWord : 'HANGMAN',
    guessSet  : new Set<string>(),
    active    : false,
    wins      : 0,
    losses    : 0
  }

  // Monitors count of body parts.
  private bodyPartsSubject = new Subject<number>() ;
  private bodyPartsObservable = this.bodyPartsSubject.asObservable() ;

  // Get reference to word source.
  constructor(private wordService : WordService) {
  }

  // Important! -> This is an "instance" method for the class!
  playLetter = ( letter : string ) : void => {
    console.log(`Play letter : ${letter}`) ;

    if (this.statusInfo.active) {
      let guessList = this.statusInfo.guessWord.split('') ;
      let hangList  = this.statusInfo.hangWord.split('') ;
      guessList = hm.applyGuess(letter, guessList, hangList) ;
      this.statusInfo.guessWord = guessList.join('') ;

      let guessSet = this.statusInfo.guessSet ;
      this.statusInfo.guessSet = hm.applyGuess_(letter, guessSet, hangList) ;
      this.bodyPartsSubject.next(this.statusInfo.guessSet.size) ;
      console.log(`Guess set   : ` + Array.from(this.statusInfo.guessSet)) ;

      if (this.statusInfo.guessWord === this.statusInfo.hangWord) {
        this.statusInfo.wins++ ;
        this.statusInfo.active = false ;
        let caption = (0 === this.statusInfo.guessSet.size)
          ? 'Congratulations ⇨ Fantastic play!'
          : 'Congratulations on your win!' ;
        this.statusInfo.caption = caption ;
      }

      else if (this.statusInfo.guessSet.size >= hm.maxGuessess()) {
        this.statusInfo.losses++ ;
        this.statusInfo.active = false ;
        this.statusInfo.caption = 'Better luck on the next word!' ;
        this.statusInfo.guessWord = this.statusInfo.hangWord ;
      }

      else if (this.statusInfo.guessSet.size+2 == hm.maxGuessess()) {
        this.statusInfo.caption = 'Two chances remaining!' ;
      }

      else if (this.statusInfo.guessSet.size+1 == hm.maxGuessess()) {
        this.statusInfo.caption = 'Take care, only one chance left!' ;
      }

      else {
        this.statusInfo.caption = '' ;
      }
    }
  }

  // Important! -> This is an "instance" method for the class!
  newGame = () : void => {

    if (this.statusInfo.active && (0 < this.statusInfo.guessSet.size)) {
      this.statusInfo.losses++ ;
    }

    this.statusInfo.caption   = '' ;
    this.statusInfo.hangWord  = this.wordService.randomWord() ;
    console.log(`New hangWord is \'${this.statusInfo.hangWord}\'!`) ;
    this.statusInfo.guessWord = '_'.repeat(this.statusInfo.hangWord.length) ;
    this.statusInfo.guessSet.clear() ;
    this.bodyPartsSubject.next(this.statusInfo.guessSet.size) ;
    this.statusInfo.active    = true ;
  }

  // Pass a routine that processes count of body parts.
  consumeBodyParts(consumer : (parts : number) => any) : void {
    this.bodyPartsObservable.subscribe(consumer) ;
  }
}
