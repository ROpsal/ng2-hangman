# Angular Hangman Game#

----------

The Hangman word-guessing game hits a nice sweet spot when learning a new computer language. Not as trivial as "Hello World" but not overly difficult to implement.

This version of Hangman was written utilizing the [Typescript](https://www.typescriptlang.org/) language and the [Angular](https://angular.io/) framework.  For this release, Typescript is at version 3.2.4 and Angular is at version 7.2.6.

![window view](https://github.com/ROpsal/ng2-hangman/blob/master/images/window.png)

## Prerequisites

This project needs [node](https://nodejs.org/en/) and the node package manager (npm).  Currently node is at version 10.14.2 and npm at version 6.7.0. Grab the MSI installer at [https://nodejs.org/en/](https://nodejs.org/en/). This also installs the node package manager.

## Getting Started

This project was generated with version 7.3.3 of [angular-cli](https://github.com/angular/angular-cli).  Follow the angular-cli directions for installing but basically:

	npm install -g @angular/cli@latest

From the Hangman project root directory, install *node* modules using:

	npm install

## Development server
Run `ng serve` for a development server. Navigate to `http://localhost:4200/` to view. The app will automatically rebuild and reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Add the `--prod` flag for a production build.

To change the base URL in the `index.html` file from  ```<base href="/">``` to ```<base href="/ng-hangman">``` use:

	ng build --prod --base-href /ng-hangman

## Jetty Runner

To use the Jetty-Runner web server, utilize the following from the `ng-hangman` directory:

	java -jar jetty-runner.jar --port 9090 dist

Navigate to `http://localhost:9090` to load the application in your browser.

## Play Hangman
[ng-hangman](http://ng.hangman.fastmail.com.user.fm/)

## Further help

To get more help on the `angular-cli` use `ng --help` or go check out the [Angular-CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
