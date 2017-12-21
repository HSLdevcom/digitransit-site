---
title: Routing API
---
Routing API provides a way to plan itineraries and query public transportation related
information about stops and timetables.

## Getting started

At first you should read the [GraphQL](./0-graphql/) and [GraphiQL](./1-graphiql/) pages and try out the examples provided.

It is also recommended to read the [Real-time arrival prediction](./2-realtime-arrival-prediction/) page before going any further.

After this, you are ready to run queries for [routes](./routes/), [stops](./stops), [city bikes and bicycling routes](./bicycling/), [disruption info](./disruption-info/) and do [itinerary planning](./itinerary-planning/).

## Glossary

| Term                                  | Explanation                     |
|---------------------------------------|---------------------------------|
| GraphQL                               | A query language for APIs and a runtime for fulfilling those queries with your existing data.
| GraphiQL                              | A simple UI for making queries. You can use it both to run queries and to explore the GraphQL schema.
| Realtime arrival prediction           | API queries can return real-time data for some vehicles. We know vehicle's planned route and it's current location. This information is used to predict when it actually arrives.
| Route                                 | A public transport service shown to customers under a single name, usually from point A to B and back.
| Stop                                  | A public transport stop.
| City bike                             | A shared-use bicycle that can be borrowed for a fee by anyone in central Helsinki. 
| Bicycling route                       | Route from place A to place B using city bike rental. 
| Disruption info                       | Information about the current and upcoming disruptions in public transport.
| Itinerary planning                    | Planning an itinerary from place A to place B using different modes (BUS, TRAM, RAIL, FERRY, WALK)
