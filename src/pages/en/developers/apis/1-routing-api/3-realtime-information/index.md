---
title: Real-time information
order: 40
---

The routing API backend is connected to real-time information for some routes. This means that API queries can return real-time information.

**Note:** Real-time information is not always available and somtimes can be potentially slightly inaccurate.

## What does real-time mean?
Real-time means in this context prediction of arrival and departure times, trip cancellations, partial trip cancellations and occupancy status for vehicles that operate on routes.

## How do I know when data is real-time?
Real-time estimates are enabled by default when making itinerary planning requests. Availability of real-time estimates is not guaranteed, but field `realTime` (*true* / *false*) in each leg of the itinerary will indicate whether that leg's arrival / departure time is using real-time or static timetables. When using real-time, it means that uncertainty for arrival time is less than for purely static timetable data.

Real-time estimates for itinerary planning can be turned off by using the argument `preferences: {transit: {timetable: {excludeRealTimeUpdates: true}}}` of **planConnection** query. Setting this to true will mean that the static timetables will be used in routing.

Departures that have been cancelled through a real-time feed can be included using the arguments `preferences: {transit: {timetable: {includeRealTimeCancelations: true}}}` of **planConnection**. This means that an itinerary can include a cancelled departure while some other alternative that contains no cancellations could be filtered out as the alternative containing a cancellation would normally be better.

For stop timetables and route timetables, real-time estimates are available from stop times through `realtimeArrival` and `realtimeDeparture` fields or from leg's `start` and `end` `estimated` field. Note that in stop times, these fields will have the static arrival / departure time by default and field `realtime` indicates whether the values of those fields have been updated from a real-time source.

## Occupancy information
Some vehicles might have real-time occupancy information available. This information can be accessed through `Trip` type's `occupancy` field.

**Note:** Currently, this information is always the current state (or the last known state). There is no occupancy prediction data available.
