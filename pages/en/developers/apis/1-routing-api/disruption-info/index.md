---
title: Disruption info
---
If you haven't read getting started, [check that out first](../1-getting-started/).

## What is disruption info?

Disruption info is information about current and upcoming disruptions in public transport.

## Query all currently available disruption info
```
{
  alerts {
    alertDescriptionText
  }
}
```

## Query all currently available disruption info and routes that it might affect
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
