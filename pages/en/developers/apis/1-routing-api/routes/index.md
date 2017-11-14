---
title: Routes
---

If you haven't read getting started, [check that out first](../1-getting-started/).

## Terms

First, let's define some terms:

**Routes** are public transport service shown to customers under a single name, usually from point A to B and back. For example: trams 1 and 1A, buses 18 and 102T, or train A. Commonly used synonyms: line

**Pattern** is a sequence of stops as used by a specific direction and variant of a route. For example a tram entering/departing service from/to the depot usually joins at the middle of the route, or a route might have a short term diversion (poikkeusreitti) without changing the route name (longer diversions usually are marked as different routes).

**Trip** is a specific occurance of a route, usually identified by the route and exact departure time from the first stop. For example bus 102 leaving from Otaniemi on 2015-05-01 10:00, or more generally leaving from Otaniemi at 10:00 on specified days (e.g. Monday to Friday from 2015-08-10 to 2016-05-31 excluding holidays).

### Query all bus routes where number is like "58*"
```
{
  routes(name: "58", modes: "BUS") {
    id
    agency {
      id
    }
    shortName
    longName
    desc
  }
}
```

### Query all tram routes where number is like "1*"
```
{
  routes(name: "1", modes: "TRAM") {
    id
    agency {
      id
    }
    shortName
    longName
    desc
  }
}
```

3. Query stop names for bus number 50 for one direction
```
{
  pattern(id:"HSL:1050:1:01") {
    name
    stops{
      name  
    }
  }
}
```
