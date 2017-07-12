# Tote project 

## Overview

The project is to demo calculate the dividends for a simplified form of Tote betting using Angular 4, bootstrap 4, SCSS, CSS3 and HTML5.

## project structure
This is a simple demo web application project, so we only have a tote-bet feature module and a shared module under the root app module.

The shared module is for reusable pipes, directives, etc. for other feature modules.

The tote-bet feature module contains bet-panel UI component, services, models, etc. 
The bet-panel component allows user to input bets and results data, load example data and submit the data to generate the dividends output.

## Dividend and calculator services architecture

To make sure that it is easy to modify the calculator logic of Win, Place and Exacta products and add new products in future, 
this project uses Command design pattern to separate the calculator logic into the following individual calculator services such as:
 * win-cal.service.ts
 * place-cal.service.ts
 * exacta-cal.service.ts
 
The calculator services all implements CalculatorInterface, which specifies the calculateDividends() method to calculate dividend. 
The Bet model and Dividend model in the calculateDividends method signature are generic for the three products, so all products can implement the same method.
The dividend.service.ts provides a calculators array to allow developer register calculator services and those registered calculators will be used calculate dividends of all products automatically.

To add a new calculator, you can just simply add a new service that implements CalculatorInterface and register it in the calculators array of DividendService.


## Prerequisites
This project have dependencies that require Node 6.9.0 or higher, together with NPM 3 or higher.

## Installation
BEFORE YOU INSTALL: please read the [prerequisites](#prerequisites)
```bash
npm install
```
## Run the web application development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Other usage

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Tote betting introduction
Tote betting involves punters choosing the outcome of a race by placing bets into a pool of money. Punters
who successfully predict the outcome of a race take a share of the pool proportional to their stake. For
example, a punter who places a $2 bet on a winning selection would receive twice the winnings of a punter
who placed a $1 stake. Tabcorp takes a commission out of the pool before it is split between winning punters.

The calculator must support three products with the following rules:
### WIN
* Punters must choose the winner of a race
* Tabcorp takes a 15% commission from the Win pool
* The remaining total is split, proportionally to stake, amongst punters who chose the correct winning horse.
### PLACE
* Punters must choose the first, second or third place horse in a race
* Tabcorp takes a 12% commission from the Place pool
* The total pool is split evenly into 3 and each of these amounts is then split, proportionally to stake,
amongst the punters who chose each placed horse
### EXACTA
* Punters must choose the first and second place runners in a race in the correct order
* Tabcorp takes an 18% commission from the Exacta pool
* The remaining total is split, proportionally to stake, amongst punters who chose the correct first and
second horse in correct order

After a race has been run, Tabcorp publishes the dividends for each product. This is the return for a $1 stake for each paying selection in the race. 
All dividends are calculated to the nearest 0.01.
