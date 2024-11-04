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

## Routing API, Geocoding API, and Map API

[Routing API](../apis/1-routing-api/), [Geocoding API](../apis/2-geocoding-api/), and [Map API](../apis/3-map-api/)
are stable and currently available since the launch of production.

## Real time API

[Real time API](../apis/4-realtime-api/) contains information about availabe real-time data types and sources.

## Data containers

Data containers are images that are used to gather and compile data needed for APIs by the platform.
[Read more here](../services/6-data-containers/)

## External components

External compoments are something that Digitransit depends on. Someone else than us takes care that they work.
