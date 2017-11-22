---
title: Stops
---

**If you are not yet familiar with [GraphQL](../0-graphql) and [GraphiQL](../1-graphiql) it is highly recommended to review those pages at first.**

## Glossary

| Term                                  | Explanation                     |
|---------------------------------------|---------------------------------|
| Agency                                | Some public transport provider, e.g. HSL.
| Route                                 | A public transport service shown to customers under a single name, usually from point A to B and back. For example: trams 1 and 1A, buses 18 and 102T, or train A. Commonly used synonym: line
| Pattern                               | A sequence of stops as used by a specific direction and variant of a route. For example a tram entering/departing service from/to the depot usually joins at the middle of the route, or a route might have a short term diversion (poikkeusreitti) without changing the route name (longer diversions are usually marked as different routes).

## Notes about stop ids

- Stop ids are in "acencyid:stopid" format
- HSL agencyid is **HSL** 
- Stop id is available as **gtfsId**

## Query examples

**Note:** For more details about the query type **stops** you can use the **Documentation Explorer** provided in GraphiQL.

**Note:** If the examples provided with an id do not return what is expected then the id in question may not be in use any more and you should try again with an existing id.

### Query all stops, returning their id, name and location

1. Click [this link](https://api.digitransit.fi/graphiql/hsl?query=%7B%0A%20%20stops%7B%0A%20%20%20%20gtfsId%0A%20%20%20%20name%0A%20%20%20%20lat%0A%20%20%20%20lon%0A%20%20%7D%0A%7D) to run the query below in GraphiQL.

```
{
  stops{
    gtfsId
    name
    lat
    lon
  }
}
```

2. Press play in GraphiQL to execute the query.

### Query stop by id

1. Click [this link](https://api.digitransit.fi/graphiql/hsl?query=%7B%0A%20%20stop(id%3A%20%22HSL%3A1140447%22)%20%7B%0A%20%20%20%20name%0A%20%20%20%20wheelchairBoarding%0A%20%20%7D%0A%7D) to run the query below in GraphiQL.

```
{
  stop(id: "HSL:1140447") {
    name
    wheelchairBoarding
  }
}
```

2. Press play in GraphiQL to execute the query.

### Query stop by id and information about routes that go through it

1. Click [this link](https://api.digitransit.fi/graphiql/hsl?query=%7B%0A%20%20stop(id%3A%20%22HSL%3A1140447%22)%20%7B%0A%20%20%20%20name%0A%20%20%20%20lat%0A%20%20%20%20lon%0A%20%20%20%20patterns%20%7B%0A%20%20%20%20%20%20id%0A%20%20%20%20%20%20name%0A%20%20%20%20%20%20route%20%7B%0A%20%20%20%20%20%20%20%20gtfsId%0A%20%20%20%20%20%20%20%20shortName%0A%20%20%20%20%20%20%20%20longName%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20directionId%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D) to run the query below in GraphiQL.

```
{
  stop(id: "HSL:1140447") {
    name
    lat
    lon
    patterns {
      id
      name
      route {
        gtfsId
        shortName
        longName
      }
      directionId
    }
  }
}
```

2. Press play in GraphiQL to execute the query.

### Query all stops where name is like "hertton"

1. Click [this link](https://api.digitransit.fi/graphiql/hsl?query=%7B%0A%20%20stops(name%3A%20%22hertton%22)%20%7B%0A%20%20%20%20id%0A%20%20%20%20name%0A%20%20%20%20wheelchairBoarding%0A%20%20%7D%0A%7D) to run the query below in GraphiQL.

```
{
  stops(name: "hertton") {
    id
    name
    wheelchairBoarding
  }
}
```

2. Press play in GraphiQL to execute the query.

### Query a stop by number

1. Click [this link](https://api.digitransit.fi/graphiql/hsl?query=%7B%0A%20%20stops(name%3A%20%224040%22)%20%7B%0A%20%20%20%20id%0A%20%20%20%20name%0A%20%20%20%20wheelchairBoarding%0A%20%20%7D%0A%7D) to run the query below in GraphiQL.

```
{
  stops(name: "4040") {
    id
    name
    wheelchairBoarding
  }
}
```

2. Press play in GraphiQL to execute the query.

### Query scheduled departure and arrival times of a stop by id 

1. Click [this link](https://api.digitransit.fi/graphiql/hsl?query=%7B%0A%20%20stop(id%3A%20%22HSL%3A1140447%22)%20%7B%0A%20%20%20%20name%0A%20%20%20%20%20%20stoptimesWithoutPatterns%20%7B%0A%20%20%20%20%20%20scheduledArrival%0A%20%20%20%20%20%20realtimeArrival%0A%20%20%20%20%20%20arrivalDelay%0A%20%20%20%20%20%20scheduledDeparture%0A%20%20%20%20%20%20realtimeDeparture%0A%20%20%20%20%20%20departureDelay%0A%20%20%20%20%20%20realtime%0A%20%20%20%20%20%20realtimeState%0A%20%20%20%20%20%20serviceDay%0A%20%20%20%20%20%20headsign%0A%20%20%20%20%7D%0A%20%20%7D%20%20%0A%7D%0A%0A%0A) to run the query below in GraphiQL.

```
{
  stop(id: "HSL:1140447") {
    name
      stoptimesWithoutPatterns {
      scheduledArrival
      realtimeArrival
      arrivalDelay
      scheduledDeparture
      realtimeDeparture
      departureDelay
      realtime
      realtimeState
      serviceDay
      headsign
    }
  }  
}
```

2. Press play in GraphiQL to execute the query.
