---
title: System architecture
---

Digitransit architecture is based on microservices architecture. Microservices are small, autonomous services that
work together that allow us to build larger applications on top of APIs that the services provide.

![Architecture](./architecture.svg)

[Open full size image](http://www.digitransit.fi/en/developers/architecture/architecture.svg)

At the moment, we provide five kinds of services

1. User interface (blue)
2. Routing API, Geocoding API, and Map API (green)
3. Real time API (red)
4. Data containers (yellow)
5. External components (gray)

## User interface
We have built a mobile friendly user interface on top the APIs [See it here](../services-and-apis/5-digitransit-ui/)

## Routing API, Geocoding API, and Map API
[Routing API](../services-and-apis/1-routing-api/), [Geocoding API](../services-and-apis/2-geocoding-api/), and [Map API](../services-and-apis/3-map-api/)
can be seen "more stable" and we are pretty confident that they will be available when production version is launched.

## Real time API
[Real time API](../services-and-apis/4-realtime-api/) is more or less "work in progress". HSL is working on new Ticketing system and at the moment realtime
API (arrival prediction, location on map, service alerts) is in "proof of concept" stage.

## Data containers
Data containers are images that are used to gather and compile data needed for APIs by the platform.
[Read more here](../services-and-apis/6-data-containers/)

## External components
External compoments are something that Digitransit depends on. Someone else than us takes care that they work.
