---
title: Routes
---

**If you are not yet familiar with [GraphQL](../0-graphql) and [GraphiQL](../1-graphiql) it is highly recommended to review those pages at first.**

## Glossary

| Term                                  | Explanation                     |
|---------------------------------------|---------------------------------|
| Route                                 | A public transport service shown to customers under a single name, usually from point A to B and back. For example: trams 1 and 1A, buses 18 and 102T, or train A. Commonly used synonym: line
| Pattern                               | A sequence of stops as used by a specific direction and variant of a route. For example a tram entering/departing service from/to the depot usually joins at the middle of the route, or a route might have a short term diversion (poikkeusreitti) without changing the route name (longer diversions are usually marked as different routes).
| Trip                                  | A specific occurance of a route, usually identified by the route and exact departure time from the first stop. For example bus 102 leaving from Otaniemi on 2017-11-21 10:00, or more generally leaving from Otaniemi at 10:00 on specified days (e.g. from Monday to Friday from 2017-11-20 to 2017-11-24 excluding holidays).

## Query examples

**Note:** For more details about the query types **routes** and **pattern** and their parameters you can use the **Documentation Explorer** provided in GraphiQL.

**Note:** If the examples provided with an id or other parameter do not return what is expected then the value in question may not be in use any more and you should try again with an existing value.

### Query all bus routes where number is like "58*"

1. Click [this link](https://api.digitransit.fi/graphiql/hsl?query=%7B%0A%20%20routes(name%3A%20%2258%22%2C%20modes%3A%20%22BUS%22)%20%7B%0A%20%20%20%20id%0A%20%20%20%20agency%20%7B%0A%20%20%20%20%20%20id%0A%20%20%20%20%7D%0A%20%20%20%20shortName%0A%20%20%20%20longName%0A%20%20%20%20desc%0A%20%20%7D%0A%7D) to run the query below in GraphiQL.

```
{
  routes(name: "58", modes: "BUS") {
    id
    agency {
      id
    }
    shortName
    longName
    desc
  }
}
```

2. Press play in GraphiQL to execute the query.

### Query all tram routes where number is like "1*"

1. Click [this link](https://api.digitransit.fi/graphiql/hsl?query=%7B%0A%20%20routes(name%3A%20%221%22%2C%20modes%3A%20%22TRAM%22)%20%7B%0A%20%20%20%20id%0A%20%20%20%20agency%20%7B%0A%20%20%20%20%20%20id%0A%20%20%20%20%7D%0A%20%20%20%20shortName%0A%20%20%20%20longName%0A%20%20%20%20desc%0A%20%20%7D%0A%7D) to run the query below in GraphiQL.

```
{
  routes(name: "1", modes: "TRAM") {
    id
    agency {
      id
    }
    shortName
    longName
    desc
  }
}
```

2. Press play in GraphiQL to execute the query.

### Query patterns of a route

1. Click [this link](https://api.digitransit.fi/graphiql/hsl?query=%7B%0A%20%20routes(name%3A%20%2259%22%2C%20modes%3A%20%22BUS%22)%20%7B%0A%20%20%20%20shortName%0A%20%20%20%20longName%0A%20%20%20%20patterns%20%7B%0A%20%20%20%20%20%20directionId%0A%20%20%20%20%20%20name%0A%20%20%20%20%20%20code%0A%20%20%20%20%20%20headsign%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A%0A%0A) to run the query below in GraphiQL.
```
{
  routes(name: "59", modes: "BUS") {
    shortName
    longName
    patterns {
      directionId
      name
      code
      headsign
    }
  }
}
```

2. Press play in GraphiQL to execute the query.

Example response:

``` javascript
{
  "data": {
    "routes": [
      {
        "shortName": "59",
        "longName": "Herttoniemi(M)-Pasila-Pajamäki",
        "patterns": [
          {
            "directionId": 0,
            "name": "59 to Pajamäki (HSL:1461110)",
            "code": "HSL:1059:0:01",
            "headsign": "Pajamäki"
          },
          {
            "directionId": 1,
            "name": "59 to Herttoniemi (M) (HSL:1431104)",
            "code": "HSL:1059:1:01",
            "headsign": "Herttoniemi(M)"
          }
        ]
      }
    ]
  }
}
```

### Query stop names by pattern id

* See previous example on how to find pattern ids for a route
  * Pattern id is value of ```code``` in the pattern object

1. Click [this link](https://api.digitransit.fi/graphiql/hsl?query=%7B%0A%20%20pattern(id%3A%20%22HSL%3A1059%3A0%3A01%22)%20%7B%0A%20%20%20%20name%0A%20%20%20%20stops%20%7B%0A%20%20%20%20%20%20name%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A%0A%0A) to run the query below in GraphiQL.


```
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

### <a name="fuzzytrip"></a>Query a trip without its id

* Query type **fuzzyTrip** can be used to query a trip without its id, if other details uniquely identifying the trip are available 
  * This query is mostly useful for getting additional details for vehicle positions received from [the vehicle position API](../../4-realtime-api/vehicle-positions/)

For example, if the following vehicle position message is received 
```
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
on topic `/hfp/v1/journey/ongoing/bus/0012/01511/`**2550**`/`**1**`/Westendinasema/09:03/1465101/5/60;24/28/18/45`, it is possible to parse:
* Route id from the topic: *2550*
* Direction id from the topic: *1*
* Departure time from the message: *09:03*
* Departure date from the message: *2018-07-03*

**Note:**
1. Vehicle position messages use different direction id than the Routing API
   * Direction id *1* in a vehicle position is same as direction id *0* in the Routing API
   * Direction id *2* in a vehicle position is same as direction id *1* in the Routing API
2. Departure time must be in seconds
   * e.g. *09:03* = `9 * 60 * 60 + 3 * 60` = *32580*
   * If the date in fields `oday` and `tst` is not the same, add 86400 seconds to departure time
     * This is due to differences in time formats, when vehicles which have departed after midnight have the previous date as operating day   

For example, the following query checks if the vehicle, which sent the vehicle position message above, is wheelchair accessible:
```
{
  fuzzyTrip(route: "HSL:2550", direction: 0, date: "2018-07-03", time: 32580) {
    route {
      shortName
    }
    wheelchairAccessible
  }
}
```
