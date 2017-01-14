import { Component, AfterViewChecked } from '@angular/core';
import { PlayGameService, StatusInfo } from '../playgame.service'


@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements AfterViewChecked {

  statusInfo : StatusInfo ;
  constructor(playGameService : PlayGameService) {
    this.statusInfo = playGameService.statusInfo ;
  }

  ngAfterViewChecked() {
    // This keeps the status height from shrinking when caption is hidden.
    let statusElement = document.getElementById('status-component');
    if (statusElement) {
      let positionInfo = statusElement.getBoundingClientRect();
      if (positionInfo) {
        statusElement.style.minHeight = positionInfo.height + 'px' ;
      }
    }
  }
}
