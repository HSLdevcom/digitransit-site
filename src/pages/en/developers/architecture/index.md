---
title: System architecture
---

Digitransit architecture is based on microservices architecture. Microservices are small, autonomous services that
work together that allow us to build larger applications on top of APIs that the services provide.

![Architecture](./architecture.png)

[Full size image (SVG)](./architecture.svg) (or click the image for full size PNG)

At the moment, we provide five kinds of services

1. User interface (blue)
2. Routing API, Geocoding API, and Map API (green)
3. Real time API (red)
4. Data containers (yellow)
5. External components (gray)

## User interface

We have built a mobile friendly user interface on top the APIs [See it here](../apis/5-digitransit-ui/)

## Routing API, Geocoding API, and Map API

[Routing API](../apis/1-routing-api/), [Geocoding API](../apis/2-geocoding-api/), and [Map API](../apis/3-map-api/)
are stable and currently available since the launch of production.

## Real time API

[Real time API](../apis/4-realtime-api/) is more or less "work in progress". HSL is working on new Ticketing system and at the moment realtime
API (arrival prediction, location on map, service alerts) is in "proof of concept" stage.

## Data containers

Data containers are images that are used to gather and compile data needed for APIs by the platform.
[Read more here](../services/6-data-containers/)

## External components

External compoments are something that Digitransit depends on. Someone else than us takes care that they work.
