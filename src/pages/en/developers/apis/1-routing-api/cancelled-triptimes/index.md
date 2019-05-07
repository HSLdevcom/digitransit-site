---
title: Cancelled trip times
order: 70
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

**Note:** For more details about the query type **alerts** you can use the **Documentation Explorer** provided in GraphiQL.

### Query all cancelled trip times for feed HSL

1. Click [this link](https://api.digitransit.fi/graphiql/hsl?query=%7B%0A%20%20cancelledTripTimes(%0A%20%20%20%20feeds%3A%20%5B%22HSL%22%5D%0A%20%20)%20%7B%0A%20%20%20%20scheduledDeparture%0A%20%20%20%20serviceDay%0A%20%20%20%20trip%20%7B%0A%20%20%20%20%20%20gtfsId%0A%20%20%20%20%20%20tripHeadsign%0A%20%20%20%20%20%20routeShortName%0A%20%20%20%20%20%20directionId%0A%20%20%20%20%20%20pattern%20%7B%0A%20%20%20%20%20%20%20%20code%0A%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20route%20%7B%0A%20%20%20%20%20%20%20%20gtfsId%0A%20%20%20%20%20%20%20%20longName%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%20%20realtimeState%0A%20%20%20%20headsign%0A%20%20%7D%0A%7D) to run the query below in GraphiQL.

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

2. Press play in GraphiQL to execute the query.

### Query all cancelled trip times for route HSL:1098

1. Click [this link](https://api.digitransit.fi/graphiql/hsl?query=%7B%0A%20%20cancelledTripTimes(%0A%20%20%20%20routes%3A%20%5B%22HSL%3A1098%22%5D%0A%20%20)%20%7B%0A%20%20%20%20scheduledDeparture%0A%20%20%20%20serviceDay%0A%20%20%20%20trip%20%7B%0A%20%20%20%20%20%20gtfsId%0A%20%20%20%20%20%20tripHeadsign%0A%20%20%20%20%20%20routeShortName%0A%20%20%20%20%20%20directionId%0A%20%20%20%20%20%20pattern%20%7B%0A%20%20%20%20%20%20%20%20code%0A%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20route%20%7B%0A%20%20%20%20%20%20%20%20gtfsId%0A%20%20%20%20%20%20%20%20longName%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%20%20realtimeState%0A%20%20%20%20headsign%0A%20%20%7D%0A%7D) to run the query below in GraphiQL.

**Note:** You may need to change the `routes` parameter to see proper results.

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

2. Press play in GraphiQL to execute the query.

### Query all cancelled trip times for pattern HSL:1098:1:01

1. Click [this link](https://api.digitransit.fi/graphiql/hsl?query=%7B%0A%20%20cancelledTripTimes(%0A%20%20%20%20patterns%3A%20%5B%22HSL%3A1098%3A1%3A01%22%5D%0A%20%20)%20%7B%0A%20%20%20%20scheduledDeparture%0A%20%20%20%20serviceDay%0A%20%20%20%20trip%20%7B%0A%20%20%20%20%20%20gtfsId%0A%20%20%20%20%20%20tripHeadsign%0A%20%20%20%20%20%20routeShortName%0A%20%20%20%20%20%20directionId%0A%20%20%20%20%20%20pattern%20%7B%0A%20%20%20%20%20%20%20%20code%0A%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20route%20%7B%0A%20%20%20%20%20%20%20%20gtfsId%0A%20%20%20%20%20%20%20%20longName%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%20%20realtimeState%0A%20%20%20%20headsign%0A%20%20%7D%0A%7D) to run the query below in GraphiQL.

**Note:** You may need to change the `patterns` parameter to see proper results.

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

2. Press play in GraphiQL to execute the query.

### Query all cancelled trip times for trip HSL:1098\_20190405\_Ma\_2\_1455

1. Click [this link](https://api.digitransit.fi/graphiql/hsl?query=%7B%0A%20%20cancelledTripTimes(%0A%20%20%20%20trips%3A%20%5B%22HSL%3A1098_20190405_Ma_2_1455%22%5D%0A%20%20)%20%7B%0A%20%20%20%20scheduledDeparture%0A%20%20%20%20serviceDay%0A%20%20%20%20trip%20%7B%0A%20%20%20%20%20%20gtfsId%0A%20%20%20%20%20%20tripHeadsign%0A%20%20%20%20%20%20routeShortName%0A%20%20%20%20%20%20directionId%0A%20%20%20%20%20%20pattern%20%7B%0A%20%20%20%20%20%20%20%20code%0A%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20route%20%7B%0A%20%20%20%20%20%20%20%20gtfsId%0A%20%20%20%20%20%20%20%20longName%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%20%20realtimeState%0A%20%20%20%20headsign%0A%20%20%7D%0A%7D) to run the query below in GraphiQL.

**Note:** You may need to change the `trips` parameter to see proper results.

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

2. Press play in GraphiQL to execute the query.

### Query cancelled trip times for feed HSL on 2019-04-08 and 2019-04-09

1. Click [this link](https://api.digitransit.fi/graphiql/hsl?query=%7B%0A%20%20cancelledTripTimes(%0A%20%20%20%20feeds%3A%20%5B%22HSL%22%5D%0A%20%20%20%20minDate%3A%20%222019-04-08%22%0A%20%20%20%20maxDate%3A%20%222019-04-09%22%0A%20%20)%20%7B%0A%20%20%20%20scheduledDeparture%0A%20%20%20%20serviceDay%0A%20%20%20%20trip%20%7B%0A%20%20%20%20%20%20gtfsId%0A%20%20%20%20%20%20tripHeadsign%0A%20%20%20%20%20%20routeShortName%0A%20%20%20%20%20%20directionId%0A%20%20%20%20%20%20pattern%20%7B%0A%20%20%20%20%20%20%20%20code%0A%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20route%20%7B%0A%20%20%20%20%20%20%20%20gtfsId%0A%20%20%20%20%20%20%20%20longName%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%20%20realtimeState%0A%20%20%20%20headsign%0A%20%20%7D%0A%7D) to run the query below in GraphiQL.

**Note:** You may need to change the `minDate` and `maxDate` parameters to see proper results.

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

2. Press play in GraphiQL to execute the query.

### Query cancelled trip times for feed HSL between 2019-04-08 14:55 and 2019-04-09 15:06 according to departure time of the first stop

1. Click [this link](https://api.digitransit.fi/graphiql/hsl?query=%7B%0A%20%20cancelledTripTimes(%0A%20%20%20%20feeds%3A%20%5B%22HSL%22%5D%0A%20%20%20%20minDate%3A%20%222019-04-08%22%0A%20%20%20%20maxDate%3A%20%222019-04-09%22%0A%20%20%20%20minDepartureTime%3A%2053700%0A%20%20%20%20maxDepartureTime%3A%2054360%0A%20%20)%20%7B%0A%20%20%20%20scheduledDeparture%0A%20%20%20%20serviceDay%0A%20%20%20%20trip%20%7B%0A%20%20%20%20%20%20gtfsId%0A%20%20%20%20%20%20tripHeadsign%0A%20%20%20%20%20%20routeShortName%0A%20%20%20%20%20%20directionId%0A%20%20%20%20%20%20pattern%20%7B%0A%20%20%20%20%20%20%20%20code%0A%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20route%20%7B%0A%20%20%20%20%20%20%20%20gtfsId%0A%20%20%20%20%20%20%20%20longName%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%20%20realtimeState%0A%20%20%20%20headsign%0A%20%20%7D%0A%7D) to run the query below in GraphiQL.

**Note:** You may need to change the `minDate`, `maxDate`, `minDepartureTime` and `maxDepartureTime` parameters to see proper results.

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

2. Press play in GraphiQL to execute the query.

### Query cancelled trip times for feed HSL between 2019-04-08 14:55 and 2019-04-09 15:06 according to arrival time of the last stop

1. Click [this link](https://api.digitransit.fi/graphiql/hsl?query=%7B%0A%20%20cancelledTripTimes(%0A%20%20%20%20feeds%3A%20%5B%22HSL%22%5D%0A%20%20%20%20minDate%3A%20%222019-04-08%22%0A%20%20%20%20maxDate%3A%20%222019-04-09%22%0A%20%20%20%20minArrivalTime%3A%2053700%0A%20%20%20%20maxArrivalTime%3A%2054360%0A%20%20)%20%7B%0A%20%20%20%20scheduledDeparture%0A%20%20%20%20serviceDay%0A%20%20%20%20trip%20%7B%0A%20%20%20%20%20%20gtfsId%0A%20%20%20%20%20%20tripHeadsign%0A%20%20%20%20%20%20routeShortName%0A%20%20%20%20%20%20directionId%0A%20%20%20%20%20%20pattern%20%7B%0A%20%20%20%20%20%20%20%20code%0A%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20route%20%7B%0A%20%20%20%20%20%20%20%20gtfsId%0A%20%20%20%20%20%20%20%20longName%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%20%20realtimeState%0A%20%20%20%20headsign%0A%20%20%7D%0A%7D) to run the query below in GraphiQL.

**Note:** You may need to change the `minDate`, `maxDate`, `minArrivalTime` and `maxArrivalTime` parameters to see proper results.

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

2. Press play in GraphiQL to execute the query.
