---
title: Bicycling
order: 50
---

**If you are not yet familiar with [GraphQL](../0-graphql) and [GraphiQL](../1-graphiql) it is highly recommended to review those pages at first.**

## Bicycle related query types

The Routing API provides a few bicycle related query types:

- Query type **planConnection** can be used to query bicycling routes using either a city bike or your personal bike
- Query types **vehicleRentalStation** and **vehicleRentalStations** can be used to query city bike rental stations and bikes that are available
- Query types **vehicleParking** and **vehicleParkings** can be used to query bike parks that are available

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

### Plan an itinerary riding your personal bike

* Note that **directOnly** must used to avoid itineraries using public transport

1. Click [this link](https://api.digitransit.fi/graphiql/hsl/v2?query=%257B%250A%2520%2520planConnection%28%250A%2520%2520%2520%2520origin%253A%2520%257Blocation%253A%2520%257Bcoordinate%253A%2520%257Blatitude%253A%252060.168992%252C%2520longitude%253A%252024.932366%257D%257D%257D%250A%2520%2520%2520%2520destination%253A%2520%257Blocation%253A%2520%257Bcoordinate%253A%2520%257Blatitude%253A%252060.165246%252C%2520longitude%253A%252024.949128%257D%257D%257D%250A%2520%2520%2520%2520modes%253A%2520%257Bdirect%253A%2520%255BBICYCLE%255D%252C%2520directOnly%253A%2520true%257D%250A%2520%2520%2520%2520first%253A%25201%250A%2520%2520%29%2520%257B%250A%2520%2520%2520%2520edges%2520%257B%250A%2520%2520%2520%2520%2520%2520node%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520legs%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520duration%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520mode%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520distance%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520from%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520lat%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520lon%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520name%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520to%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520lat%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520lon%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520name%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520legGeometry%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520points%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520length%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%257D%250A%2520%2520%257D%250A%257D) to run the query below in GraphiQL. It should fetch bicycle route from Kamppi to Pisa.

```graphql
{
  planConnection(
    origin: {location: {coordinate: {latitude: 60.168992, longitude: 24.932366}}}
    destination: {location: {coordinate: {latitude: 60.165246, longitude: 24.949128}}}
    modes: {direct: [BICYCLE], directOnly: true}
    first: 1
  ) {
    edges {
      node {
        legs {
          duration
          mode
          distance
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
          legGeometry {
            points
            length
          }
        }
      }
    }
  }
}
```

2. Press play in GraphiQL to execute the query.

### Plan an itinerary from Herttoniemenranta to Itäkeskus and use your personal bike for the first part of the journey

* Using argument `modes: {transit: {access: [BICYCLE_PARKING]}}` returns itinerary, which begins by bicycling to a bike park from which the journey is continued by public transportation

1. Click [this link](https://api.digitransit.fi/graphiql/hsl/v2?query=%257B%250A%2520%2520planConnection%28%250A%2520%2520%2520%2520origin%253A%2520%257Blocation%253A%2520%257Bcoordinate%253A%2520%257Blatitude%253A%252060.18778%252C%2520longitude%253A%252025.02987%257D%257D%257D%250A%2520%2520%2520%2520destination%253A%2520%257Blocation%253A%2520%257Bcoordinate%253A%2520%257Blatitude%253A%252060.21109%252C%2520longitude%253A%252025.08094%257D%257D%257D%250A%2520%2520%2520%2520first%253A%25203%250A%2520%2520%2520%2520modes%253A%2520%257Btransit%253A%2520%257Baccess%253A%2520%255BBICYCLE_PARKING%255D%257D%257D%250A%2520%2520%29%2520%257B%250A%2520%2520%2520%2520edges%2520%257B%250A%2520%2520%2520%2520%2520%2520node%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520start%250A%2520%2520%2520%2520%2520%2520%2520%2520end%250A%2520%2520%2520%2520%2520%2520%2520%2520legs%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520duration%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520mode%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520distance%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520from%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520lat%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520lon%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520to%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520lat%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520lon%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520vehicleParking%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520vehicleParkingId%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520start%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520scheduledTime%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520end%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520scheduledTime%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%257D%250A%2520%2520%257D%250A%257D)  to run the query below in GraphiQL.

```graphql
{
  planConnection(
    origin: {location: {coordinate: {latitude: 60.18778, longitude: 25.02987}}}
    destination: {location: {coordinate: {latitude: 60.21109, longitude: 25.08094}}}
    first: 3
    modes: {transit: {access: [BICYCLE_PARKING]}}
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
          }
          to {
            lat
            lon
            vehicleParking {
              vehicleParkingId
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

