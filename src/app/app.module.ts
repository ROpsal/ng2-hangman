import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { WordService } from './word.service';
import { PlayGameService } from './playgame.service';
import { HangmanComponent } from './hangman/hangman.component';
import { ControlComponent } from './control/control.component';
import { StatusComponent } from './status/status.component';
import { WinsComponent } from './wins/wins.component';
import { KeyboardComponent } from './keyboard/keyboard.component';
import * as hm from './hangman.helper';

@NgModule({
  declarations: [
    AppComponent,
    HangmanComponent,
    ControlComponent,
    KeyboardComponent,
    StatusComponent,
    WinsComponent,
    hm.SpacedPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    FlexLayoutModule
  ],
  providers: [
    WordService,
    PlayGameService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
