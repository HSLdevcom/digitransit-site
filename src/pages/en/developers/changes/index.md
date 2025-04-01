---
title: Changes
order: -10
---

## 1.4.2024

- Updated [deprecations](../deprecations/).

## 31.3.2024

- Removed no-text map layers from [map documentation](../apis/4-map-api/background-map/) as no one was using them and we don't want to support them anymore.

## 17.3.2024

- [Rate limit documentation](../api-registration/) clarified.
- Removed [example of stops query](../apis/1-routing-api/stops/) by stop code example as it is no longer supported.

## 4.2.2024

- Updated [HFP](../apis/5-realtime-api/vehicle-positions/high-frequency-positioning/) list of operators.

## 18.11.2024

- Documented the new [canceled trips query](../apis/1-routing-api/canceled-trips/)).

## 16.11.2024

- Waltt-alt data has been merged into waltti

## 29.11.2024

- Removed references to waltti-alt as it will be merged into waltti.

## 26.11.2024

- [Routing](../apis/1-routing-api/), [routing data](../apis/2-routing-data-api/) and [map](../apis/4-map-api/) API pages have been updated to contain documentation about newly released versions.
- [API architecture pages](../architecture/x-apis/) have been updated.
- [Digitransit MQTT broker documentation](../apis/5-realtime-api/vehicle-positions/digitransit-mqtt/) has been updated.

## 31.1.2024

- Quota restrictions take place. [More information](../api-registration/#quota-and-rate-limiting) 

## 13.12.2023

- Updated list of available feeds in [the Digitransit MQTT broker and Waltti vehicle positions.](../apis/5-realtime-api/vehicle-positions/)

## 12.12.2023

- We informed users about upcoming quota restrictions via email.

## 2.5.2023

- Added documentation about [the Digitransit MQTT broker and Waltti vehicle positions.](../apis/5-realtime-api/vehicle-positions/)

## 4.4.2023

- Updated [Digitransit API portal and API keys](../api-registration)
- Updated [deprecations](../deprecations)

## 20.9.2022

- Updated [the terms of use](../apis/7-terms-of-use)
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

- Updated [HFP](../apis/5-realtime-api/vehicle-positions/high-frequency-positioning/) documentation
  - Potentially breaking changes in the topic structure
    - `sid` will be added to the end of the topic
  - Changes to values of `tlp-signalgroupnbr` and `tlp-protocol` in the payload

## 15.01.2020

- Updated [realtime API documentation](../apis/5-realtime-api/)

## 09.01.2020

- Updated the [architecture](../architecture) diagram and text regarding runtime environment to match our new runtime environment

## 30.09.2019

 - Added general [instructions for service maintainers](../../services/).

## 05.09.2019

- Updated the [architecture](../architecture) diagram

## 12.06.20195

- [HFP 2.0](../apis/5-realtime-api/vehicle-positions/high-frequency-positioning/) is now available
  - HFP 1.0 is deprecated and vehicles will stop sending HFP 1.0 data in the future

## 10.05.2019

- [Disruption info API](../apis/1-routing-api/disruption-info/#query-disruptions-and-their-severity-levels) has details of the severity of disruptions

## 10.04.2019

 - Severe disruptions will have separate alerts which can be queried through [Disruption info](..apis/1-routing-api/disruption-info/) GraphQL API.
 - [Service alerts](../apis/5-realtime-api/service-alerts/) API in [Real-time APIs](../apis/5-realtime-api/) will be deprecated in the future in favor of [Disruption info](..apis/1-routing-api/disruption-info/) GraphQL API.
   - This is part of an effort to reduce overlapping API functionalities and to concentrate APIs under the GraphQL APIs.
 - [Trip updates](../apis/5-realtime-api/trip-updates/) API in [Real-time APIs](../apis/5-realtime-api/) will be deprecated in the future in favor of [Stop times](../apis/1-routing-api/stops/) GraphQL API.
   - This is part of an effort to reduce overlapping API functionalities and to concentrate APIs under the GraphQL APIs.
