---
title: Cancelled trip times
---

**If you are not yet familiar with [GraphQL](../0-graphql) and [GraphiQL](../1-graphiql) it is highly recommended to review those pages at first.**

## Glossary

| Term                           | Explanation                     |
|--------------------------------|---------------------------------|
| Resource type (`resourceType`) | Cancelled trip times can be filtered by different resources which can be `FEED`, `ROUTE`, `PATTERN` or `TRIP`. ID of the resource is provided with the `resourceId` parameter. See [Glossary](../0-graphql) for details. |
| Resource ID (`resourceId`)   | ID of the resource. For resource type `FEED` this is the `feedId` (e.g. `HSL`), for `ROUTE` the `gtfsId` (e.g. `HSL:1098`), for `PATTERN` the `code` (e.g. `HSL:1098:1:01`) and for `TRIP` the `gtfsId` (e.g. `HSL:1098_20190405_Ma_2_1455`). |
| Min date	(`minDate`)          | Only cancelled trip times scheduled to run on `minDate` or after are returned. Format: 2019-12-23 or 20191223. |
| Max date	(`maxDate`)          | Only cancelled trip times scheduled to run on `maxDate` or before are returned. Format: 2019-12-23 or 20191223. |
| Time type	(`timeType`)         | Cancelled trip times can be further filtered by time of service day. The type of the time filter can be `DEPARTURE` or `ARRIVAL`. The time is provided with `minTime` and/or `maxTime` parameters. |
| Min time	(`minTime`)          | Only cancelled trip times scheduled to run at `minTime` or after are returned. If `timeType` equals to `DEPARTURE` then `minTime` refers to the departure time of the first stop and if `timeType` equals to `ARRIVAL` then it refers to the arrival time of the last stop. Format: seconds since midnight of minDate. |
| Max time	(`maxTime`)          | Only cancelled trip times scheduled to run at `maxTime` or before are returned. If `timeType` equals to `DEPARTURE` then `maxTime` refers to the departure time of the first stop and if `timeType` equals to `ARRIVAL` then it refers to the arrival time of the last stop. Format: seconds since midnight of maxDate. |
| Trip time              | A specific departure with specific direction for a specific route.<br/>For example: bus 102 leaving from Otaniemi on 2017-11-21 at 10:00. |

## What are cancelled trip times?

Cancelled trip times are trip times for which the whole departure has been cancelled.

**Note:** Cancelled trip times do not include a reason why the departure has been cancelled.

## Query examples

**Note:** For more details about the query types related to **cancelled trip times** you can use the **Documentation Explorer** provided in GraphiQL.

### Query all cancelled trip times for feed HSL

1. Click [this link](https://dev-api.digitransit.fi/graphiql/hsl?query=%7B%0A%20%20cancelledTripTimes(%0A%20%20%20%20resourceType%3A%20FEED%2C%20%0A%20%20%20%20resourceId%3A%20%22HSL%22%0A%20%20)%20%7B%0A%20%20%20%20scheduledDeparture%0A%20%20%20%20serviceDay%0A%20%20%20%20trip%20%7B%0A%20%20%20%20%20%20gtfsId%0A%20%20%20%20%20%20tripHeadsign%0A%20%20%20%20%20%20routeShortName%0A%20%20%20%20%20%20directionId%0A%20%20%20%20%20%20pattern%20%7B%0A%20%20%20%20%20%20%20%20code%0A%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20route%20%7B%0A%20%20%20%20%20%20%20%20gtfsId%0A%20%20%20%20%20%20%20%20longName%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%20%20realtimeState%0A%20%20%20%20headsign%0A%20%20%7D%0A%7D) to run the query below in GraphiQL.

**Note:** This example runs on Digitransit development server. Please don't use the development server for production applications.

```graphql
{
  cancelledTripTimes(
    resourceType: FEED,
    resourceId: "HSL"
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

1. Click [this link](https://dev-api.digitransit.fi/graphiql/hsl?query=%7B%0A%20%20cancelledTripTimes(%0A%20%20%20%20resourceType%3A%20ROUTE%2C%20%0A%20%20%20%20resourceId%3A%20%22HSL%3A1098%22%0A%20%20)%20%7B%0A%20%20%20%20scheduledDeparture%0A%20%20%20%20serviceDay%0A%20%20%20%20trip%20%7B%0A%20%20%20%20%20%20gtfsId%0A%20%20%20%20%20%20tripHeadsign%0A%20%20%20%20%20%20routeShortName%0A%20%20%20%20%20%20directionId%0A%20%20%20%20%20%20pattern%20%7B%0A%20%20%20%20%20%20%20%20code%0A%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20route%20%7B%0A%20%20%20%20%20%20%20%20gtfsId%0A%20%20%20%20%20%20%20%20longName%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%20%20realtimeState%0A%20%20%20%20headsign%0A%20%20%7D%0A%7D) to run the query below in GraphiQL.

**Note:** This example runs on Digitransit development server. Please don't use the development server for production applications.

**Note:** You may need to change `resourceId` in order to see proper results.

```graphql
{
  cancelledTripTimes(
    resourceType: ROUTE,
    resourceId: "HSL:1098"
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

1. Click [this link](https://dev-api.digitransit.fi/graphiql/hsl?query=%7B%0A%20%20cancelledTripTimes(%0A%20%20%20%20resourceType%3A%20PATTERN%2C%20%0A%20%20%20%20resourceId%3A%20%22HSL%3A1098%3A1%3A01%22%0A%20%20)%20%7B%0A%20%20%20%20scheduledDeparture%0A%20%20%20%20serviceDay%0A%20%20%20%20trip%20%7B%0A%20%20%20%20%20%20gtfsId%0A%20%20%20%20%20%20tripHeadsign%0A%20%20%20%20%20%20routeShortName%0A%20%20%20%20%20%20directionId%0A%20%20%20%20%20%20pattern%20%7B%0A%20%20%20%20%20%20%20%20code%0A%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20route%20%7B%0A%20%20%20%20%20%20%20%20gtfsId%0A%20%20%20%20%20%20%20%20longName%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%20%20realtimeState%0A%20%20%20%20headsign%0A%20%20%7D%0A%7D) to run the query below in GraphiQL.

**Note:** This example runs on Digitransit development server. Please don't use the development server for production applications.

**Note:** You may need to change `resourceId` in order to see proper results.

```graphql
{
  cancelledTripTimes(
    resourceType: PATTERN,
    resourceId: "HSL:1098:1:01"
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

1. Click [this link](https://dev-api.digitransit.fi/graphiql/hsl?query=%7B%0A%20%20cancelledTripTimes(%0A%20%20%20%20resourceType%3A%20TRIP%2C%20%0A%20%20%20%20resourceId%3A%20%22HSL%3A1098_20190405_Ma_2_1455%22%0A%20%20)%20%7B%0A%20%20%20%20scheduledDeparture%0A%20%20%20%20serviceDay%0A%20%20%20%20trip%20%7B%0A%20%20%20%20%20%20gtfsId%0A%20%20%20%20%20%20tripHeadsign%0A%20%20%20%20%20%20routeShortName%0A%20%20%20%20%20%20directionId%0A%20%20%20%20%20%20pattern%20%7B%0A%20%20%20%20%20%20%20%20code%0A%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20route%20%7B%0A%20%20%20%20%20%20%20%20gtfsId%0A%20%20%20%20%20%20%20%20longName%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%20%20realtimeState%0A%20%20%20%20headsign%0A%20%20%7D%0A%7D) to run the query below in GraphiQL.

**Note:** This example runs on Digitransit development server. Please don't use the development server for production applications.

**Note:** You may need to change `resourceId` in order to see proper results.

```graphql
{
  cancelledTripTimes(
    resourceType: TRIP,
    resourceId: "HSL:1098_20190405_Ma_2_1455"
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

1. Click [this link](https://dev-api.digitransit.fi/graphiql/hsl?query=%7B%0A%20%20cancelledTripTimes(%0A%20%20%20%20resourceType%3A%20FEED%2C%20%0A%20%20%20%20resourceId%3A%20%22HSL%22%2C%0A%20%20%20%20minDate%3A%20%222019-04-08%22%2C%0A%20%20%20%20maxDate%3A%20%222019-04-09%22%0A%20%20)%20%7B%0A%20%20%20%20scheduledDeparture%0A%20%20%20%20serviceDay%0A%20%20%20%20trip%20%7B%0A%20%20%20%20%20%20gtfsId%0A%20%20%20%20%20%20tripHeadsign%0A%20%20%20%20%20%20routeShortName%0A%20%20%20%20%20%20directionId%0A%20%20%20%20%20%20pattern%20%7B%0A%20%20%20%20%20%20%20%20code%0A%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20route%20%7B%0A%20%20%20%20%20%20%20%20gtfsId%0A%20%20%20%20%20%20%20%20longName%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%20%20realtimeState%0A%20%20%20%20headsign%0A%20%20%7D%0A%7D) to run the query below in GraphiQL.

**Note:** This example runs on Digitransit development server. Please don't use the development server for production applications.

**Note:** You may need to change `minDate` and `maxDate` parameters to see proper results.

```graphql
{
  cancelledTripTimes(
    resourceType: FEED,
    resourceId: "HSL",
    minDate: "2019-04-08",
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

1. Click [this link](https://dev-api.digitransit.fi/graphiql/hsl?query=%7B%0A%20%20cancelledTripTimes(%0A%20%20%20%20resourceType%3A%20FEED%2C%20%0A%20%20%20%20resourceId%3A%20%22HSL%22%2C%0A%20%20%20%20minDate%3A%20%222019-04-08%22%2C%0A%20%20%20%20maxDate%3A%20%222019-04-09%22%2C%0A%20%20%20%20timeType%3A%20DEPARTURE%2C%0A%20%20%20%20minTime%3A%2053700%2C%0A%20%20%20%20maxTime%3A%2054360%0A%20%20)%20%7B%0A%20%20%20%20scheduledDeparture%0A%20%20%20%20serviceDay%0A%20%20%20%20trip%20%7B%0A%20%20%20%20%20%20gtfsId%0A%20%20%20%20%20%20tripHeadsign%0A%20%20%20%20%20%20routeShortName%0A%20%20%20%20%20%20directionId%0A%20%20%20%20%20%20pattern%20%7B%0A%20%20%20%20%20%20%20%20code%0A%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20route%20%7B%0A%20%20%20%20%20%20%20%20gtfsId%0A%20%20%20%20%20%20%20%20longName%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%20%20realtimeState%0A%20%20%20%20headsign%0A%20%20%7D%0A%7D) to run the query below in GraphiQL.

**Note:** This example runs on Digitransit development server. Please don't use the development server for production applications.

**Note:** You may need to change `minDate`, `maxDate`, `minTime` and `maxTime` in order to see proper results.

```graphql
{
  cancelledTripTimes(
    resourceType: FEED,
    resourceId: "HSL",
    minDate: "2019-04-08",
    maxDate: "2019-04-09",
    timeType: DEPARTURE,
    minTime: 53700,
    maxTime: 54360
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

1. Click [this link](https://dev-api.digitransit.fi/graphiql/hsl?query=%7B%0A%20%20cancelledTripTimes(%0A%20%20%20%20resourceType%3A%20FEED%2C%20%0A%20%20%20%20resourceId%3A%20%22HSL%22%2C%0A%20%20%20%20minDate%3A%20%222019-04-08%22%2C%0A%20%20%20%20maxDate%3A%20%222019-04-09%22%2C%0A%20%20%20%20timeType%3A%20ARRIVAL%2C%0A%20%20%20%20minTime%3A%2053700%2C%0A%20%20%20%20maxTime%3A%2054360%0A%20%20)%20%7B%0A%20%20%20%20scheduledDeparture%0A%20%20%20%20serviceDay%0A%20%20%20%20trip%20%7B%0A%20%20%20%20%20%20gtfsId%0A%20%20%20%20%20%20tripHeadsign%0A%20%20%20%20%20%20routeShortName%0A%20%20%20%20%20%20directionId%0A%20%20%20%20%20%20pattern%20%7B%0A%20%20%20%20%20%20%20%20code%0A%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20route%20%7B%0A%20%20%20%20%20%20%20%20gtfsId%0A%20%20%20%20%20%20%20%20longName%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%20%20realtimeState%0A%20%20%20%20headsign%0A%20%20%7D%0A%7D) to run the query below in GraphiQL.

**Note:** This example runs on Digitransit development server. Please don't use the development server for production applications.

**Note:** You may need to change `minDate`, `maxDate`, `minTime` and `maxTime` in order to see proper results.

```graphql
{
  cancelledTripTimes(
    resourceType: FEED,
    resourceId: "HSL",
    minDate: "2019-04-08",
    maxDate: "2019-04-09",
    timeType: ARRIVAL,
    minTime: 53700,
    maxTime: 54360
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
