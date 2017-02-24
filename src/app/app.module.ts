import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {APP_BASE_HREF} from '@angular/common';

import { AppComponent } from './app.component';
import { WordService } from './word.service';
import { PlayGameService } from './playgame.service'
import { HangmanComponent } from './hangman/hangman.component';
import { ControlComponent } from './control/control.component';
import { StatusComponent } from './status/status.component';
import { KeyboardComponent } from './keyboard/keyboard.component';
import { Hangman as hm } from './hangman.helper';
import { MDL } from './mdl.directive';



@NgModule({
  declarations: [
    AppComponent,
    HangmanComponent,
    ControlComponent,
    KeyboardComponent,
    StatusComponent,
    hm.SpacedPipe,
    MDL
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    WordService,
    PlayGameService,
    {provide: APP_BASE_HREF, useValue: window['baseUrl']}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
