// Displays the graphic for Hangman.
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hangman',
  templateUrl: './hangman.component.html',
  styleUrls: ['./hangman.component.scss']
})
export class HangmanComponent implements OnInit {
  private bodyColor    = 'RebeccaPurple' ;
  private gallowsColor = 'SaddleBrown' ;
  private nooseColor   = 'Peru' ;

  private canvasGallows : HTMLCanvasElement ;
  private canvasHangman : HTMLCanvasElement ;

  constructor() { }

  ngOnInit() {
    // Initialize canvas to element's dimensions and return canvas.
    const initCanvas = (id : string) : HTMLCanvasElement => {
      const canvas = <HTMLCanvasElement>document.getElementById(id) ;
      if (canvas) {
        const positionInfo = canvas.getBoundingClientRect() ;
        if (positionInfo) {
          canvas.height = positionInfo.height ;
          canvas.width  = positionInfo.width ;
        }
      }
      return canvas;
    } ;

    // Initialize the two layers.
    this.canvasGallows = initCanvas('gallows') ;
    this.canvasHangman = initCanvas('hangman') ;

    this.drawGallows() ;    // This on gallow's canvas.
    this.drawSmiley() ;     // This on hangman's canvas as smiley face.
  }

  private drawSmiley() {
    const canvas = this.canvasHangman;
    if (canvas) {
      const context = canvas.getContext('2d') ;
      const centerX = canvas.width  >> 1 ;    // Middle of drawing.
      const centerY = canvas.height >> 1 ;    // Center of head.
      const radius  = canvas.height  / 5 ;
      const eyeRadius  = canvas.height >> 6 ;
      const eyeXOffset = canvas.height >> 4 ;

      // Keep these items fixed.
      context.lineWidth = 5 ;
      context.strokeStyle = this.bodyColor ;
      context.fillStyle = this.bodyColor ;

      // Draw the head's circle.
      context.beginPath() ;
      context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false) ;
      context.stroke() ;

      // Draw the eyes.
      context.beginPath() ;
      const eyeXL = centerX - eyeXOffset ;
      const eyeXR = centerX + eyeXOffset ;
      const eyeY  = centerY - eyeXOffset ;
      context.arc(eyeXL, eyeY, eyeRadius, 0, 2 * Math.PI, false) ;
      context.arc(eyeXR, eyeY, eyeRadius, 0, 2 * Math.PI, false) ;
      context.fill() ;

      // Draw the big smile.
      context.beginPath() ;
      context.arc(centerX, centerY, radius / 1.5, 0, Math.PI, false) ;
      context.stroke() ;
    }
  }

  private drawGallows() {
    const canvas = this.canvasGallows;
    if (canvas) {
      const context = canvas.getContext('2d') ;
      const lineWidth = 12 ;
      const halfWidth = lineWidth >> 1 ;

      // Keep these items fixed.
      context.lineWidth = lineWidth ;
      context.strokeStyle = this.gallowsColor ;

      context.beginPath() ;

      // Draw the frame.
      context.moveTo(halfWidth, halfWidth) ;
      context.lineTo(canvas.width - halfWidth, halfWidth) ;
      context.lineTo(canvas.width - halfWidth, canvas.height - halfWidth) ;
      context.lineTo(halfWidth, canvas.height - halfWidth) ;
      context.lineTo(halfWidth, 0) ;

      // Draw the braces.
      context.moveTo(halfWidth, canvas.height / 3) ;
      context.lineTo(canvas.height / 3, halfWidth) ;
      context.moveTo(canvas.width - canvas.height / 3, halfWidth) ;
      context.lineTo(canvas.width - halfWidth, canvas.height / 3) ;

      context.stroke() ;
    }
  }

  private drawNoose() {
    const canvas = this.canvasHangman ;
    if (canvas) {
      const context = canvas.getContext('2d') ;

      // Keep these items fixed.
      context.lineWidth = 6 ;
      context.strokeStyle = this.nooseColor ;

      context.beginPath() ;
      context.moveTo(canvas.width >> 1, 0) ;
      context.lineTo(canvas.width >> 1, canvas.height / 6) ;
      context.stroke() ;
    }
  }

  // Configured as a callback.
  drawBody = (parts : number = 0) : void => {
    const canvas = this.canvasHangman;
    if (canvas) {
      const context = canvas.getContext('2d') ;

      // Clear out everything on this layer!
      context.clearRect(0, 0, canvas.width, canvas.height) ;

      // If no body parts to draw, then do smiley otherwise do noose.
      (0 === parts) ? this.drawSmiley() : this.drawNoose() ;

      // Keep these items fixed.
      context.lineWidth = 5 ;
      context.strokeStyle = this.bodyColor ;

      // Here we draw the body, one piece at a time.
      const radius   = canvas.height / 12 ;
      const diameter = canvas.height / 6 ;
      const bodyCenterX = canvas.width >> 1 ;
      const headCenterY = radius + diameter ;

      if (0 < parts) {
        // Draw the head.
        context.beginPath() ;
        context.arc(bodyCenterX, headCenterY, radius, 0, 2 * Math.PI, false) ;
        context.stroke() ;
      }

      if (1 < parts) {
        context.beginPath() ;

        // Draw the torso.
        context.moveTo(bodyCenterX, diameter << 1) ;
        context.lineTo(bodyCenterX, diameter << 2) ;
      }

      if (2 < parts) {
        // Draw a leg.
        context.lineTo(bodyCenterX + diameter, diameter * 5) ;
      }

      if (3 < parts) {
        // Draw a leg.
        context.moveTo(bodyCenterX, diameter << 2) ;
        context.lineTo(bodyCenterX - diameter, diameter * 5) ;
      }

      if (4 < parts) {
        // Draw an arm.
        context.moveTo(bodyCenterX, diameter * 2.5) ;
        context.lineTo(bodyCenterX + radius * 2, diameter << 1) ;
      }

      if (5 < parts) {
        // Draw an arm.
        context.moveTo(bodyCenterX, diameter * 2.5) ;
        context.lineTo(bodyCenterX - radius * 2, diameter << 1) ;
      }

      if (0 < parts) {
        context.stroke() ;
      }
    }
  }
}
