---
title: Disruption info
---
If you haven't read getting started, [check that out first](../1-getting-started/).

## What is disruption info?

Disruption info is information about current and upcoming disruptions in public transport.

## Query all current disruption info
```
{
  alerts {
    alertDescriptionText
  }
}
```

## Query all current disruption info and routes that it might affect
```
{
  alerts {
    alertDescriptionText
    route {
      gtfsId
    }
  }
}
```
