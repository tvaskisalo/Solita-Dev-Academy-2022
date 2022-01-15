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

For fetching data and making HTTP-requests I have two options that I have experience with: GraphQL and REST. This is not an obvious choice. Using GraphQL has benefits such as: fewer endpoints and spesific data fetching. Usage of GraphQL would also demonstrate skill. However since the application will not be that large and it will not have that many endpoints, so the usage of GraphQL is not more beneficial compared to REST. REST is easier and faster to implement. I will be using axios for communication with the server. This is purely a familarity reason. I personally think that picking technologies just for the sake of displaying skill is not the best idea. I think that it is important to make desicions based on what will improve the development and the product instead of making desicions based on how one can show off skills. Usually reducing complexity and development time will make the application in question better and more fault-tolerant. 

State management will be implemented with Redux. Usage of redux is not mandatory, but in my opinion it makes state management easier to develop and understand.

For UI I will be using Material UI. It is a simple and clean UI library that will make the program look better.

For testing I will be using Jest and react-testing-library for familarity reasons.

I will also do E2E testing with cypress, if I have the time. 

### Backend

I will implement the backend with Node.js. The only reason is that I am familiar with it and do not really know other backend frameworks sufficently enough.

I will take a step outside of my comfortzone and use TypeScript for the backend. I want to use this project as a learning opportunity and improve my proficiency with TypeScript. Creating the backend with TypeScript allows me to enforce data structures and types in the backend and database. I think that TypeScript's benefits are more important in the backend than in the frontend. Especially if someone wants to deploy a different frontend for the backend in the future. Of course typing both the frontend and backend with TypeScript would enforce the rules the best, but I am slower at developing with TypeScript than JavaScript. I think the extra time investment, for writing both with TypeScript, will not be worth it, since I can already display some skills with TypeScript and I would lose the ability to display skill with JavaScript. (Even though anyone who can develop TypeScript can by default write JavaScript, but TypeScript forces you to write clean code. It is also important to be able to write clean JavaScript, without TypeScript's rules). This also does not fight against the point I made earlier. TypeScript has valid benefits and will not increase the complexity and development time all that much.

For the backend database I have two options I am familiar with: MongoDB and PostgreSQL. As of now I have not made the desicion what I will go with. Most likely with MongoDB for experience reasons. I would like to use PostgreSQL, because I like the challenge that SQL makes, but I am not sure if it is worth it for this project.

Token authentication will be used to enforce privacy. For this I will be using libraries bcrypt for hashing and jsonwebtoken for tokens. 

For backend testing I will be using supertest for familarity reasons.






