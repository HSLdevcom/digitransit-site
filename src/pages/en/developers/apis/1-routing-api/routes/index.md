---
title: Routes
order: 90
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

### <a name="fuzzytrip"></a>Query a trip without its id

- Query type **fuzzyTrip** can be used to query a trip without its id, if other details uniquely identifying the trip are available
  - This query is mostly useful for getting additional details for vehicle positions received from [the vehicle position API](../../4-realtime-api/vehicle-positions/)

For example, if the following vehicle position message is received

```json
{
  "desi": "550",
  "dir": "1",
  "oper": 12,
  "veh": 1511,
  "tst": "2018-07-03T06:36:32Z",
  "tsi": 1530599792,
  "spd": 0.47,
  "hdg": 246,
  "lat": 60.214227,
  "long": 24.885639,
  "acc": 0.08,
  "dl": -23,
  "odo": 15899,
  "drst": 0,
  "oday": "2018-07-03",
  "jrn": 195,
  "line": 261,
  "start": "09:03"
}
```

on topic `/hfp/v1/journey/ongoing/bus/0012/01511/2550/1/Westendinasema/09:03/1465101/5/60;24/28/18/45`, it is possible to parse:

- Route id from the topic: _2550_
- Direction id from the topic: _1_
- Departure time from the message: _09:03_
- Departure date from the message: _2018-07-03_

**Note:**

1. Vehicle position messages use different direction id than the Routing API
   - Direction id _1_ in a vehicle position is same as direction id _0_ in the Routing API
   - Direction id _2_ in a vehicle position is same as direction id _1_ in the Routing API
2. Departure time must be in seconds
   - e.g. _09:03_ = `9 * 60 * 60 + 3 * 60` = _32580_
   - If the date in fields `oday` and `tst` is not the same and the departure time (`start`) is earlier than the time in `tst`, add 86400 seconds to departure time
     - This is due to differences in time formats, when vehicles which have departed after midnight have the previous date as operating day
     - e.g.
       - `tst = 2018-08-16T00:15:00Z`
       - `oday = 2018-08-15`
       - `start = 00:10`
       - → _00:10_ = `0 * 60 * 60 + 10 * 60 + 86400` = _87000_
3. Due to a bug in the vehicle position API, some route ids don't match the route id in the routing API
   - In this case, **fuzzyTrip** query returns `null`

For example, the following query checks if the vehicle, which sent the vehicle position message above, is wheelchair accessible:

```graphql
{
  fuzzyTrip(route: "HSL:2550", direction: 0, date: "2018-07-03", time: 32580) {
    route {
      shortName
    }
    wheelchairAccessible
  }
}
```
