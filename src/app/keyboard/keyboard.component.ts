import { Component, OnInit } from '@angular/core';
import { Observable, Subject, fromEvent, merge } from 'rxjs';
import { debounceTime, filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.scss']
})
export class KeyboardComponent implements OnInit {

  // Items for the virtual keyboard!
  private upperKeys : Array<string> = 'QWERTYUIOP'.split('') ;
  private innerKeys : Array<string> = 'ASDFGHJKL'.split('') ;
  private lowerKeys : Array<string> = 'ZXCVBNM'.split('') ;
  readonly rowsOfKeys : Array<Array<string>> = [this.upperKeys, this.innerKeys, this.lowerKeys] ;

  // Keys that have been "used" by the Hangman game.
  private usedKeySet : Set<string> = new Set<string>() ;

  // Input from "virtual" keyboard.
  private virtualKeySubject = new Subject<string>() ;
  private virtualKeyObservable = this.virtualKeySubject.asObservable() ;

  // Input from actual keyboard events.
  private actualKeyObservable : Observable<string> ;

  constructor() {

    // Predicate for letter is in range check.
    const isLetterAtoZ = (letter : string) : boolean => {
      return ('A'.charCodeAt(0) <= letter.charCodeAt(0))
          && ('Z'.charCodeAt(0) >= letter.charCodeAt(0)) ;
    } ;

    this.actualKeyObservable = fromEvent(document.body, 'keyup')
      .pipe(
        map((e : KeyboardEvent) => typeof(e.key) !== 'undefined' ? e.key : String.fromCharCode(e.keyCode)),
        map((text : string)  => text.toUpperCase()),
        filter((text : string) => 1 === text.length),
        filter((letter : string) => isLetterAtoZ(letter)),
        debounceTime(100)
      ) ;
  }

  ngOnInit() {
    // Edit here - For debug!
    this.consumeLetters((letter : string) => console.log(`Consume : ${letter}`));

    // Stores keys that we've already used.
    this.consumeLetters((letter : string) => this.usedKeySet.add(letter)) ;
  }

  // Return true when key has been used!
  isKeyUsed(letter : string) : boolean {
    return this.usedKeySet.has(letter) ;
  }

  // Important! -> This is an "instance" method for the class!
  // Resets keyboard to none used!
  resetKeyboard = () : void => {
    this.usedKeySet.clear() ;
  }

  // Pass a function that consumes a stream of letters.
  consumeLetters(consumer : (letter : string) => any) : void {

    // Combine two observables together as one and then subscribe.
    merge(this.actualKeyObservable, this.virtualKeyObservable).subscribe(consumer) ;
  }
}
