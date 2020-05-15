---
title: Changes
order: -10
---

## 14.05.2020

- Updated [HFP](../apis/4-realtime-api/vehicle-positions) documentation
  - Potentially breaking changes in the topic structure

## 15.01.2020

- Updated [realtime API documentation](../apis/4-realtime-api/)

## 09.01.2020

- Updated the [architecture](../architecture) diagram and text regarding runtime environment to match our new runtime environment

## 30.09.2019

 - Added general [instructions for service maintainers](../../services/).

## 05.09.2019

- Updated the [architecture](../architecture) diagram

## 12.06.2019

- [HFP 2.0](../apis/4-realtime-api/vehicle-positions) is now available
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
