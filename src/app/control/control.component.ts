import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.scss']
})
export class ControlComponent implements OnInit {

  // 'New Game' button events are pushed to this subject.
  private newGameSubject = new Subject() ;

  constructor() {}
  ngOnInit() {}

  // Pass a routine that processes New Game requests.
  consumeNewGame(consumer : () => any) : void {
    this.newGameSubject.asObservable().subscribe(consumer) ;
  }
}
