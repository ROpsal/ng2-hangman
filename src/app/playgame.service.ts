import { Injectable } from '@angular/core';
import { Subject } from 'rxjs' ;

import * as hm from './hangman.helper';
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
  } ;

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
      const hangList  = this.statusInfo.hangWord.split('') ;
      guessList = hm.applyGuess(letter, guessList, hangList) ;
      this.statusInfo.guessWord = guessList.join('') ;

      const guessSet = this.statusInfo.guessSet ;
      this.statusInfo.guessSet = hm.applyGuess_(letter, guessSet, hangList) ;
      this.bodyPartsSubject.next(this.statusInfo.guessSet.size) ;
      console.log(`Guess set   : ` + Array.from(this.statusInfo.guessSet)) ;

      if (this.statusInfo.guessWord === this.statusInfo.hangWord) {
        this.statusInfo.wins++ ;
        this.statusInfo.active = false ;
        this.statusInfo.caption = (0 === this.statusInfo.guessSet.size)
          ? 'Congratulations ⇨ Fantastic play!'
          : 'Congratulations on your win!' ;
      }

      else if (this.statusInfo.guessSet.size >= hm.maxGuesses()) {
        this.statusInfo.losses++ ;
        this.statusInfo.active = false ;
        this.statusInfo.caption = 'Better luck on the next word!' ;
        this.statusInfo.guessWord = this.statusInfo.hangWord ;
      }

      else if (this.statusInfo.guessSet.size + 2 === hm.maxGuesses()) {
        this.statusInfo.caption = 'Two chances remaining!' ;
      }

      else if (this.statusInfo.guessSet.size + 1 === hm.maxGuesses()) {
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
