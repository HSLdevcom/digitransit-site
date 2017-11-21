---
title: Disruption info
---

**If you are not yet familiar with [GraphQL](../0-graphql) and [GraphiQL](../1-graphiql) it is highly recommended to review those pages at first.**

## What is disruption info?

Disruption info is information about the current and upcoming disruptions in public transport.

## Query examples

**Note:** For more details about the query type **alerts** you can use the **Documentation Explorer** provided in GraphiQL.

### Query all currently available disruption info

1. Click [this link](https://api.digitransit.fi/graphiql/hsl?query=%7B%0A%20%20alerts%20%7B%0A%20%20%20%20alertDescriptionText%0A%20%20%7D%0A%7D) to run the query below in GraphiQL.

```
{
  alerts {
    alertDescriptionText
  }
}
```

2. Press play in GraphiQL to execute the query. Depending on the current traffic situation, you might get information about one or more ongoing disruptions.

### Query all currently available disruption info and routes that it might affect

1. Click [this link](https://api.digitransit.fi/graphiql/hsl?query=%7B%0A%20%20alerts%20%7B%0A%20%20%20%20alertHeaderText%0A%20%20%20%20alertHeaderTextTranslations%20%7B%0A%20%20%20%20%20%20text%0A%20%20%20%20%20%20language%0A%20%20%20%20%7D%0A%20%20%20%20alertDescriptionText%0A%20%20%20%20alertDescriptionTextTranslations%20%7B%0A%20%20%20%20%20%20text%0A%20%20%20%20%20%20language%0A%20%20%20%20%7D%0A%20%20%20%20alertUrl%0A%20%20%20%20effectiveStartDate%0A%20%20%20%20effectiveEndDate%0A%20%20%20%20agency%20%7B%0A%20%20%20%20%20%20gtfsId%0A%20%20%20%20%7D%0A%20%20%20%20route%20%7B%0A%20%20%20%20%20%20gtfsId%0A%20%20%20%20%7D%0A%20%20%20%20patterns%20%7B%0A%20%20%20%20%20%20code%0A%20%20%20%20%7D%0A%20%20%20%20trip%20%7B%0A%20%20%20%20%20%20gtfsId%0A%20%20%20%20%7D%0A%20%20%20%20stop%20%7B%0A%20%20%20%20%20%20gtfsId%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D) to run the query below in GraphiQL.

```
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
```
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
    }
  }
}
```
