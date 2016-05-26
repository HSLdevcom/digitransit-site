---
title: Stops
---

If you haven't read getting started, [check that out first](../1-getting-started/).

## Terms

First, let’s define some terms:

**Agency** is some public transport provider, e.g. HSL.

Also, familiarize yourself with [routes terms](../routes/).

## Notes about stop ids

Stop ids are in "acencyid:stopid" format. HSL agencyid is **HSL**. Stop id is available as **gtfsId**.

### Query all stops, returning their id, name and location
```
{
  stops{
    gtfsId
    name
    lat
    lon
  }
}
```

### Query stop by id:
```
{
  stop(id: "HSL:1173210") {
    name
    wheelchairBoarding
  }
}
```

### Query stop by id and information about routes that go through it
```
{
  stop(id: "HSL:1173112") {
    name
    lat
    lon
    patterns {
      id
      name
      route {
        gtfsId
        shortName
        longName
      }
      directionId
    }
  }
}
```


### Query all stops where name is like "hertton"
```
{
  stops(name: "hertton") {
    id
    name
    wheelchairBoarding
  }
}
```

### Query a stop by number
```
{
  stops(name: "4040") {
    id
    name
    wheelchairBoarding
  }
}
```
