# ThereAndBack App

The final project created by team JAZE ([Jed Stanton](https://github.com/JStant95), [Andrew Hulme](https://github.com/AndrewHulme), [Zsofia Szonyi](https://github.com/ZsofiaS), [Ed Ancerys](https://github.com/EdAncerys)) at Makers Academy.

Check out our app at [http://myrouteplanner.surge.sh/](http://myrouteplanner.surge.sh/)

[Specification](#specification) | [Tech Stack](#tech-stack) | [Installation](#installation) | [Running tests](#running-tests) | [Development Process](#development-process) | [Further development](#further-development)

# Specification

The app aims to solve the problem of the user who wants to find a circular route for outdoor activities (walking, cycling, hiking).
The user can view the map and search for routes without logging in, either circular routes, or routes between a start and end point. Different activity types can be selected, and the result can be randomised.
Once the user is logged in, favourite routes can be saved in _My Routes_ and can be viewed on the map, or they can be removed from the list.

# Tech Stack:

- [React](https://reactjs.org) for the front end
- [Firebase](https://firebase.google.com) for the backend (Firestore and Authentication)
- [Cypress](https://www.cypress.io/) for end-to-end testing
- [Istanbul](https://istanbul.js.org/) for test coverage
- [Leaflet](https://leafletjs.com/) for mapping
- [Location IQ API](https://locationiq.com/) for converting user input locations to geographic coordinates
- [Open Route Service API](https://openrouteservice.org/) for route planning
- [GraphHopper API](https://www.graphhopper.com/) for map controller
- [Bootstrap](https://getbootstrap.com/) & CSS for styling

# Installation

- Clone this repository
  `$ git clone https://github.com/AndrewHulme/route_planner.git`
- Navigate to local repository
  `$ cd route-planner`
- Install npm if you don't already have it
- Install all dependencies
  `$ npm install`
- Start the server
  `$ npm start`
- Navigate to [http://localhost:3000](http://localhost:3000) in your browser

# Running tests

- Start the server in the terminal if it is not running yet:
  `$ npm start`
- Start Cypress to run the tests:
  `$ npx cypress open`
- Click on `Run all specs`

# Development Process

Our team used an agile development process with regular sprints to deliver this application.
We followed the Extreme Programming values - all features were pair programmed, team members shared all the changes in the code design, the team used test-driven development, and delivered an MVP in the first sprint.
During development we used an agile process of git branches, merges, regular code reviews, and continuous integration.
We had daily stand-ups and retrospectives to update each other on the tasks completed, and reflect on our team's progress.

View [our project board here](https://github.com/AndrewHulme/route_planner/projects/1), and [our learning journal here](https://github.com/AndrewHulme/route_planner/wiki).

## Initial planning

We agreed to create an app that can be used to search for routes with the main focus on finding circular routes.
This is an actual problem we faced when we tried to plan routes for cycling or walking, as it is currently not possible to plan circular routes on other web mapping services without providing multiple waypoints.
We knew we wanted to have a React frontend, and the majority of the app will be on the frontend, but we also needed a light backend and decided to go for Firebase.
We created mockups and diagrams to visualise the MVP and the flow of information within the app.

## MVP

Our aim for the MVP was to have an interface with a map, and a form where the user can input a start and end point, these points get converted to geographic coordinates and the route displayed on the map. We achieved this by the end of the first 2-day sprint.

## Adding features to MVP

With a working MVP we moved on and decided to add a database where the user can save routes.
We also setup authentication to the app with Firebase.

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

# Further development

We are planning to extend the app with extra features:

- show user's location in realtime
- add friends & be able to see their saved routes
- make it into a mobile app
