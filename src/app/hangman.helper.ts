import { Pipe, PipeTransform } from '@angular/core';
import * as R from "ramda";

export namespace Hangman {

  // Join the list of characters together with a space in-between.
  export function wordJoin(word : Array<string>) : Array<string> {
    let spacedLength = (0 === word.length) ? 0 : word.length*2 -1 ;
    let spacedWord = Array<string>(spacedLength).fill(' ') ;
    word.forEach((letter, i) => spacedWord[i<<1] = letter) ;
    return spacedWord ;
  }

  // The possible letters for Hangman as a set.
  export function alphaSet() : Set<string> {
    let aCharCode : number = 'A'.charCodeAt(0)
    return new Set<string>(R.range(0, 26).map(i => String.fromCharCode(i + aCharCode)))
  }

  // Maximum guess count for Hangman.
  export function maxGuessess() : number {
    return 6
  }

  // Generate a new guess list based on letter, current matches, and actual word.
  export function applyGuess(letter : string, guessList : Array<string>, hangList : Array<string>) : Array<string> {
    return R.zipWith((a,b) => (b === letter) ? b : a, guessList, hangList) ;
  }

  // Generate a new guess set based on letter, current set, and actual word.
  export function applyGuess_(letter : string, guessSet : Set<string>, hangList : Array<string>) : Set<string> {
    return ( (! guessSet.has(letter)) && (alphaSet().has(letter)) && (-1 === hangList.indexOf(letter)) )
      ? new Set<string>(guessSet).add(letter)
      : new Set<string>(guessSet) ;
  }
}

// Moved outside of 'Hangman' namespace due to an AOT issue when building.
// As above function, except wrapped as an Angular 2 pipe.
@Pipe({
name: 'spaced'
})
export class SpacedPipe implements PipeTransform {
  transform(word: string): string {
    return Hangman.wordJoin(word.split('')).join('') ;
  }
}
