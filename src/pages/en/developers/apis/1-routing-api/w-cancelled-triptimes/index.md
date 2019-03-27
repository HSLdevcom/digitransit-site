---
title: Cancelled trip times
---

**If you are not yet familiar with [GraphQL](../0-graphql) and [GraphiQL](../1-graphiql) it is highly recommended to review those pages at first.**

## Glossary

| Term                   | Explanation                     |
|------------------------|---------------------------------|
| Feed ID (`feed`)         | Feeds provide routing data (e.g. stops and timetables) from one or more public transport agencies to the API. See [Glossary](../0-graphql) for details. |
| After date	(`afterDate`)| Only the cancelled trip times that are scheduled for this date or later date are returned. |
| After time	(`afterTime`)| Only the cancelled trip times that have scheduled last stop arrival times (time when for example a bus is scheduled to arrive to its last stop) at this time or later on `afterDate` are returned. Cancelled trip times on dates later than `afterDate` are returned regardless of `afterTime`. |
| Trip time              | A specific departure with specific direction for a specific route.<br/>For example: bus 102 leaving from Otaniemi on 2017-11-21 at 10:00. |

## What are cancelled trip times?

Cancelled trip times are trip times for which the whole departure has been cancelled.

**Note:** Cancelled trip times do not include a reason why the departure has been cancelled.

## Query examples

**Note:** For more details about the query types related to **cancelled trip times** you can use the **Documentation Explorer** provided in GraphiQL.

### Query all cancelled trip times for feed HSL

1. Click [this link](https://api.digitransit.fi/graphiql/hsl?query=%7B%0A%20%20cancelledTripTimes(feed%3A%20%22HSL%22)%20%7B%0A%20%20%20%20scheduledDeparture%0A%20%20%20%20serviceDay%0A%20%20%20%20trip%20%7B%0A%20%20%20%20%20%20tripHeadsign%0A%20%20%20%20%20%20routeShortName%0A%20%20%20%20%20%20directionId%0A%20%20%20%20%20%20pattern%20%7B%0A%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%20%20realtimeState%0A%20%20%20%20headsign%0A%20%20%7D%0A%7D) to run the query below in GraphiQL.

```graphql
{
  cancelledTripTimes(feedId: "HSL") {
    scheduledDeparture
    serviceDay
    trip {
      tripHeadsign
      routeShortName
      directionId
      pattern {
        name
      }
    }
    realtimeState
    headsign
  }
}
```

2. Press play in GraphiQL to execute the query.

### Query cancelled trip times for feed HSL for a specific day and later

1. Click [this link](https://api.digitransit.fi/graphiql/hsl?query=%7B%0A%20%20cancelledTripTimes(feed%3A%20%22HSL%22%2C%20afterDate%3A%20%222019-03-26%22)%20%7B%0A%20%20%20%20scheduledDeparture%0A%20%20%20%20serviceDay%0A%20%20%20%20trip%20%7B%0A%20%20%20%20%20%20tripHeadsign%0A%20%20%20%20%20%20routeShortName%0A%20%20%20%20%20%20directionId%0A%20%20%20%20%20%20pattern%20%7B%0A%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%20%20realtimeState%0A%20%20%20%20headsign%0A%20%20%7D%0A%7D) to run the query below in GraphiQL.

**Note:** You may need to change the `afterDate` parameter to see proper results.

```graphql
{
  cancelledTripTimes(feed: "HSL", afterDate: "2019-03-26") {
    scheduledDeparture
    serviceDay
    trip {
      tripHeadsign
      routeShortName
      directionId
      pattern {
        name
      }
    }
    realtimeState
    headsign
  }
}
```

2. Press play in GraphiQL to execute the query.

### Query cancelled trip times for feed HSL for a specific time and later

1. Click [this link](https://api.digitransit.fi/graphiql/hsl?query=%7B%0A%20%20cancelledTripTimes(feed%3A%20%22HSL%22%2C%20afterDate%3A%20%222019-03-26%22%2C%20afterTime%3A%2046561)%20%7B%0A%20%20%20%20scheduledDeparture%0A%20%20%20%20serviceDay%0A%20%20%20%20trip%20%7B%0A%20%20%20%20%20%20tripHeadsign%0A%20%20%20%20%20%20routeShortName%0A%20%20%20%20%20%20directionId%0A%20%20%20%20%20%20pattern%20%7B%0A%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%20%20realtimeState%0A%20%20%20%20headsign%0A%20%20%7D%0A%7D) to run the query below in GraphiQL.

**Note:** You may need to change the `afterDate` and `afterTime` parameters to see proper results.

```graphql
{
  cancelledTripTimes(feed: "HSL", afterDate: "2019-03-26", afterTime: 46561) {
    scheduledDeparture
    serviceDay
    trip {
      tripHeadsign
      routeShortName
      directionId
      pattern {
        name
      }
    }
    realtimeState
    headsign
  }
}
```

2. Press play in GraphiQL to execute the query.
