# Solita-Dev-Academy-2022
Repository for the Solita Dev Academy 2022 pre-assignment 


## Instructions


### Requirements
The application requires npm and node to be installed. The app has been developed with npm version 8.1.0 and node version 16.13.0 using Ubuntu. I have also verified that npm version 6.14.13 and node version 14.17.3 work with Windows 10. 

### Installation and running

Clone the project.

Configure the .env file in the backend according to the .envtemplate. The backend will not work without proper JWT_SERCRET and MONGODB_URI. The backend tests will not work without MONGODB_TEST_URI. I will not provide the .env myself due to mongoDB security reasons.

Run npm install in both directories ./farmers_backend and ./farmers_frontend. This will install all the neccessary libraries for the frontend and the backend.

Run npm run dev in ./farmers_backend to start the backend. Unless PORT has been defined in .env the backend will try to run in port 3001.

Run npm start in ./farmers_frontend to start the frontend. The fronend will expect that the backend is running on http://localhost:3001/. This unfortunately is hard-coded due to problems with proxy settings. If you need to change the backend port, change the constant baseUrl to 'http://localhost:PORT/api/data' in ./farmers_frontend/src/services/dataService.js and to 'http://localhost:PORT/api/login' in ./farmers_frontend/src/services/loginService.js. The frontend will be running on port 3000 on default. 

If you wish, you can initialize the database with all the provided .csv data with running npm run initDB in ./farmers_backend. I do not recommend this, since it took me 15 mins to run it. This has been confirmed to work with Linux. It should work with Windows, but I can not confim this. If you want to see the app running with the .csv data go to the provided heroku-link down below. More info about the initialization can be found at './farmers_backend/src/utils/initDB.ts'

### Tests

Backend tests can be run with npm run dev in ./farmers_backend

## Application specs

The application is a data management application. Each user can add, view datapoints and look at the statistics of their datapoints based on date, pH, temperature and rainfall.

Backend apis are:

'./api/login':
This is responsible for logging users in and giving tokens for users. Only accepts POST request to './api/login'.

'./api/user'
This is responsible for adding new users. Only accepts POST request to './api/user'

'./api/data'
This api is responsible for data management for the user. All request demand a proper authorization bearer token. This api accepts POST request to './api/data' and GET requests to './api/data/byMonth', './api/data/monthStatistics' and './api/data/byMetric'.

'./api/data/byMonth' will return the users datapoints based on request query parameters.

'./api/data/monthStatistics' will return the users statistics based on request query parameters.

'./api/data/byMetric' will return the users datapoints by given metric based on request query parameters.

More info on the apis can be found from './farmers_backend/src/controllers/'

### Heroku

The application is running at 
https://secure-waters-30615.herokuapp.com/.

The heroku application has five users by default.

Username: Noora
Password: NooraFarm

Username: Ossi
Password: OssiFarm

Username: PartialTech
Password: PartialTechFarm

Username: FrimanMetsola
Password: FrimanMetsolaFarm

Username: Test
Password: Test

Each farm have their own user that they can use to access their data. Test user is for testing purposes. 

### Technology choices

Technology choices and their reasoning can be found [here](./Documentation/Architecture and Design/Architecture and Design.md). The file also has some reflection on the given assignment and some core points that I made from it.

## ToDo

The application frontend does not provide a way to add new users, but the backend does. If you want to add a new user to the application, run the backend with npm run dev and then make a post request to 'http://localhost:PORT/api/user', where PORT is the port where the backend is running (Default 3001), with the body containing fields "username": "your new username" and "password": "your new password". The backend does not allow duplicate usernames. After that you can login regularly from the frontend.



