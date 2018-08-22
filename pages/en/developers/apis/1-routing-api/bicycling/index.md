---
title: Bicycling
---

**If you are not yet familiar with [GraphQL](../0-graphql) and [GraphiQL](../1-graphiql) it is highly recommended to review those pages at first.**

## Bicycle related query types

The Routing API provides a few bicycle related query types:

- Query type **plan** can be used to query bicycling routes using either a city bike or your personal bike
- Query types **bikeRentalStation** and **bikeRentalStations** can be used to query city bike rental stations and bikes that are available in Helsinki
- Query types **bikePark** and **bikeParks** can be used to query  city bike parks that are available in Helsinki

**Note:** For more details about these query types you can use the **Documentation Explorer** provided in GraphiQL.

## City bikes

**Note:** City bikes are currently only available in Helsinki, but Espoo is planning to take them into use during 2018.

**Note:** City bike API data is realtime and it is always up to date.

> https://www.hsl.fi/en/citybikes

![citybikes](./citybikes.png)

## Query examples

**Note:** If the examples provided with an id do not return what is expected then the id in question may not be in use any more and you should try again with an existing id.

### All available city bike stations

1. Click [this link](https://api.digitransit.fi/graphiql/hsl?query=%7B%0A%20%20bikeRentalStations%20%7B%0A%20%20%20%20name%0A%20%20%20%20stationId%0A%20%20%7D%0A%7D) to run the query below in GraphiQL. It should fetch all available city bike stations.

```
{
  bikeRentalStations {
    name
    stationId
  }
}
```

2. Press play in GraphiQL to execute the query.

### City bike station and its current bike availability details

1. Click [this link](https://api.digitransit.fi/graphiql/hsl?query=%7B%0A%20%20bikeRentalStation(id%3A%22070%22)%20%7B%0A%20%20%20%20stationId%0A%20%20%20%20name%0A%20%20%20%20bikesAvailable%0A%20%20%20%20spacesAvailable%0A%20%20%20%20lat%0A%20%20%20%20lon%0A%20%20%20%20allowDropoff%0A%20%20%7D%0A%7D) to run the query below in GraphiQL. It should fetch the city bike station and its current bike availability details.

```
{
  bikeRentalStation(id:"070") {
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

2. Press play in GraphiQL to execute the query.

### All available city bike parks

1. Click [this link](https://api.digitransit.fi/graphiql/hsl?query=%7B%0A%20%20bikeParks%7B%0A%20%20%20%20id%0A%20%20%20%20bikeParkId%0A%20%20%20%20name%0A%20%20%20%7D%0A%7D) to run the query below in GraphiQL. It should fetch all available city bike parks.

```
{
  bikeParks{
    id
    bikeParkId
    name
   }
}
```

2. Press play in GraphiQL to execute the query.

### Available city bike park

1. Click [this link](https://api.digitransit.fi/graphiql/hsl?query=%7B%0A%20%20bikePark(id%3A%22906%22)%20%7B%0A%20%20%20%20id%0A%20%20%20%20bikeParkId%0A%20%20%20%20name%0A%20%20%20%20spacesAvailable%0A%20%20%20%20lat%0A%20%20%20%20lon%0A%20%20%7D%0A%7D) to run the query below in GraphiQL. It should fetch the city bike park and its current space availability details.

```
{
  bikePark(id:"906") {
    id
    bikeParkId
    name
    spacesAvailable
    lat
    lon
  }
}

```

2. Press play in GraphiQL to execute the query.

### Route from Kamppi to Kasarmitori using city bike rental

1. Click [this link](https://api.digitransit.fi/graphiql/hsl?query=%7B%0A%20%20plan(%0A%20%20%20%20fromPlace%3A%20%22Kamppi%2C%20Helsinki%3A%3A60.168992%2C24.932366%22%2C%0A%20%20%20%20toPlace%3A%20%22Kasarmitori%2C%20Helsinki%3A%3A60.165246%2C24.949128%22%2C%0A%20%20%20%20numItineraries%3A%203%2C%0A%20%20%20%20modes%3A%20%22BICYCLE_RENT%2CBUS%2CTRAM%2CSUBWAY%2CRAIL%2CFERRY%2CWALK%22%2C%0A%20%20%20%20walkReluctance%3A%202.1%2C%0A%20%20%20%20walkBoardCost%3A%20600%2C%0A%20%20%20%20minTransferTime%3A%20180%2C%0A%20%20%20%20walkSpeed%3A%201.2%0A%20%20)%20%7B%0A%20%20%20%20itineraries%7B%0A%20%20%20%20%20%20walkDistance%2C%0A%20%20%20%20%20%20duration%2C%0A%20%20%20%20%20%20legs%20%7B%0A%20%20%20%20%20%20%20%20mode%0A%20%20%20%20%20%20%20%20startTime%0A%20%20%20%20%20%20%20%20endTime%0A%20%20%20%20%20%20%20%20from%20%7B%0A%20%20%20%20%20%20%20%20%20%20lat%0A%20%20%20%20%20%20%20%20%20%20lon%0A%20%20%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%20%20%20%20bikeRentalStation%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20stationId%0A%20%20%20%20%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%20%20stop%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%20%20to%20%7B%0A%20%20%20%20%20%20%20%20%20%20lat%0A%20%20%20%20%20%20%20%20%20%20lon%0A%20%20%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%20%20agency%20%7B%0A%20%20%20%20%20%20%20%20%20%20id%0A%20%20%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%20%20distance%0A%20%20%20%20%20%20%20%20legGeometry%20%7B%0A%20%20%20%20%20%20%20%20%20%20length%0A%20%20%20%20%20%20%20%20%20%20points%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D) to run the query below in GraphiQL. It should fetch route from Kamppi to Kasarmitori using city bike rental and show also rental stations.

**Note:** Use of mode BICYCLE_RENT, which is not returned as mode.

```
{
  plan(
    fromPlace: "Kamppi, Helsinki::60.168992,24.932366",
    toPlace: "Kasarmitori, Helsinki::60.165246,24.949128",
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

2. Press play in GraphiQL to execute the query.

### Query Bicycle route from Kamppi to Pisa riding your personal bike

1. Click [this link](https://api.digitransit.fi/graphiql/hsl?query=%7B%0A%20%20plan(%0A%20%20%20%20fromPlace%3A%20%22Kamppi%2C%20Helsinki%3A%3A60.168992%2C24.93236%22%2C%0A%20%20%20%20toPlace%3A%20%22Pisa%2C%20Espoo%3A%3A60.175294%2C24.68485%22%2C%0A%20%20%20%20modes%3A%20%22BICYCLE%22%2C%0A%20%20%20%20walkReluctance%3A%202.1%2C%0A%20%20%20%20walkBoardCost%3A%20600%2C%0A%20%20%20%20minTransferTime%3A%20180%2C%0A%20%20%20%20walkSpeed%3A%201.2%2C%0A%20%20%20%20maxWalkDistance%3A%2010000%0A%20%20)%20%7B%0A%20%20%20%20itineraries%7B%0A%20%20%20%20%20%20walkDistance%2C%0A%20%20%20%20%20%20duration%2C%0A%20%20%20%20%20%20legs%20%7B%0A%20%20%20%20%20%20%20%20mode%0A%20%20%20%20%20%20%20%20startTime%0A%20%20%20%20%20%20%20%20endTime%0A%20%20%20%20%20%20%20%20from%20%7B%0A%20%20%20%20%20%20%20%20%20%20lat%0A%20%20%20%20%20%20%20%20%20%20lon%0A%20%20%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%20%20%20%20stop%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20code%0A%20%20%20%20%20%20%20%20%20%20%20%20name%0A%0A%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%20%20to%20%7B%0A%20%20%20%20%20%20%20%20%20%20lat%0A%20%20%20%20%20%20%20%20%20%20lon%0A%20%20%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%20%20agency%20%7B%0A%20%20%20%20%20%20%20%20%20%20id%0A%20%20%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%20%20distance%0A%20%20%20%20%20%20%20%20legGeometry%20%7B%0A%20%20%20%20%20%20%20%20%20%20length%0A%20%20%20%20%20%20%20%20%20%20points%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D) to run the query below in GraphiQL. It should fetch bicycle route from Kamppi to Pisa.

**Note:** maxWalkDistance is used for cycling too

```
{
  plan(
    fromPlace: "Kamppi, Helsinki::60.168992,24.93236",
    toPlace: "Pisa, Espoo::60.175294,24.68485",
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

2. Press play in GraphiQL to execute the query.
