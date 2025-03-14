---
title: System architecture
---

Digitransit architecture is based on microservices architecture. Microservices are small, autonomous services that
work together that allow us to build larger applications on top of APIs that the services provide.

At the moment, we provide five kinds of services

1. User interface
2. Routing API, Geocoding API, and Map API
3. Real time API
4. Data containers
5. External components

## Routing API, Routing data API, Geocoding API, and Map API

[Routing API](../apis/1-routing-api/), [Routing data API](../apis/2-routing-data-api/), [Geocoding API](../apis/3-geocoding-api/), and [Map API](../apis/4-map-api/) are available for anyone to use.

## Real time API

[Real time API](../apis/5-realtime-api/) contains information about availabe real-time data types and sources.

## Data

Data builders are images that are used to gather and compile data needed for APIs by the platform.
You can find more information on the [geocoding architecture pages](./x-apis/3-geocoding-api/) and
on the [routing data architecture page](./x-apis/2-routing-data-api/).

## External components

External compoments are something that Digitransit depends on. Someone else than us takes care that they work.
