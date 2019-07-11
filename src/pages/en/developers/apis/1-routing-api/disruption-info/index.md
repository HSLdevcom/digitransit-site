---
title: Disruption info
order: 60
---

**If you are not yet familiar with [GraphQL](../0-graphql) and [GraphiQL](../1-graphiql) it is highly recommended to review those pages at first.**

## What is disruption info?

Disruption info is information about the current and upcoming disruptions in public transport.

## Query examples

**Note:** For more details about the query type **alerts** you can use the **Documentation Explorer** provided in GraphiQL.

### Query all currently available disruption info

1. Click [this link](https://api.digitransit.fi/graphiql/hsl?query=%7B%0A%20%20alerts%20%7B%0A%20%20%20%20alertDescriptionText%0A%20%20%7D%0A%7D) to run the query below in GraphiQL.

```graphql
{
  alerts {
    alertDescriptionText
  }
}
```

2. Press play in GraphiQL to execute the query. Depending on the current traffic situation, you might get information about one or more ongoing disruptions.

### Query all currently available disruption info and routes that it might affect

1. Click [this link](https://api.digitransit.fi/graphiql/hsl?query=%7B%0A%20%20alerts%20%7B%0A%20%20%20%20alertHeaderText%0A%20%20%20%20alertHeaderTextTranslations%20%7B%0A%20%20%20%20%20%20text%0A%20%20%20%20%20%20language%0A%20%20%20%20%7D%0A%20%20%20%20alertDescriptionText%0A%20%20%20%20alertDescriptionTextTranslations%20%7B%0A%20%20%20%20%20%20text%0A%20%20%20%20%20%20language%0A%20%20%20%20%7D%0A%20%20%20%20alertUrl%0A%20%20%20%20effectiveStartDate%0A%20%20%20%20effectiveEndDate%0A%20%20%20%20agency%20%7B%0A%20%20%20%20%20%20gtfsId%0A%20%20%20%20%7D%0A%20%20%20%20route%20%7B%0A%20%20%20%20%20%20gtfsId%0A%20%20%20%20%7D%0A%20%20%20%20patterns%20%7B%0A%20%20%20%20%20%20code%0A%20%20%20%20%7D%0A%20%20%20%20trip%20%7B%0A%20%20%20%20%20%20gtfsId%0A%20%20%20%20%7D%0A%20%20%20%20stop%20%7B%0A%20%20%20%20%20%20gtfsId%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D) to run the query below in GraphiQL.

```graphql
{
  alerts {
    alertHeaderText
    alertHeaderTextTranslations {
      text
      language
    }
    alertDescriptionText
    alertDescriptionTextTranslations {
      text
      language
    }
    alertUrl
    effectiveStartDate
    effectiveEndDate
    agency {
      gtfsId
    }
    route {
      gtfsId
    }
    patterns {
      code
    }
    trip {
      gtfsId
    }
    stop {
      gtfsId
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
        "alertHeaderText": null,
        "alertHeaderTextTranslations": [],
        "alertDescriptionText": "Seutuliikenteen linja 561 Aviapoliksesta, klo 14:37 peruttu. Syy: tekninen vika.",
        "alertDescriptionTextTranslations": [
          {
            "text": "Seutuliikenteen linja 561 Aviapoliksesta, klo 14:37 peruttu. Syy: tekninen vika.",
            "language": "fi"
          },
          {
            "text": "Regiontrafik, linje 561 från Aviapolis, kl. 14:37 inställd. Orsak: tekniska problem.",
            "language": "sv"
          },
          {
            "text": "Regional traffic, line 561 from Aviapolis, 14:37 cancelled. Cause: technical problems.",
            "language": "en"
          }
        ],
        "alertUrl": null,
        "effectiveStartDate": 1470309600,
        "effectiveEndDate": 1470314220,
        "agency": null,
        "route": {
          "gtfsId": "HSL:4561"
        },
        "patterns": [],
        "trip": {
          "gtfsId": "HSL:4561_20160801_To_2_1437"
        },
        "stop": null
      }
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
  

1. Click [this link](https://api.digitransit.fi/graphiql/hsl?query={%0A%09alerts%20{%0A%20%20%20%20alertDescriptionText%0A%20%20%20%20alertSeverityLevel%0A%20%20%20%20alertUrl%0A%20%20%20%20alertUrlTranslations%20{%0A%20%20%20%20%20%20text%0A%20%20%20%20%20%20language%0A%20%20%20%20}%0A%20%20}%0A}) to run the query below in GraphiQL.

```graphql
{
  alerts {
    alertDescriptionText
    alertSeverityLevel
    alertUrl
    alertUrlTranslations {
      text
      language
    }
  }
}
```

2. Press play in GraphiQL to execute the query.

### Query only disruptions with specific severity and effect

* The following query should fetch all disruptions that have caused detours
  * Note that the query might return an empty list depending on the current situation


1. Click [this link](https://api.digitransit.fi/graphiql/hsl?query=%7B%0A%09alerts(effect%3A%20%5BMODIFIED_SERVICE%5D%2C%20severityLevel%3A%20%5BWARNING%5D)%20%7B%0A%20%20%20%20feed%0A%20%20%20%20alertSeverityLevel%0A%20%20%20%20alertEffect%0A%20%20%20%20alertCause%0A%20%20%20%20alertDescriptionText%0A%20%20%20%20alertHeaderText%0A%20%20%7D%0A%7D) to run the query below in GraphiQL.

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


1. Click [this link](https://api.digitransit.fi/graphiql/finland?query=%7B%0A%09alerts(feeds%3A%20%5B%22HSL%22%5D)%20%7B%0A%20%20%20%20feed%0A%20%20%20%20alertDescriptionText%0A%20%20%20%20alertDescriptionTextTranslations%20%7B%0A%20%20%20%20%20%20text%0A%20%20%20%20%20%20language%0A%20%20%20%20%7D%0A%20%20%20%20route%20%7B%0A%20%20%20%20%20%20gtfsId%0A%20%20%20%20%7D%0A%20%20%20%20trip%20%7B%0A%20%20%20%20%20%20gtfsId%0A%20%20%20%20%7D%0A%20%20%20%20stop%20%7B%0A%20%20%20%20%20%20gtfsId%0A%20%20%20%20%7D%0A%20%20%20%20effectiveStartDate%0A%20%20%20%20effectiveEndDate%0A%20%20%7D%0A%7D) to run the query below in GraphiQL.

```graphql
{
  alerts(feeds: ["HSL"]) {
    feed
    alertDescriptionText
    alertDescriptionTextTranslations {
      text
      language
    }
    route {
      gtfsId
    }
    trip {
      gtfsId
    }
    stop {
      gtfsId
    }
    effectiveStartDate
    effectiveEndDate
  }
}
```

2. Press play in GraphiQL to execute the query.
