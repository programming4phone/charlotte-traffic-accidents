# Charlotte Traffic Accidents

Charlotte Traffic Accidents is an Angular 2 application that provides instant access to traffic accident information...directly from the Charlotte Mecklenburg Police Department. 

The app calculates the distance from your current browser location to each accident. Plan your alternate route from the  map generated for each accident!

The app is currently deployed on [www.programming4phone.com](http://www.programming4phone.com/accidents/index.html).

The app interacts with with a micro service that pulls information from the Charlotte Mecklenburg Police Department SOAP web service and converts the contents to JSON with CORS headers. For details see [https://github.com/programming4phone/accidents.collector](https://github.com/programming4phone/accidents.collector).

This app was originally an [Android app] (https://play.google.com/store/apps/details?id=com.programming4phone.cmpd.accidents) and was converted to Angular 2 to allow device independence.

## Development stack
This project was generated with [angular-cli](https://github.com/angular/angular-cli) version 1.0.0-beta.24. The code base also uses Semantic UI 2.2 for styling HTML markup.

The app displays a map showing the location of each accident. These maps are rendered by [angular2-google-maps](https://angular-maps.com/). A Google Maps API key is needed to use this component.

## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class/module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Deploying to Github Pages

Run `ng github-pages:deploy` to deploy to Github Pages.

## Further help

To get more help on the `angular-cli` use `ng help` or go check out the [Angular-CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
