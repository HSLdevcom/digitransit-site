---
title: Routes
order: 100
---

**If you are not yet familiar with [GraphQL](../0-graphql) and [GraphiQL](../1-graphiql) it is highly recommended to review those pages at first.**

## Glossary

| Term    | Explanation                                                                                                                                                                                                                                                                                                                                                                          |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Route   | A public transport service shown to customers under a single name, usually from point A to B and back. For example: trams 1 and 1A, buses 18 and 102T, or train A.<br/>Commonly used synonym: line                                                                                                                                                                                   |
| Pattern | A sequence of stops as used by a specific direction (i.e. inbound or outbound journey) and variant of a route.<br/>For example, a variant of a route could be a tram entering service from the depot and joining at the middle of the route or a route might have a short term diversion without changing the route name (longer diversions are usually marked as different routes). |
| Trip    | A specific occurance of a pattern, usually identified by the route and exact departure time from the first stop.<br/>For example: bus 102 leaving from Otaniemi on 2017-11-21 at 10:00, or more generally leaving from Otaniemi at 10:00 on specified days.                                                                                                                          |

## Query examples

**Note:** For more details about the query types **routes** and **pattern** and their parameters you can use the **Documentation Explorer** provided in GraphiQL.

**Note:** If the examples provided with an id or other parameter do not return what is expected then the value in question may not be in use any more and you should try again with an existing value.

### Query all routes where name starts with "10"

1. Click [this link](<https://api.digitransit.fi/graphiql/hsl?query=%7B%0A%20%20routes(name%3A%20%2210%22)%20%7B%0A%20%20%20%20gtfsId%0A%20%20%20%20shortName%0A%20%20%20%20longName%0A%20%20%20%20mode%0A%20%20%7D%0A%7D>) to run the query below in GraphiQL.

```graphql
{
  routes(name: "10") {
    gtfsId
    shortName
    longName
    mode
  }
}
```

2. Press play in GraphiQL to execute the query.

### Query all bus routes where name starts with "58"

1. Click [this link](<https://api.digitransit.fi/graphiql/hsl?query=%7B%0A%20%20routes(name%3A%20%2258%22%2C%20transportModes%3A%20BUS)%20%7B%0A%20%20%20%20gtfsId%0A%20%20%20%20shortName%0A%20%20%20%20longName%0A%20%20%20%20mode%0A%20%20%7D%0A%7D%0A>) to run the query below in GraphiQL.

```graphql
{
  routes(name: "58", transportModes: BUS) {
    gtfsId
    shortName
    longName
    mode
  }
}
```

2. Press play in GraphiQL to execute the query.

### Query all tram routes where name starts with "1"

1. Click [this link](<https://api.digitransit.fi/graphiql/hsl?query=%7B%0A%20%20routes(name%3A%20%221%22%2C%20transportModes%3A%20TRAM)%20%7B%0A%20%20%20%20gtfsId%0A%20%20%20%20shortName%0A%20%20%20%20longName%0A%20%20%20%20mode%0A%20%20%7D%0A%7D>) to run the query below in GraphiQL.

```graphql
{
  routes(name: "1", transportModes: TRAM) {
    gtfsId
    shortName
    longName
    mode
  }
}
```

2. Press play in GraphiQL to execute the query.

### Query patterns of a route

1. Click [this link](<https://api.digitransit.fi/graphiql/hsl?query=%7B%0A%20%20routes(name%3A%20%2259%22%2C%20transportModes%3A%20BUS)%20%7B%0A%20%20%20%20shortName%0A%20%20%20%20longName%0A%20%20%20%20patterns%20%7B%0A%20%20%20%20%20%20code%0A%20%20%20%20%20%20directionId%0A%20%20%20%20%20%20name%0A%20%20%20%20%20%20headsign%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D>) to run the query below in GraphiQL.

```graphql
{
  routes(name: "59", transportModes: BUS) {
    shortName
    longName
    patterns {
      code
      directionId
      name
      headsign
    }
  }
}
```

2. Press play in GraphiQL to execute the query.

Example response:

```json
{
  "data": {
    "routes": [
      {
        "shortName": "59",
        "longName": "Sompasaari-Kalasatama(M)-Pasila-Pajamäki",
        "patterns": [
          {
            "code": "HSL:1059:0:01",
            "directionId": 0,
            "name": "59 to Pajamäki (HSL:1461110)",
            "headsign": "Pajamäki"
          },
          {
            "code": "HSL:1059:1:01",
            "directionId": 1,
            "name": "59 to Polariksenkatu (HSL:1100128)",
            "headsign": "Sompasaari"
          }
        ]
      }
    ]
  }
}
```

### Query stop names by pattern ID

- See previous example on how to find pattern IDs for a route
  - Pattern ID is value of `code` in a pattern object

1. Click [this link](<https://api.digitransit.fi/graphiql/hsl?query=%7B%0A%20%20pattern(id%3A%20%22HSL%3A1059%3A0%3A01%22)%20%7B%0A%20%20%20%20name%0A%20%20%20%20stops%20%7B%0A%20%20%20%20%20%20name%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A%0A%0A>) to run the query below in GraphiQL.

```graphql
{
  pattern(id: "HSL:1059:0:01") {
    name
    stops {
      name
    }
  }
}
```

2. Press play in GraphiQL to execute the query.

### Query trips of a specific pattern

1. Click [this link](<https://api.digitransit.fi/graphiql/hsl?query=%7B%0A%09pattern(id%3A%20%22HSL%3A1059%3A0%3A01%22)%20%7B%0A%20%20%20%20code%0A%20%20%20%20directionId%0A%20%20%20%20name%0A%20%20%20%20headsign%0A%20%20%20%20trips%20%7B%0A%20%20%20%20%20%20gtfsId%0A%20%20%20%20%20%20tripHeadsign%0A%20%20%20%20%20%20routeShortName%0A%20%20%20%20%20%20directionId%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D>) to run the query below in GraphiQL.

```graphql
{
  pattern(id: "HSL:1059:0:01") {
    code
    directionId
    name
    headsign
    trips {
      gtfsId
      tripHeadsign
      routeShortName
      directionId
    }
  }
}
```

2. Press play in GraphiQL to execute the query.

### Query trip with id

1. Click [this link](<https://api.digitransit.fi/graphiql/hsl/v2/gtfs/v1?query=%257B%250A%2520%2520trip%28id%253A%2520%2522HSL%253A1020_20240314_Pe_1_0933%2522%29%2520%257B%250A%2520%2520%2520%2520tripHeadsign%250A%2520%2520%2520%2520occupancy%2520%257B%250A%2520%2520%2520%2520%2520%2520occupancyStatus%250A%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%250A%2520%2520%257D%250A%257D>) to run the query below in GraphiQL.

```graphql
{
  trip(id: "HSL:1020_20240314_Pe_1_0933") {
    tripHeadsign
    occupancy {
      occupancyStatus
    }
  }
}
```
2. Press play in GraphiQL to execute the query.

Example response:

```json
{
  "data": {
    "trip": {
      "tripHeadsign": "Munkkivuori",
      "occupancy": {
        "occupancyStatus": "FEW_SEATS_AVAILABLE"
      }
    }
  }
}
```
