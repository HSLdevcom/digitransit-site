---
title: Routing API
---
Routing API provides a way to plan itineraries and query public transportation related
information about stops and timetables using GraphQL.

## Getting started

If you are not familiar with GraphQL, start by reading the [GraphQL](./0-graphql/) page. 

It is also recommended to try building queries and exploring the schema in [GraphiQL](./1-graphiql/). 

[Real-time arrival prediction](./3-realtime-arrival-prediction/) page has information about the real-time data available in the API.

[Glossary](./2-glossary/) page has explanations for terms commonly used in the API.

After this, you are ready to run queries for [routes](./routes/), [stops](./stops), [city bikes and bicycling routes](./bicycling/), [disruption info](./disruption-info/) and do [itinerary planning](./itinerary-planning/).

### Endpoints

1. The routing API for **Helsinki region** is available at:<br/>`https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql`

2. The routing API for the **Waltti regions** is available at:<br/>`https://api.digitransit.fi/routing/v1/routers/waltti/index/graphql`

3. The routing API for **Finland** as a whole is available at:<br/>`https://api.digitransit.fi/routing/v1/routers/finland/index/graphql`

### API requirements

When sending queries, there are some things you should be aware of:

1. **The HTTP method must be POST**
- You will get a HTTP 405 error when using other methods.

2. **Content-Type must be either "application/graphql" or "application/json"**
- You will get a HTTP 415 Error if this header is not present.

## Further reading

* [GTFS reference](https://developers.google.com/transit/gtfs/reference/#field_definitions) could be useful as the data format used by the API is based on GTFS

## Glossary

| Term                                  | Explanation                     |
|---------------------------------------|---------------------------------|
| GraphQL                               | A query language for APIs and a runtime for fulfilling those queries with your existing data.
| GraphiQL                              | A simple UI for making GraphQL queries. You can use it both to run queries and to explore the GraphQL schema.
| Realtime arrival prediction           | API queries can return real-time data for some vehicles. We know the vehicle's planned route and its current location. This information is used to predict when it actually arrives.
