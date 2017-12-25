import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import * as R from "ramda";


@Injectable()
export class WordService {

  // https://404it.no/en/blog/javascript_get_base_url_or_root_url
  // https://developer.mozilla.org/en-US/docs/Web/API/Location
  private baseUrl() : string {
	  let re = new RegExp(/^.*\//);
	  return re.exec(window.location.href)[0];
    }

  private words : Array<string> ;
  constructor(private http: Http) {
    http.get(this.baseUrl() + 'resources/dictionaryWords.txt')
    .map((res : Response) => res.text())
    .map(text => text.toUpperCase())
    .map(text => text.split('\n'))
    .map(words => R.map(R.trim, words))
    .subscribe(
      words => {
        this.words = words ;
      },
      err => console.error(`Hangman word list loading error - ${err}.`),
      () => console.log('Hangman word list loaded!')
    );
  }

  // Generate a random integer in range 0 to max.
  private static getRandomInt(max: number): number {
    return Math.floor(Math.random() * (max + 1));
  }

  // A single random word for the 'words' array.
  randomWord() : string {
    let word : string = 'HANGMAN'
    if (0 < this.words.length) {
      let pos: number = WordService.getRandomInt(this.words.length - 1);
      word = this.words[pos];
    }
    return word ;
  }
}
