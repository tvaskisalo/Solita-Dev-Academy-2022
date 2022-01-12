# Day 6

## What did I accomplish? 

I made tests for the backend, added a csv parser for the .csv files that uploads them directly to mongoDB. 

## What went well?

Tests went pretty well overall. I had a few problems with mongoDB's unexpected behaviour with certain datasets, but otherwise testing went somoothly.

## What went poorly?

Making the csv parser was really annoying due to missleading info on the internet (or my lack of understanding, not sure) so it took a bit more time than anticipated. I got it working though. Also I found out that I have made an oversight. I originally assumed that each day can only contain one datapoint, which is incorrect. Because of this assumption, the application has been made to only support singular values for each day. I might fix it and I have a few ideas on how to, but I am not exactly sure what I will do. Now the application just updates the values for tempeture, pH and rainfall if it encounters new data for an already existing day. I have a few possibilities. Either make it so that each day has an array of measurements for each metric. This will cause a lot of changes in the code and I am not sure if that would be worth the time. Other possibility is to add multiple datapoints for a day, if it happens to have multiple of the same metric. This would solve most of my problems. But it would create a new problem. If some days might have more data entires for some metric, my current implementation with the statistics would be biased by those days. This would lead to inaccurate averages and sums. The third option is to stay with my implementation to just update values and ditch the old value when new metric value is found for the day.

My implementation also just flat out ignores the time of the day. It is not important for my ideas for the graphs and impelentation of the frontend, so I am not sure it is worth the hassle. This is completely my mistake from not paying very good attention to my plans and the exercise given. Fortunately this is not necessarily a fatal mistake.

## Reflection

This day has been really productive and given a lot of good lessons and challenges that have imporved my skills. Biggest note from today is to pay better attention to plans. More detailed planning and increased attention to the exercise info would have saved me from my problem. This is something I have to really keep in mind later on. Especially in a work environment, understanding work instructions wrong could be REALLY bad. Preventing them from square one is essential. 

## Plan for the next day

Because my backend starts to be complete, frontend is up-most important. Getting the functionality on the fronend is really important. Also starting to write the README.md is important.
