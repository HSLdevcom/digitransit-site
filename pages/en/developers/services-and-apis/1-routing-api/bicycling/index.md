---
title: Bicycling
---

If you haven't read getting started, [check that out first](../1-getting-started/).

## Two types of bicycling

Digitransit platform has APIs to query
- bicycling routes for your personal bike
- city bikes that are available in Helsinki.

## City bikes

**NOTE!** citybikes are only available in Helsinki.

**NOTE!** citybike API data is realtime and it is always up to date.

> https://www.hsl.fi/en/citybikes

![citybikes](./citybikes.png)


### Fetch all available city bike stations

```
{
  bikeRentalStations {
    name
    stationId
  }
}
```

### Fetch city bike station, and its current bike availability details

```
{
  bikeRentalStation(id:"B07") {
    stationId
    name
    bikesAvailable
    spacesAvailable
    lat
    lon
    allowDropoff
  }
}
```

### Route from Kamppi to Kasarmitori using city bike rental

- also show rental stations
- note use of mode `BICYCLE_RENT`, which is not returned as mode

```
{
  plan(
    fromPlace: "Kamppi, Helsinki",
    from: {lat: 60.168992, lon: 24.932366},
    toPlace: "Kasarmitori, Helsinki",
    to: {lat: 60.165246, lon: 24.949128},
    numItineraries: 3,
    modes: "BICYCLE_RENT,BUS,TRAM,SUBWAY,RAIL,FERRY,WALK",
    walkReluctance: 2.1,
    walkBoardCost: 600,
    minTransferTime: 180,
    walkSpeed: 1.2
  ) {
    itineraries{
      walkDistance,
      duration,
      legs {
        mode
        startTime
        endTime
        from {
          lat
          lon
          name
          bikeRentalStation {
            stationId
            name
          }
          stop {
            name
          }
        },
        to {
          lat
          lon
          name
        },
        agency {
          id
        },
        distance
        legGeometry {
          length
          points
        }
      }
    }
  }
}
```

## Riding your personal bike

### Query Bicycle route from Kamppi to Pisa

- note maxWalkDistance is used for cycling too

```
{
  plan(
    fromPlace: "Kamppi, Helsinki",
    from: {lat: 60.168992, lon: 24.932366},
    toPlace: "Pisa, Espoo",
    to: {lat: 60.175294, lon: 24.684855},
    modes: "BICYCLE",
    walkReluctance: 2.1,
    walkBoardCost: 600,
    minTransferTime: 180,
    walkSpeed: 1.2,
    maxWalkDistance: 10000
  ) {
    itineraries{
      walkDistance,
      duration,
      legs {
        mode
        startTime
        endTime
        from {
          lat
          lon
          name
          stop {
            code
            name

          }
        },
        to {
          lat
          lon
          name
        },
        agency {
          id
        },
        distance
        legGeometry {
          length
          points
        }
      }
    }
  }
}
```
