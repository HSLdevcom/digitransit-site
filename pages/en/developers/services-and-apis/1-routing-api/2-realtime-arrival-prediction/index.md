---
title: Realtime arrival prediction
---

Routing API backend is connected to vehicle realtime information for some routes. This means that API queries can return "realtime" data for some vehicles.


## What does realtime mean?
Basically realtime means prediction of arrival times. We know vehicle's planned route and it's current location. This information is used to predict when it actually arrives.

## How do I know when data is realtime?
GraphQL queries can return **realTime: true** parameter, which indicates that we have realtime prediction data available. When this happens, it means that uncertainty for arrival time is less than for purely static timetable data.

**Note!** This is not completely bullet proof yet.
