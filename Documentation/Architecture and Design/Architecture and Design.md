# Architecture and Design

The idea is to dedicate time to understand the given problem and model it using simple architecture diagrams. I strongly believe that making a good and comprehensive solution to a problem demands a proper plan. Understanding the domain and the problem is integral for the solution. One has to realize the problem, before one can solve it. 

This file will descibe the parts of the problem, the architecture behind it and the way I decided to develop the software. I will give reasoning why I went with each technology and what architectural problem it solves. The architecture documentation of the project will be basic, since the assignment isn't the largest nor is it wise to invest massive amounts of time on planning, that can change during development. I will update the architecture as I develop the software.

## The problem of the assignment

First I will describe the assignment's problem. In the program each farm can view and manage their own data. The data should be coherent, easy to interpret and easy to manage. A customer should be able to at least add new datapoints and view previous datapoints. The data has a certain structure and the data contain errors. The farmers would prefer to have some statistical tools for the data to get important knowledge.

The problem can be divided to two rough categories: The backend and the frontend of the software. Relevant words for the software are usability, safety,  authorization and authentication.

### Frontend subproblems

#### Core problems

To ensure that unwanted party can access and manage the farmer's data, user authentication has to be implemented.

Farmers should be able to add new datapoints.

There must be a way to access data from the server. 

There must be a way to show data from the server in some good way.

#### Other problems and considerations

Intuitive way to use the application is essential for it's usage. Good UI is relevant.

### Backend subproblems

#### Core problems

To ensure that unwanted party can access and manage the farmer's data, user authentication has to be implemented.

Data integrity, safety and validation must be kept in mind.

A way to fetch data in different forms is needed.

#### Other problems and considerations

Statistical tools for the front end is beneficial to good ui. 

User and data management should be implemented in some regard. 

## Solution and reasoning for technologies

### Overall

The usage of eslint will guarantee coherent and readable code.

I want to implement cypress for the software, but it is rather time consuming, so I will see if I have the time.

### Frontend

I will be using React to implement the frontend. The biggest reasoning is familarity. I am the most fluent with react compared to other frontend libraries/frameworks. Using a familiar library will make the development time faster, reduce errors and produce cleaner code.

For fetching data and making HTTP-requests I have two options that I have experience with: GraphQL and REST. This is not an obvious choice. Using GraphQL has benefits such as fewer endpoints and spesific data fetching. Usage of GraphQL would also demonstrate skill. However since the application will not be that large and it will not have that many endpoints, the usage of GraphQL is not more beneficial compared to REST. REST is easier and faster to implement. I will be using axios for communication with the server. This is purely a familarity reason.

State management will be implemented with Redux. Usage of redux is not mandatory, but it makes state management easier to develop and understand.

For UI I will be using Semantic-ui library. It is a simple and clean UI library that will make the program look better.

For testing I will be using Jest and react-testing-library for familarity reasons.

### Backend

I will implement the backend with Node.js. The only reason is that I am familiar with it and do not really know other backend frameworks sufficently enough.

For the backend database I have two options I am familiar with: MongoDB and PostgreSQL. As of now I have not made the desicion what I will go with. Most likely with MongoDB for experience reasons.

For backend testing I will be using supertest for familarity reasons.






