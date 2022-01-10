# Day 5

## What did I accomplish? 

This is entry is combination on development done in two days, since each had smaller amount of work done. 

First I added typeguards and typeparsers for almost all types and ensured that as few eslint ignores are used in backend as possible. 

Then I added the last apis that I will make, fetching data by month, by metric and monthly statistics. Statistics include averages, min and max and sum. 

I also configured ts-jest properly. I was encountering problems because I was using jest for a TypeScript project. For testing I just added a "uselesss" test just to make sure that tests are configured correctly. For test I also refactored app.ts from index.ts and made changes to mongoDB's url config. 

## What went well?

I had many hiccups in the course of two days, but I had some highlights. I encountered problems with mongoDB's aggregate function, but I prevailed and learned a lot about how mongoDB actually works. I had to read a lot of documentation on why my code was not working. It was a very educating experience and it felt really good when I managed to get it working. Also adding typeguards and -parsers went suprisingly smoothly. I was actively avoiding them, since they have always felt hard for me, but this time I felt like I knew what I was doing. I am slowly feeling more confident with TypeScript.

## What went poorly?

The problem with jest and ts-jest was a slightly embarrassing one. Installing a completely wrong library without reading first about the compatibility can be a very bad thing. It can cause bugs that might create security leaks (e.g. libraries that are not updated anymore) and bugs that are very very hard to track down. This is a very important lesson that I must keep in mind in the future. Fortunately this was not that bad. 

## Reflection

These two days have been very educational, but also fun. I have throughly enjoyed even the hard parts. These two days have contained a lot of important discoveries and lessons. They have increased my understanding of TypeScript and mongoDB. Another lesson that I have learned is that I should start testing earlier than I am now. It neccessarily isn't something one should do the last. 

## Plan for the next day

Add tests and finish current features in the backend code. Continue frontend code and start writing README.