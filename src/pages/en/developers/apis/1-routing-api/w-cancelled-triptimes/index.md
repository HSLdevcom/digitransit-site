---
title: Cancelled trip times
---

**If you are not yet familiar with [GraphQL](../0-graphql) and [GraphiQL](../1-graphiql) it is highly recommended to review those pages at first.**

## Glossary

| Term                   | Explanation                     |
|------------------------|---------------------------------|
| Feed ID                | Feeds provide routing data (e.g. stops and timetables) from one or more public transport agencies to the API. See [Glossary](../0-graphql) for details. |
| Service date		       | Date for which the cancelled trip times are queried for. |
| Trip time              | A specific departure with specific direction for a specific route.<br/>For example: bus 102 leaving from Otaniemi on 2017-11-21 at 10:00. |

## What are cancelled trip times?

Cancelled trip times are trip times for which the whole departure has been cancelled. Note that cancelled trip times do not include a reason why the departure has been cancelled.

## Query examples

**Note:** For more details about the query types related to **cancelled trip times** you can use the **Documentation Explorer** provided in GraphiQL.

### Query all cancelled trip times for feed HSL

1. Click [this link](https://api.digitransit.fi/graphiql/hsl?query=%7B%0A%20%20cancelledTripTimes(feedId%3A%20%22HSL%22)%20%7B%0A%20%20%20%20scheduledDeparture%0A%20%20%20%20realtimeDeparture%0A%20%20%20%20serviceDay%0A%20%20%20%20stop%20%7B%0A%20%20%20%20%20%20name%0A%20%20%20%20%7D%0A%20%20%20%20trip%20%7B%0A%20%20%20%20%20%20tripHeadsign%0A%20%20%20%20%20%20routeShortName%0A%20%20%20%20%20%20directionId%0A%20%20%20%20%7D%0A%20%20%20%20realtimeState%0A%20%20%20%20headsign%0A%20%20%7D%0A%7D) to run the query below in GraphiQL.

```graphql
{
  cancelledTripTimes(feedId: "HSL") {
    scheduledDeparture
    realtimeDeparture
    serviceDay
    stop {
      name
    }
    trip {
      tripHeadsign
      routeShortName
      directionId
    }
    realtimeState
    headsign
  }
}
```

2. Press play in GraphiQL to execute the query.

### Query cancelled trip times for feed HSL for specific service day

1. Click [this link](https://api.digitransit.fi/graphiql/hsl?query=%7B%0A%20%20cancelledTripTimes(feedId%3A%20%22HSL%22%2C%20serviceDate%3A%20%2220190326%22)%20%7B%0A%20%20%20%20scheduledDeparture%0A%20%20%20%20realtimeDeparture%0A%20%20%20%20serviceDay%0A%20%20%20%20stop%20%7B%0A%20%20%20%20%20%20name%0A%20%20%20%20%7D%0A%20%20%20%20trip%20%7B%0A%20%20%20%20%20%20tripHeadsign%0A%20%20%20%20%20%20routeShortName%0A%20%20%20%20%20%20directionId%0A%20%20%20%20%7D%0A%20%20%20%20realtimeState%0A%20%20%20%20headsign%0A%20%20%7D%0A%7D) to run the query below in GraphiQL.

```graphql
{
  cancelledTripTimes(feedId: "HSL", serviceDate: "20190326") {
    scheduledDeparture
    realtimeDeparture
    serviceDay
    stop {
      name
    }
    trip {
      tripHeadsign
      routeShortName
      directionId
    }
    realtimeState
    headsign
  }
}
```

2. Press play in GraphiQL to execute the query.
