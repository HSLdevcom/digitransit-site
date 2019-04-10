---
title: Cancelled trip times
---

**If you are not yet familiar with [GraphQL](../0-graphql) and [GraphiQL](../1-graphiql) it is highly recommended to review those pages at first.**

## Glossary

| Term                                    | Explanation                             |
|-----------------------------------------|-----------------------------------------|
| Trip time                               | A specific departure with specific direction for a specific route.<br/>For example: bus 102 leaving from Otaniemi on 2017-11-21 at 10:00. |
| Feed IDs (`feeds`)                      | Cancelled trip times are filtered by provided feed `feedId`s (e.g. `["HSL"]`). |
| Route IDs (`routes`)                    | Cancelled trip times are filtered by provided route `gtfsId`s (e.g. `["HSL:1098"]`). |
| Trip pattern codes (`patterns`)         | Cancelled trip times are filtered by provided trip pattern `code`s (e.g. `["HSL:1098:1:01"]`). |
| Trip IDs (`trips`)                      | Cancelled trip times are filtered by provided trip `gtfsId`s (e.g. `["HSL:1098_20190405_Ma_2_1455"]`). |
| Min date (`minDate`)                    | Only cancelled trip times scheduled to run on `minDate` or after are returned. Format: `"2019-12-23"` or `"20191223"`. |
| Max date (`maxDate`)                    | Only cancelled trip times scheduled to run on `maxDate` or before are returned. Format: `"2019-12-23"` or `"20191223"`. |
| Min departure time (`minDepartureTime`) | Only cancelled trip times that have first stop departure time at minDepartureTime or after are returned. Format: seconds since midnight of minDate. |
| Max departure time (`maxDepartureTime`) | Only cancelled trip times that have first stop departure time at maxDepartureTime or before are returned. Format: seconds since midnight of maxDate. |
| Min arrival time (`minArrivalTime`)     | Only cancelled trip times that have last stop arrival time at minArrivalTime or after are returned. Format: seconds since midnight of minDate. |
| Max arrival time (`maxArrivalTime`)     | Only cancelled trip times that have last stop arrival time at maxArrivalTime or before are returned. Format: seconds since midnight of maxDate. |

## What are cancelled trip times?

Cancelled trip times are trip times for which the whole departure has been cancelled.

**Note:** Cancelled trip times do not include a reason why the departure has been cancelled.

## Query examples

### Query all cancelled trip times for feed HSL

```graphql
{
  cancelledTripTimes(
    feeds: ["HSL"]
  ) {
    scheduledDeparture
    serviceDay
    trip {
      gtfsId
      tripHeadsign
      routeShortName
      directionId
      pattern {
        code
        name
      }
      route {
        gtfsId
        longName
      }
    }
    realtimeState
    headsign
  }
}
```

### Query all cancelled trip times for route HSL:1098

```graphql
{
  cancelledTripTimes(
    routes: ["HSL:1098"]
  ) {
    scheduledDeparture
    serviceDay
    trip {
      gtfsId
      tripHeadsign
      routeShortName
      directionId
      pattern {
        code
        name
      }
      route {
        gtfsId
        longName
      }
    }
    realtimeState
    headsign
  }
}
```

### Query all cancelled trip times for pattern HSL:1098:1:01

```graphql
{
  cancelledTripTimes(
    patterns: ["HSL:1098:1:01"]
  ) {
    scheduledDeparture
    serviceDay
    trip {
      gtfsId
      tripHeadsign
      routeShortName
      directionId
      pattern {
        code
        name
      }
      route {
        gtfsId
        longName
      }
    }
    realtimeState
    headsign
  }
}
```

### Query all cancelled trip times for trip HSL:1098\_20190405\_Ma\_2\_1455

```graphql
{
  cancelledTripTimes(
    trips: ["HSL:1098_20190405_Ma_2_1455"]
  ) {
    scheduledDeparture
    serviceDay
    trip {
      gtfsId
      tripHeadsign
      routeShortName
      directionId
      pattern {
        code
        name
      }
      route {
        gtfsId
        longName
      }
    }
    realtimeState
    headsign
  }
}
```

### Query cancelled trip times for feed HSL on 2019-04-08 and 2019-04-09

```graphql
{
  cancelledTripTimes(
    feeds: ["HSL"]
    minDate: "2019-04-08"
    maxDate: "2019-04-09"
  ) {
    scheduledDeparture
    serviceDay
    trip {
      gtfsId
      tripHeadsign
      routeShortName
      directionId
      pattern {
        code
        name
      }
      route {
        gtfsId
        longName
      }
    }
    realtimeState
    headsign
  }
}
```

### Query cancelled trip times for feed HSL between 2019-04-08 14:55 and 2019-04-09 15:06 according to departure time of the first stop

```graphql
{
  cancelledTripTimes(
    feeds: ["HSL"]
    minDate: "2019-04-08"
    maxDate: "2019-04-09"
    minDepartureTime: 53700
    maxDepartureTime: 54360
  ) {
    scheduledDeparture
    serviceDay
    trip {
      gtfsId
      tripHeadsign
      routeShortName
      directionId
      pattern {
        code
        name
      }
      route {
        gtfsId
        longName
      }
    }
    realtimeState
    headsign
  }
}
```

### Query cancelled trip times for feed HSL between 2019-04-08 14:55 and 2019-04-09 15:06 according to arrival time of the last stop

```graphql
{
  cancelledTripTimes(
    feeds: ["HSL"]
    minDate: "2019-04-08"
    maxDate: "2019-04-09"
    minArrivalTime: 53700
    maxArrivalTime: 54360
  ) {
    scheduledDeparture
    serviceDay
    trip {
      gtfsId
      tripHeadsign
      routeShortName
      directionId
      pattern {
        code
        name
      }
      route {
        gtfsId
        longName
      }
    }
    realtimeState
    headsign
  }
}
```
