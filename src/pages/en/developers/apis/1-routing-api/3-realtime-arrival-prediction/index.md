---
title: Real-time arrival prediction
order: 40
---

The routing API backend is connected to vehicle real-time information for some routes. This means that API queries can return real-time data for some vehicles.

## What does real-time mean?
Basically real-time means prediction of arrival times. We know vehicle's planned route and it's current location. This information is used to predict when it actually arrives.

## How do I know when data is real-time?
Real-time estimates are enabled by default when making itinerary planning requests. Availability of real-time estimates is not guaranteed, but field `realTime` (*true* / *false*) in each leg of the itinerary will indicate whether that leg's arrival / departure time is using real-time or static timetables. When using real-time, it means that uncertainty for arrival time is less than for purely static timetable data.

Real-time estimates for itinerary planning can be turned off by using arguments `preferences: {transit: {timetable: {excludeRealTimeUpdates: true}}}` of **planConnection** query. Setting this to true will only return times based on static timetables.

Departures that have been cancelled through a real-time feed can be included using the arguments `preferences: {transit: {timetable: {includeRealTimeCancelations: true}}}` of **planConnection**. This means that an itinerary can include a cancelled departure while some other alternative that contains no cancellations could be filtered out as the alternative containing a cancellation would normally be better.

For stop timetables and route timetables, real-time estimates are available from fields `realtimeArrival` and `realtimeDeparture`. Note that these fields will have the static arrival / departure time by default and field `realtime` indicates whether the values of those fields have been updated from a real-time source.

**Note:** Real-time information is not completely bullet proof yet. The quality and availability of the real-time data that Digitransit uses varies heavily at the moment.
