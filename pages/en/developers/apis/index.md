---
title: APIs
---

## API access rights

The APIs hosted at api.digitransit.fi are publicly available for all and require no credentials. If you want to improve or modify them in some way, you can either contribute to the projects through https://github.com/HSLdevcom or host your own APIs based on those sources.

## APIs
| API                                                                             | Description                     |
|---------------------------------------------------------------------------------|---------------------------------|
| [Routing API](./1-routing-api/)                                                 | Routing and timetable API provides a way to plan itineraries and query public transportation related information about stops and timetables.
| [Geocoding API](./2-geocoding-api/)                                             | Geocoding API provides a way to perform address searches and address lookups (also known as reverse geocoding).
| [Map API](./3-map-api/)                                                         | Map API provides raster map images (background map) and other points of interests like ticket sales positions, city bike stations and park and ride areas as vector maps.
| [Realtime API - Service alerts](./4-realtime-api/service-alerts)                | HSL Alerts API can be used to query realtime updates about HSL fleet in GTFS-RT format. 
| [Realtime API - Trip updates](./4-realtime-api/trip-updates)                    | Converts data from SIRI (Service Interface for Real Time Information) format to GTFS-realtime format.
| [Realtime API - High frequency positioning](./4-realtime-api/vehicle-positions) | Provides snapshot of the current realtime vehicle location data.
