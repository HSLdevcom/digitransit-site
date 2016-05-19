---
title: Itinerary planning
---

If you haven't read getting started, [check that out first](../1-getting-started/).

## Terms

First, let's define some terms:

**Transportation Mode** or just **Mode** is a means of transport, for example: walking, cycling, driving a car, bus, train, subway, tram, ferry, taxi, airplane.

**Itinerary** is a combination of different transportation modes at certain times to reach from origin to destination. For example to go from Pasila (Helsinki) to Koskikeskus (Tampere) you could walk to the train station, take the 14:00 P train to Aviapolis, walk to the airport, take the 15:00 flight to Tampere-Pirkkala, take a taxi to destination. Commonly used synonyms: journey

**Leg** is one part of an itinerary.

**Origin** When the context is a person; the geographical point where an itinerary begins. When the context is a route; the first stop on the route or the first location on the headsign.

**destination** When the context is a person; the geographical point where an itinerary ends. When the context is a route; the last stop on the route or the last location on the headsign.

**headsign** is a description of a route usually written on the front of the vehicle. For example: "Helsinki" (for just the destination) or "Helsinki - Tampere" (for both the origin and destination).

### Note about Itinerary leg geometries

TODO

### Plan an itinerary from location (60.4,24.5) to (60.41,24.51)
```
{
  plan(
    from: {lat: 60.4, lon: 24.5}
    to: {lat: 60.41, lon: 24.51}
    numItineraries: 3
  ) {
    itineraries {
      legs {
        startTime
        endTime
        mode
        duration
        realTime
        distance
        transitLeg
      }
    }
  }
}
```

### Basic route from Kamppi to Pisa

```
{
  plan(
    fromPlace: "Kamppi, Helsinki",
    from: {lat: 60.168992, lon: 24.932366},
    toPlace: "Pisa, Espoo",
    to: {lat: 60.175294, lon: 24.684855},
    modes: "BUS,TRAM,RAIL,SUBWAY,FERRY,WALK",
    walkReluctance: 2.1,
    walkBoardCost: 600,
    minTransferTime: 180,
    walkSpeed: 1.2,
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

### Plan an itinerary using only WALK and RAIL modes
```
{
  plan(
    from: {lat: 60.199196699999995, lon: 24.9397302}
    to: {lat: 60.168438, lon: 24.929283}
    numItineraries: 3
    modes: "WALK,RAIL"
  ) {
    itineraries {
      legs {
        startTime
        endTime
        mode
        duration
        realTime
        distance
        transitLeg
      }
    }
  }
}
```

### Plan an itinerary from Hakaniemi to Keilaniemi and modify some params

- return five results
- using other than subway
- fast walking speed
- safety margin 10 minutes

```
{
  plan(
    fromPlace: "Hakaniemi, Helsinki",
    from: {lat: 60.179267, lon: 24.951501},
    toPlace: "Keilaniemi, Espoo",
    to: {lat: 60.1762, lon: 24.836584},
    date: "2016-05-20",
    time: "23:28:00"
    numItineraries: 5,
    modes: "BUS,TRAM,RAIL,FERRY,WALK",
    walkReluctance: 2.1,
    walkBoardCost: 600,
    minTransferTime: 600,
    walkSpeed: 1.7,
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
