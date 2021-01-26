---
title: Realtime APIs
---

[[alert-warning]]
| GTFS-RT APIs (service alerts and trip updates) hosted at api.digitransit.fi have been deprecated. For HSL region, realtime data in GTFS-RT format is available from [HSL GTFS-RT API](https://hsldevcom.github.io/gtfs_rt/). Realtime data is also available from the routing API.

Realtime APIs provide disruption information and predictions for stop arrival and departure times in GTFS RT format and vehicle positions in a custom JSON format. When using realtime APIs, keep in mind that the availability and quality of the data varies in each city.  

At first you should read the real-time API [getting started guide](./1-getting-started/) to better understand limitations and possibilities.

**Note:** service alerts and trip updates are incorporated to the [routing API](../1-routing-api/). If you are using routing API, there is no need to use GTFS-RT APIs for service alerts and trip updates.

## APIs

| API                                                | Description            |
|----------------------------------------------------|------------------------|
| [Service alerts](./service-alerts/)                | Provides disruption information from HSL area in [GTFS-RT](https://developers.google.com/transit/gtfs-realtime/) format
| [Trip updates](./trip-updates/)                    | Provides predictions in [GTFS-RT](https://developers.google.com/transit/gtfs-realtime/) format to arrival and departures times for stops along the route of a trip.
| [High frequency positioning](./vehicle-positions/) | Provides positions and events from vehicles in HSL area in JSON format over MQTT
