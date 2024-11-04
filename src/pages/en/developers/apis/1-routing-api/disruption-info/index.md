---
title: Disruption info
order: 60
---

**If you are not yet familiar with [GraphQL](../0-graphql) and [GraphiQL](../1-graphiql) it is highly recommended to review those pages at first.**

## What is disruption info?

Disruption info is information about the current and upcoming disruptions in public transport.

## Query examples

**Note:** For more details about the query type **alerts** you can use the **Documentation Explorer** provided in GraphiQL.

## Response language

Response language can be changed by using the request header `Accept-Language`. [Here](../4-translations) is more information.

### Query all currently available disruption info

1. Click [this link](https://api.digitransit.fi/graphiql/hsl/v2?query=%257B%250A%2520%2520alerts%2520%257B%250A%2520%2520%2520%2520alertDescriptionText%250A%2520%2520%257D%250A%257D) to run the query below in GraphiQL.

```graphql
{
  alerts {
    alertDescriptionText
  }
}
```

2. Press play in GraphiQL to execute the query. Depending on the current traffic situation, you might get information about one or more ongoing disruptions.

### Query all currently available disruption info and routes that it might affect

1. Click [this link](https://api.digitransit.fi/graphiql/hsl/v2?query=%257B%250A%2520%2520alerts%2520%257B%250A%2520%2520%2520%2520alertHeaderText%250A%2520%2520%2520%2520alertDescriptionText%250A%2520%2520%2520%2520alertUrl%250A%2520%2520%2520%2520effectiveStartDate%250A%2520%2520%2520%2520effectiveEndDate%250A%2520%2520%2520%2520entities%2520%257B%250A%2520%2520%2520%2520%2520%2520__typename%250A%2520%2520%2520%2520%2520%2520...%2520on%2520Route%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520gtfsId%250A%2520%2520%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%257D%250A%2520%2520%257D%250A%257D) to run the query below in GraphiQL.

```graphql
{
  alerts {
    alertHeaderText
    alertDescriptionText
    alertUrl
    effectiveStartDate
    effectiveEndDate
    entities {
      __typename
      ... on Route {
        gtfsId
      }
    }
  }
}
```

2. Press play in GraphiQL to execute the query. Depending on the current traffic situation, you might get information about one or more ongoing disruptions and routes it might affect.

Example response:
```json
{
  "data": {
    "alerts": [

      {
        "alertHeaderText": "Line 6, Diversion route, 17:00 - 18:00",
        "alertDescriptionText": "Line 6, Diversion route: Turns around in Kolmikulma., Reason: Technical failure, Estimated duration: 17:00 - 18:00",
        "alertUrl": "https://www.hsl.fi/en",
        "effectiveStartDate": 1725458400,
        "effectiveEndDate": 1725462000,
        "entities": [
          {
            "__typename": "Route",
            "gtfsId": "HSL:1006"
          },
          {
            "__typename": "Route",
            "gtfsId": "HSL:1006H"
          }
        ]
      },
    ]
  }
}
```

### Query disruptions and their severity levels

* Field `alertUrl` can contain an URL to a website that provides more details of the disruption
* Field `alertSeverityLevel` describes severity of the alert
  * **INFO** is used for informational alerts that don't have significant effects for user's journey
  * **WARNING** is used when the disruption can cause changes to user's journey
  * **SEVERE** is used when the disruption affects a significant part of public transport services (e.g. all train services being cancelled due to a technical problem)  
  

1. Click [this link](https://api.digitransit.fi/graphiql/hsl/v2?query=%257B%250A%2520%2520alerts%2520%257B%250A%2520%2520%2520%2520alertDescriptionText%250A%2520%2520%2520%2520alertSeverityLevel%250A%2520%2520%2520%2520alertUrl%250A%2520%2520%257D%250A%257D) to run the query below in GraphiQL.

```graphql
{
  alerts {
    alertDescriptionText
    alertSeverityLevel
    alertUrl
  }
}
```

2. Press play in GraphiQL to execute the query.

### Query only disruptions with specific severity and effect

* The following query should fetch all disruptions that have caused detours
  * Note that the query might return an empty list depending on the current situation


1. Click [this link](https://api.digitransit.fi/graphiql/hsl/v2?query=%257B%250A%2509alerts%28effect%253A%2520%255BMODIFIED_SERVICE%255D%252C%2520severityLevel%253A%2520%255BWARNING%255D%29%2520%257B%250A%2520%2520%2520%2520feed%250A%2520%2520%2520%2520alertSeverityLevel%250A%2520%2520%2520%2520alertEffect%250A%2520%2520%2520%2520alertCause%250A%2520%2520%2520%2520alertDescriptionText%250A%2520%2520%2520%2520alertHeaderText%250A%2520%2520%257D%250A%257D) to run the query below in GraphiQL.

```graphql
{
  alerts(effect: [MODIFIED_SERVICE], severityLevel: [WARNING]) {
    feed
    alertSeverityLevel
    alertEffect
    alertCause
    alertDescriptionText
    alertHeaderText
  }
}
```

2. Press play in GraphiQL to execute the query.


### Query disruptions from specific feeds

* Argument `feeds` can be used to query alerts only from specific feeds
  * List of available feeds can be queried using **feeds** query
  * For example, *HSL* feed contains data from HSL area  


1. Click [this link](https://api.digitransit.fi/graphiql/hsl/v2?query=%257B%250A%2520%2520alerts%28feeds%253A%2520%255B%2522HSL%2522%255D%29%2520%257B%250A%2520%2520%2520%2520feed%250A%2520%2520%2520%2520alertDescriptionText%250A%2520%2520%2520%2520entities%2520%257B%250A%2520%2520%2520%2520%2520%2520...%2520on%2520Route%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520gtfsId%250A%2520%2520%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%2520%2520...%2520on%2520Trip%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520gtfsId%250A%2520%2520%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%2520%2520...%2520on%2520Stop%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520gtfsId%250A%2520%2520%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520effectiveStartDate%250A%2520%2520%2520%2520effectiveEndDate%250A%2520%2520%257D%250A%257D) to run the query below in GraphiQL.

```graphql
{
  alerts(feeds: ["HSL"]) {
    feed
    alertDescriptionText
    entities {
      ... on Route {
        gtfsId
      }
      ... on Stop {
        gtfsId
      }
    }
    effectiveStartDate
    effectiveEndDate
  }
}
```

2. Press play in GraphiQL to execute the query.
