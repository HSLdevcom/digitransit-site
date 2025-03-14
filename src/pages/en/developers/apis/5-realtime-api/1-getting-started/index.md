---
title: Getting started
order: 10
---

Sometimes public transport does not work according to timetables. Vehicles may arrive earlier or later than expected or not at all. In a situation like that the real-time information can be very useful.

## Glossary

| Term                       | Explanation                     |
|----------------------------|---------------------------------|
| Real-time information      | An umbrella term for data that is based on vehicle movements and alerts generated by human operators and automatic systems (data received with no delay).
| Vehicle position           | Vehicle’s real geographic position, represented by latitude and longitude.
| Real-time prediction       | Based on vehicle’s planner route and its current position some system makes a prediction when vehicle really arrives to some point.
| Service alert	             | A description about a disruption that happens in public transport.
| GTFS-Realtime (or GTFS-RT) | A standard for transportation agencies to provide real-time updates about their fleet.

### GTFS-Realtime

[GTFS-Realtime](https://developers.google.com/transit/gtfs-realtime/) (or GTFS-RT) provides three kinds of feeds:

- [Service alerts](https://developers.google.com/transit/gtfs-realtime/guides/service-alerts)
- [Trip updates](https://developers.google.com/transit/gtfs-realtime/guides/trip-updates)
- [Vehicle positions](https://developers.google.com/transit/gtfs-realtime/guides/vehicle-positions)

Our goal is to provide GTFS-RT feeds for you.

## Real-time predictions are available in the Routing API
Real-time data is read into the Routing API. This means that the Routing API returns results that contain predictions. You can read more about that at the [Routing API](../../1-routing-api/) pages.

## Situation of the API

### Situation at HSL
HSL realtime data is handled by [Transitdata system](https://github.com/HSLdevcom/transitdata) that combines data from multiple sources and produces GTFS RT feeds for service alerts, trip updates and vehicle positions. When using the realtime data, keep in mind that:
* Not all vehicles produce realtime data (notably [U-line buses](https://www.hsl.fi/en/timetables-and-routes/u-line-services) currently don't produce realtime data)
* Quality of the data depends on vehicle type
* There might be errors in the data

If you are interested in implementing realtime features, you might want to look at [Digitransit-ui](../../../user-interfaces/1-digitransit-ui/) and its [source code](https://github.com/HSLdevcom/digitransit-ui). That way you can get an idea how realtime is used there.

### Situation at Fintraffic
Currently, Fintraffic provides real-time information for trains at https://rata.digitraffic.fi/api/v1/doc/index.html. We have a simple wrapper (raildigiraffic2gtfsrt) that transforms that data to GTFS-RT trip updates.

Fintraffic is investigating the possibility to build a national real-time service which would collect real-time data from all around Finland.

### Situation in other cities
We don't have much control over the other cities and the data they provide, but we have integrated data from Oulu for example, just to see how it behaves.
