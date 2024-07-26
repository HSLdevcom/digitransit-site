---
title: Bicycling
order: 50
---

**If you are not yet familiar with [GraphQL](../0-graphql) and [GraphiQL](../1-graphiql) it is highly recommended to review those pages at first.**

## Bicycle related query types

The Routing API provides a few bicycle related query types:

- Query type **plan** can be used to query bicycling routes using either a city bike or your personal bike
- Query types **bikeRentalStation** and **bikeRentalStations** can be used to query city bike rental stations and bikes that are available
- Query types **bikePark** and **bikeParks** can be used to query bike parks that are available

**Note:** For more details about these query types you can use the **Documentation Explorer** provided in GraphiQL.

## City bikes

**Note:** City bike API data is realtime and it is always up to date.

> https://www.hsl.fi/en/citybikes

![citybikes](./citybikes.png)

## Query examples

**Note:** If the examples provided with an ID do not return what is expected then the ID in question may not be in use any more and you should try again with an existing ID.

### All available city bike stations

1. Click [this link](https://api.digitransit.fi/graphiql/hsl/v2?query=%257B%250A%2520%2520vehicleRentalStations%2520%257B%250A%2520%2520%2520%2520stationId%250A%2520%2520%2520%2520name%250A%2520%2520%2520%2520availableVehicles%2520%257B%250A%2520%2520%2520%2520%2520%2520byType%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520count%250A%2520%2520%2520%2520%2520%2520%2520%2520vehicleType%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520formFactor%250A%2520%2520%2520%2520%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%257D%250A%2520%2520%257D%250A%257D) to run the query below in GraphiQL. It should fetch all available city bike stations.

```graphql
{
  vehicleRentalStations {
    stationId
    name
    availableVehicles {
      byType {
        count
        vehicleType {
          formFactor
        }
      }
    }
  }
}
```

2. Press play in GraphiQL to execute the query.

### Single city bike station and its current bike availability details

1. Click [this link](https://api.digitransit.fi/graphiql/hsl/v2?query=%257B%250A%2520%2520vehicleRentalStation%28id%253A%2520%2522smoove%253A901%2522%29%2520%257B%250A%2520%2520%2520%2520stationId%250A%2520%2520%2520%2520name%250A%2520%2520%2520%2520availableVehicles%2520%257B%250A%2520%2520%2520%2520%2520%2520byType%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520count%250A%2520%2520%2520%2520%2520%2520%2520%2520vehicleType%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520formFactor%250A%2520%2520%2520%2520%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520availableSpaces%2520%257B%250A%2520%2520%2520%2520%2520%2520byType%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520count%250A%2520%2520%2520%2520%2520%2520%2520%2520vehicleType%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520formFactor%250A%2520%2520%2520%2520%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520lat%250A%2520%2520%2520%2520lon%250A%2520%2520%2520%2520allowDropoff%250A%2520%2520%257D%250A%257D) to run the query below in GraphiQL. It should fetch the city bike station and its current bike availability details.

```graphql
{
  vehicleRentalStation(id: "smoove:901") {
    stationId
    name
    availableVehicles {
      byType {
        count
        vehicleType {
          formFactor
        }
      }
    }
    availableSpaces {
      byType {
        count
        vehicleType {
          formFactor
        }
      }
    }
    lat
    lon
    allowDropoff
  }
}
```

2. Press play in GraphiQL to execute the query.

### All available bike parks

1. Click [this link](https://api.digitransit.fi/graphiql/hsl/v2?query=%257B%250A%2520%2520vehicleRentalStations%2520%257B%250A%2520%2520%2520%2520stationId%250A%2520%2520%2520%2520name%250A%2520%2520%257D%250A%257D) to run the query below in GraphiQL. It should fetch all available bike parks.

```graphql
{
  vehicleRentalStations {
    stationId
    name
  }
}
```

2. Press play in GraphiQL to execute the query.

### Single bike park

1. Click [this link](https://api.digitransit.fi/graphiql/hsl/v2?query=%257B%250A%2520%2520vehicleRentalStation%28id%253A%2520%2522smoove%253A038%2522%29%2520%257B%250A%2520%2520%2520%2520stationId%250A%2520%2520%2520%2520name%250A%2520%2520%2520%2520availableSpaces%2520%257B%250A%2520%2520%2520%2520%2520%2520total%250A%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520lat%250A%2520%2520%2520%2520lon%250A%2520%2520%2520%2520allowDropoff%250A%2520%2520%257D%250A%257D) to run the query below in GraphiQL. It should fetch the bike park and its current space availability details.

```graphql
{
  vehicleRentalStation(id: "smoove:038") {
    stationId
    name
    availableSpaces {
      total
    }
    lat
    lon
    allowDropoff
  }
}
```

2. Press play in GraphiQL to execute the query.

### Plan an itinerary from Kamppi to Kasarmitori using city bike rental

* Bike rental can be used by adding mode **BICYCLE_RENTAL** to `modes`.
  * Note that field `mode` does not diffrentiate between a rental bicycle and a personal bicycle.

1. Click [this link](https://api.digitransit.fi/graphiql/hsl/v2?query=%257B%250A%2520%2520planConnection%28%250A%2520%2520%2520%2520origin%253A%2520%257Blocation%253A%2520%257Bcoordinate%253A%2520%257Blatitude%253A%252060.168992%252C%2520longitude%253A%252024.932366%257D%257D%257D%250A%2520%2520%2520%2520destination%253A%2520%257Blocation%253A%2520%257Bcoordinate%253A%2520%257Blatitude%253A%252060.165246%252C%2520longitude%253A%252024.949128%257D%257D%257D%250A%2520%2520%2520%2520first%253A%25201%250A%2520%2520%2520%2520modes%253A%2520%257Bdirect%253A%2520%255BBICYCLE_RENTAL%252C%2520WALK%255D%257D%250A%2520%2520%29%2520%257B%250A%2520%2520%2520%2520edges%2520%257B%250A%2520%2520%2520%2520%2520%2520node%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520start%250A%2520%2520%2520%2520%2520%2520%2520%2520end%250A%2520%2520%2520%2520%2520%2520%2520%2520legs%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520duration%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520mode%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520distance%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520from%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520lat%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520lon%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520vehicleRentalStation%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520id%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520to%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520lat%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520lon%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520vehicleRentalStation%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520stationId%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520start%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520scheduledTime%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520end%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520scheduledTime%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%257D%250A%2520%2520%257D%250A%257D) to run the query below in GraphiQL. It should plan an itinerary from Kamppi to Kasarmitori using city bike rental and show which rental stations are used.

```graphql
{
  planConnection(
    origin: {location: {coordinate: {latitude: 60.168992, longitude: 24.932366}}}
    destination: {location: {coordinate: {latitude: 60.165246, longitude: 24.949128}}}
    first: 1
    modes: {direct: [BICYCLE_RENTAL, WALK]}
  ) {
    edges {
      node {
        start
        end
        legs {
          duration
          mode
          distance
          from {
            lat
            lon
            vehicleRentalStation {
              id
            }
          }
          to {
            lat
            lon
            vehicleRentalStation {
              stationId
            }
          }
          start {
            scheduledTime
          }
          end {
            scheduledTime
          }
        }
      }
    }
  }
}
```

2. Press play in GraphiQL to execute the query.

### Plan an itinerary from Kamppi to Pisa riding your personal bike

* Note that transport mode **WALK** must not be used when planning an itinerary with personal bike, as otherwise the whole journey is done by walking

1. Click [this link](https://api.digitransit.fi/graphiql/hsl?query=%7B%0A%20%20plan(%0A%20%20%20%20fromPlace%3A%20%22Kamppi%2C%20Helsinki%3A%3A60.168992%2C24.93236%22%2C%0A%20%20%20%20toPlace%3A%20%22Pisa%2C%20Espoo%3A%3A60.175294%2C24.68485%22%2C%0A%20%20%20%20transportModes%3A%20%7Bmode%3A%20BICYCLE%7D%0A%20%20)%20%7B%0A%20%20%20%20itineraries%7B%0A%20%20%20%20%20%20walkDistance%0A%20%20%20%20%20%20duration%0A%20%20%20%20%20%20legs%20%7B%0A%20%20%20%20%20%20%20%20mode%0A%20%20%20%20%20%20%20%20startTime%0A%20%20%20%20%20%20%20%20endTime%0A%20%20%20%20%20%20%20%20from%20%7B%0A%20%20%20%20%20%20%20%20%20%20lat%0A%20%20%20%20%20%20%20%20%20%20lon%0A%20%20%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20to%20%7B%0A%20%20%20%20%20%20%20%20%20%20lat%0A%20%20%20%20%20%20%20%20%20%20lon%0A%20%20%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20distance%0A%20%20%20%20%20%20%20%20legGeometry%20%7B%0A%20%20%20%20%20%20%20%20%20%20length%0A%20%20%20%20%20%20%20%20%20%20points%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A) to run the query below in GraphiQL. It should fetch bicycle route from Kamppi to Pisa.

```graphql
{
  plan(
    fromPlace: "Kamppi, Helsinki::60.168992,24.93236",
    toPlace: "Pisa, Espoo::60.175294,24.68485",
    transportModes: {mode: BICYCLE}
  ) {
    itineraries{
      walkDistance
      duration
      legs {
        mode
        startTime
        endTime
        from {
          lat
          lon
          name
        }
        to {
          lat
          lon
          name
        }
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

### Plan an itinerary from Herttoniemenranta to Itäkeskus and use your personal bike for the first part of the journey

* Using qualifier **PARK** for **BICYCLE** mode plans an itinerary, which begins by bicycling to a bike park from which the journey is continued by public transportation

1. Click [this link](https://api.digitransit.fi/graphiql/hsl?query=%7B%0A%20%20plan(%0A%20%20%20%20fromPlace%3A%20%22Herttoniemenranta%3A%3A60.18778%2C25.02987%22%2C%0A%20%20%20%20toPlace%3A%20%22It%C3%A4keskus%3A%3A60.21109%2C25.08094%22%2C%0A%20%20%20%20numItineraries%3A%201%2C%0A%20%20%20%20transportModes%3A%20%5B%7Bmode%3A%20BICYCLE%2C%20qualifier%3A%20PARK%7D%2C%20%7Bmode%3A%20WALK%7D%2C%20%7Bmode%3A%20TRANSIT%7D%5D%2C%0A%20%20)%20%7B%0A%20%20%20%20itineraries%7B%0A%20%20%20%20%20%20walkDistance%0A%20%20%20%20%20%20duration%0A%20%20%20%20%20%20legs%20%7B%0A%20%20%20%20%20%20%20%20mode%0A%20%20%20%20%20%20%20%20startTime%0A%20%20%20%20%20%20%20%20endTime%0A%20%20%20%20%20%20%20%20from%20%7B%0A%20%20%20%20%20%20%20%20%20%20lat%0A%20%20%20%20%20%20%20%20%20%20lon%0A%20%20%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%20%20%20%20stop%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20gtfsId%0A%20%20%20%20%20%20%20%20%20%20%20%20code%0A%20%20%20%20%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20to%20%7B%0A%20%20%20%20%20%20%20%20%20%20lat%0A%20%20%20%20%20%20%20%20%20%20lon%0A%20%20%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%20%20%20%20bikePark%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20bikeParkId%0A%20%20%20%20%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%20%20stop%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20gtfsId%0A%20%20%20%20%20%20%20%20%20%20%20%20code%0A%20%20%20%20%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20trip%20%7B%0A%20%20%20%20%20%20%20%20%20%20routeShortName%0A%20%20%20%20%20%20%20%20%20%20tripHeadsign%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20distance%0A%20%20%20%20%20%20%20%20legGeometry%20%7B%0A%20%20%20%20%20%20%20%20%20%20length%0A%20%20%20%20%20%20%20%20%20%20points%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A)  to run the query below in GraphiQL.

```graphql
{
  plan(
    fromPlace: "Herttoniemenranta::60.18778,25.02987",
    toPlace: "Itäkeskus::60.21109,25.08094",
    numItineraries: 1,
    transportModes: [{mode: BICYCLE, qualifier: PARK}, {mode: WALK}, {mode: TRANSIT}],
  ) {
    itineraries{
      walkDistance
      duration
      legs {
        mode
        startTime
        endTime
        from {
          lat
          lon
          name
          stop {
            gtfsId
            code
            name
          }
        }
        to {
          lat
          lon
          name
          bikePark {
            bikeParkId
            name
          }
          stop {
            gtfsId
            code
            name
          }
        }
        trip {
          routeShortName
          tripHeadsign
        }
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

### Plan an itinerary from Jätkäsaari to Ooppera using personal bike and optimizing for safety

* Argument `optimize: SAFE` can be used to set preference for safer routes, i.e. avoid crossing streets and use bike paths when possible

1. Click [this link](https://api.digitransit.fi/graphiql/hsl?query=%0A%7B%0A%20%20plan(%0A%20%20%20%20fromPlace%3A%20%2260.15978%2C24.91842%22%0A%20%20%20%20toPlace%3A%20%2260.18204%2C24.92756%22%0A%20%20%09transportModes%3A%20%5B%7Bmode%3A%20BICYCLE%7D%5D%0A%20%20%20%20optimize%3A%20SAFE%0A%20%20)%20%7B%0A%20%20%20%20itineraries%20%7B%0A%20%20%20%20%20%20legs%20%7B%0A%20%20%20%20%20%20%20%20mode%0A%20%20%20%20%20%20%20%20duration%0A%20%20%20%20%20%20%20%20distance%0A%20%20%20%20%20%20%20%20legGeometry%20%7B%0A%20%20%20%20%20%20%20%20%20%20points%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D) to run the query below in GraphiQL. The returned itinerary should use [Baana bike path](https://en.wikipedia.org/wiki/Helsinki_harbour_rail#Baana).

```graphql
{
  plan(
    fromPlace: "60.15978,24.91842"
    toPlace: "60.18204,24.92756"
    transportModes: [{mode: BICYCLE}]
    optimize: SAFE
  ) {
    itineraries {
      legs {
        mode
        duration
        distance
        legGeometry {
          points
        }
      }
    }
  }
}
```

2. Press play in GraphiQL to execute the query.

