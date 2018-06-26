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
| GraphiQL                              | A simple UI for making GraphQL queries. You can use it both to run queries and to explore the GraphQL schema.
| Realtime arrival prediction           | API queries can return real-time data for some vehicles. We know the vehicle's planned route and its current location. This information is used to predict when it actually arrives.
