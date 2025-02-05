---
title: Routing API
---
Routing API provides a way to plan itineraries and query public transportation related
information about stops and timetables using GraphQL.

## Getting started

If you are not familiar with GraphQL, start by reading the [GraphQL page](./0-graphql/).

It is also recommended to try building queries and exploring the schema in [GraphiQL](./1-graphiql/). 

[Real-time information page](./3-realtime-information/) has information about the real-time data available in the API.

[Glossary page](./2-glossary/) has explanations for terms commonly used in the API.

[Translations page](./4-translations/) explains how to fetch translated texts from the API.

After this, you are ready to run queries for [routes](./routes/), [stops](./stops), [bicycles, e-scooters and cars](./bicycles-scooters-cars/), [disruption info](./disruption-info/), [canceled trips](./canceled-trips/) and do [itinerary planning](./itinerary-planning/).

### Endpoints

1. The routing API for **Helsinki region** is available at:<br/>`https://api.digitransit.fi/routing/v2/hsl/gtfs/v1`

2. The routing API for **Waltti regions** is available at:<br/>`https://api.digitransit.fi/routing/v2/waltti/gtfs/v1`

3. The routing API for **Finland** and **Estonia** is available at:<br/>`https://api.digitransit.fi/routing/v2/finland/gtfs/v1`

4. The routing API for **Varsinais-Suomen (Southwest Finland) ELY** is available at:<br/>`https://api.digitransit.fi/routing/v2/varely/gtfs/v1`


### API requirements

When sending queries, there are some things you should be aware of:

1. **The HTTP method must be POST**
- You will get a HTTP 404 error when using other methods.

2. **Content-Type must be either "application/graphql" or "application/json"**
- You will get a HTTP 415 Error if this header is not present.

### Deprecations

Avoid using deprecated queries, parameters or fields as it is not guaranteed they will return sensible information forever or they might be in a really experimental state.

[GraphiQL](./1-graphiql/) can be used to identify deprecated entities from the GraphQL schema as it shows in the documentation which things are deprecated and warns about them if you try to use them in a query.

## Further reading

* [GTFS reference](https://gtfs.org/documentation/schedule/reference/#field-definitions) and [GTFS realtime reference](https://gtfs.org/documentation/realtime/reference/) are useful reading material as GTFS data is used for transit data and the terminology in the API is the same when applicable.
* [GBFS reference](https://gbfs.org/specification/reference/) is useful reading material as GBFS realtime data is used for vehicle rental and the terminology in the API is the same when applicable.

## Glossary

| Term                                  | Explanation                     |
|---------------------------------------|---------------------------------|
| GraphQL                               | A query language for APIs and a runtime for fulfilling those queries with your existing data.
| GraphiQL                              | A simple UI for making GraphQL queries. You can use it both to run queries and to explore the GraphQL schema.
