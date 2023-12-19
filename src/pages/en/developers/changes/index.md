---
title: Changes
order: -10
---
## 31.1.2024

- Quota restrictions take place. [More information](../api-registration/#quota-and-rate-limiting) 

## 13.12.2023

- Updated list of available feeds in [the Digitransit MQTT broker and Waltti vehicle positions.](../apis/4-realtime-api/vehicle-positions/)

## 12.12.2023

- We informed users about upcoming quota restrictions via email.

## 2.5.2023

- Added documentation about [the Digitransit MQTT broker and Waltti vehicle positions.](../apis/4-realtime-api/vehicle-positions/)

## 4.4.2023

- Updated [Digitransit API portal and API keys](../api-registration)
- Updated [deprecations](../deprecations)

## 20.9.2022

- Updated [the terms of use](../apis/6-terms-of-use)
- Introduced [Digitransit API portal and API keys](../api-registration)
- Added a page about [deprecations](../deprecations)

## 1.4.2022

- Map related documents updated further
- Instructions about ticket zones and city bikes for municipalities added

## 25.10.2021
- Rename VRK (Väestörekisterikeskus) to DVV (Digi- ja väestövirasto)

## 12.10.2021

- Minor updates to the main [architecture](../architecture) diagram
- Updated instructions for running OpenTripPlanner

## 19.08.2021

- Updated the main [architecture](../architecture) diagram and other diagrams
- References to travis CI replaced by github actions
- Geocoding documentation updated
- Broken links to build scripts and other repository files updated/removed

## 09.02.2021

- GTFS-RT APIs are no longer available from `api.digitransit.fi`
  - Real-time information is available from the GraphQL API and [HSL GTFS-RT APIs](https://hsldevcom.github.io/gtfs_rt/)

## 14.05.2020

- Updated [HFP](../apis/4-realtime-api/vehicle-positions/high-frequency-positioning/) documentation
  - Potentially breaking changes in the topic structure
    - `sid` will be added to the end of the topic
  - Changes to values of `tlp-signalgroupnbr` and `tlp-protocol` in the payload

## 15.01.2020

- Updated [realtime API documentation](../apis/4-realtime-api/)

## 09.01.2020

- Updated the [architecture](../architecture) diagram and text regarding runtime environment to match our new runtime environment

## 30.09.2019

 - Added general [instructions for service maintainers](../../services/).

## 05.09.2019

- Updated the [architecture](../architecture) diagram

## 12.06.2019

- [HFP 2.0](../apis/4-realtime-api/vehicle-positions/high-frequency-positioning/) is now available
  - HFP 1.0 is deprecated and vehicles will stop sending HFP 1.0 data in the future

## 10.05.2019

- GraphQL API for [cancelled trip times](../apis/1-routing-api/cancelled-triptimes) is now available in production
- [Disruption info API](../apis/1-routing-api/disruption-info/#query-disruptions-and-their-severity-levels) has details of the severity of disruptions

## 10.04.2019

 - New GraphQL API for querying cancelled trip times introduced as [preview](../apis/1-routing-api/preview/).
   - All cancelled departures can be queried through this API.
   - Severe disruptions will have separate alerts which can be queried through [Disruption info](..apis/1-routing-api/disruption-info/) GraphQL API.
 - [Service alerts](../apis/4-realtime-api/service-alerts/) API in [Real-time APIs](../apis/4-realtime-api/) will be deprecated in the future in favor of [Disruption info](..apis/1-routing-api/disruption-info/) GraphQL API.
   - This is part of an effort to reduce overlapping API functionalities and to concentrate APIs under the GraphQL APIs.
 - [Trip updates](../apis/4-realtime-api/trip-updates/) API in [Real-time APIs](../apis/4-realtime-api/) will be deprecated in the future in favor of [Stop times](../apis/1-routing-api/stops/) GraphQL API.
   - This is part of an effort to reduce overlapping API functionalities and to concentrate APIs under the GraphQL APIs.
