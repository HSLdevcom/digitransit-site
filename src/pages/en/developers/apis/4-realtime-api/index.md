---
title: Real-time APIs
---

Our real-time APIs are not quite ready yet, so they should be considered as proofs of concept. We encourage you to try them out, but just keep that in mind.

At first you should read the real-time API [getting started guide](./1-getting-started/) to better understand limitations and possibilities.

## APIs

| API                                                | Description            |
|----------------------------------------------------|------------------------|
| [Service alerts](./service-alerts/)                | Provides disruption information from HSL area in [GTFS-RT](https://developers.google.com/transit/gtfs-realtime/) format
| [Trip updates](./trip-updates/)                    | Provides predictions in [GTFS-RT](https://developers.google.com/transit/gtfs-realtime/) format to arrival and departures times for stops along the route of a trip.
| [High frequency positioning (v2.0)](./vehicle-positions-2/) | Provides positions and events from vehicles in HSL area in JSON format over MQTT
| [High frequency positioning (v1.0)](./vehicle-positions/) | Older version of HFP API, provides vehicle positions from HSL area in JSON format over MQTT.

**Note:** service alerts and trip updates are incorporated to the [routing API](../1-routing-api/)
