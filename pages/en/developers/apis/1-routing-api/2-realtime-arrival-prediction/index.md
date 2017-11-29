---
title: Realtime arrival prediction
---

Routing API backend is connected to vehicle realtime information for some routes. This means that API queries can return "realtime" data for some vehicles.


## What does realtime mean?
Basically realtime means prediction of arrival times. We know vehicle's planned route and it's current location. This information is used to predict when it actually arrives.

## How do I know when data is realtime?
Real time estimates are enabled by default when making requests. Availability of real time estimates is not guaranteed, but the 'realTime' parameter (true/false) that's returned along with a time will indicate whether that time is using real time or static timetables. When using real time, it means that uncertainty for arrival time is less than for purely static timetable data.

It can be turned off when planning itineraries using the 'ignoreRealtimeUpdates' parameter of 'plan'. Enabling this will only return times based on static timetables.

**Note:** This is not completely bullet proof yet. The quality and availability of the real time data that Digitransit uses varies heavily at the moment.
