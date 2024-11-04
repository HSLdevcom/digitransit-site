---
title: APIs
---

## API access rights

The APIs hosted at api.digitransit.fi are publicly available but registration and use of API keys is required. More information is available [here](../api-registration). See [terms of use](./6-terms-of-use) for license information.

The APIs currently have no rate limiting, but you should avoid doing more than 10 requests per second. Starting 31.1.2024, we will enforce rate and quota limits but the limits should only restrict misuse of the APIs, not normal use. If you need to make a large amount of requests, you might want to [host the API locally](../architecture/x-apis/1-routing-api/#hosting-the-api-locally).

If you want to improve or modify the APIs in some way, you can either contribute to the projects through https://github.com/HSLdevcom or host your own APIs based on those sources.

## APIs

| API                                                                               | Description                                                                                                                                                                                    |
| --------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Routing API](./1-routing-api/)                                                   | Routing API (OpenTripPlanner) provides a way to plan itineraries and query public transport related information about routes, stops and timetables.                                            |
| [Geocoding API](./2-geocoding-api/)                                               | Geocoding API provides a way to perform address searches and address lookups (also known as geocoding and reverse geocoding).                                                                  |
| [Map API](./3-map-api/)                                                           | Provides raster map images (background map tiles) as well as vector map tiles for stops and other points of interests like rental stations and park and ride areas. |
| [Real-time API - Service alerts](./4-realtime-api/service-alerts/)                | Provides HSL's disruption information in the GTFS-RT Service Alerts format and cancelled trips as Trip Updates.                                                                                |
| [Real-time API - Trip updates](./4-realtime-api/trip-updates/)                    | Provides realtime trip progress and schedule deviations (predictions) in the GTFS-RT Trip Updates format.                                                                                      |
| [Real-time API - Vehicle positions](./4-realtime-api/vehicle-positions/) | Provides realtime vehicle locations                                 |
