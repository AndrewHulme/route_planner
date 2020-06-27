## Features


## Tech Stack:

- [React](https://reactjs.org) for the front end controller
- [Firebase](https://firebase.google.com) for the backend
- [Cypress](https://www.cypress.io/) for end-to-end testing
- [Istanbul](https://istanbul.js.org/) for test coverage
- [Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/tutorial) for displaying maps
- [Location IQ API](https://locationiq.com/) for converting user input locations to geographic coordinates
- [Open Route Service API](https://openrouteservice.org/) for route planning
- [GraphHopper API](https://www.graphhopper.com/) for map controller
- [Bootstrap](https://getbootstrap.com/) for styling

## Installation

* Clone this repository
* Navigate to local repository
* Install dependencies
`npm install`
* Start react server
`npm start`
* Got to [http://localhost:3000](http://localhost:3000)

## Testing
* Make sure the server is running, if not, run in the terminal:
`npm start`
* Start Cypress to run the tests:
`npx cypress open`
* Click on `Run all specs`

## Agile Development Process

Our team used an agile development process with regular sprints to deliver this application.
We followed the Extreme Programming values - all features were pair programmed, team members shared all the changes in the code design, the team used test-driven development, and delivered an MVP in the first sprint. 
During development we used an agile process of git branches, merges, regular code reviews, and continuous integration.

View [our project board here](https://github.com/AndrewHulme/route_planner/projects/1), and [our learning journal here](https://github.com/AndrewHulme/route_planner/wiki).

## User Stories

```
As a user
So I can create my profile
I want to be able to sign up
```

```
As a user
So I can use the route planner
I want to be able to log in
```

```
As a user
So I can select a start point for my route
I want to be able to choose the starting location or use my current location
```

```
As a user
So I can choose the type of activity
I can choose between walk, run and cycle
```

```
As a user
So I can choose how long I want to exercise
I can choose the time or distance that my route will take
```

```
As a user
So I can get back to my starting position
I can choose if the route will be circular
```

```
As a user
So I can escape the city life
I can choose if my route has green spaces
```

```
As a user
So I can plan my exercise route
I want to be able to generate a route based on my choices
```

```
As a user
So I can show off my achievements
I want to be able to share my routes with my friends
```

```
As a user
So I can collaborate with others
I can add friends to my profile
```
