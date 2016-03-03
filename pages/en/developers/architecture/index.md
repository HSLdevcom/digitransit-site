---
title: Architecture
order: 1
---

Digitransit architecture is based on microservices architecture. Microservices are small, autonomous services that work together that allow us to build larger applications on top of APIs that the services provide.

![Architecture](./architecture.svg)

[Open full size image](http://www.digitransit.fi/en/developers/architecture/architecture.svg)

In picture above, we have three kinds of services

1. Public APIs (green)
2. Internal components (yellow)
3. External components (gray)

## Public APIs
These services are provided by the platform and are part of supported public API.
- [Routing API](../routing-api/)
- [Geocoding API](../geocoding-api/)
- [Map API](../map-api/)
- Realtime API

## Internal components
They are either small conversion modules or data containers that convert and build data from various sources to be used by the APIs. Datastore can conceptually be anything: Database, graphfile, etc.

- [Routing Data](../routing-data/)
- [Geocoding Data](../geocoding-data/)
- [Alerts HSL API](../alerts-hsl-api/)
- [Siri2GTFS-RT](../siri2gtfsrt/)
- [RailDigitraffic2GTFS-RT](../raildigittaffic2gtfsrt/)

## External components
External services are something that Digitransit depends on. Someone else than us takes care that they work.

## What about the Digitransit user interface?
In addition to public APIs and components described above, Digitransit-platform contains a mobile friendly user interface that is built on top of platform public APIs.
- [Digitransit-ui](../web-ui/)
