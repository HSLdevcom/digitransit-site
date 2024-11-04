---
title: Bicycles, cars and e-scooters
order: 50
---

**If you are not yet familiar with [GraphQL](../0-graphql) and [GraphiQL](../1-graphiql) it is highly recommended to review those pages at first.**

## Related query types

The Routing API provides a few related query types:

- Query type **planConnection** can be used to query routes using either a rented vehicle (bicycle, car or e-scooter) or your personal vehicle (bicycle or car).
- Query types **vehicleRentalStation** and **vehicleRentalStations** can be used to query rental stations, and their capacity and availability.
- Query types **rentalVehicle** and **rentalVehicles** can be used to query floating rental vehicles (i.e. those that are not connected to a physical station).
- Query types **vehicleParking** and **vehicleParkings** can be used to query parks that are available and sometimes the availability of parking spaces.

**Note:** For more details about these query types you can use the **Documentation Explorer** provided in GraphiQL.

## Query examples

### Vehicle rental

**Note:** If the examples provided with an ID do not return what is expected then the ID in question may not be in use any more and you should try again with an existing ID. Rental services are also often seasonal in Finland, which means that the stations or vehicles are not always available from the API.

#### Fetch all rental stations

1. Click [this link](https://api.digitransit.fi/graphiql/hsl/v2?query=%257B%250A%2520%2520vehicleRentalStations%2520%257B%250A%2520%2520%2520%2520stationId%250A%2520%2520%2520%2520name%250A%2520%2520%2520%2520allowPickup%250A%2520%2520%2520%2520availableVehicles%2520%257B%250A%2520%2520%2520%2520%2520%2520byType%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520count%250A%2520%2520%2520%2520%2520%2520%2520%2520vehicleType%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520formFactor%250A%2520%2520%2520%2520%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%257D%250A%2520%2520%257D%250A%257D) to run the query below in GraphiQL. It should fetch all available vehicle rental station stations.

```graphql
{
  vehicleRentalStations {
    stationId
    name
    allowPickup
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

#### Single city bike station and its current bike availability details

1. Click [this link](https://api.digitransit.fi/graphiql/hsl/v2?query=%257B%250A%2520%2520vehicleRentalStation%28id%253A%2520%2522smoove%253A396%2522%29%2520%257B%250A%2520%2520%2520%2520stationId%250A%2520%2520%2520%2520name%250A%2520%2520%2520%2520availableVehicles%2520%257B%250A%2520%2520%2520%2520%2520%2520byType%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520count%250A%2520%2520%2520%2520%2520%2520%2520%2520vehicleType%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520formFactor%250A%2520%2520%2520%2520%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520availableSpaces%2520%257B%250A%2520%2520%2520%2520%2520%2520byType%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520count%250A%2520%2520%2520%2520%2520%2520%2520%2520vehicleType%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520formFactor%250A%2520%2520%2520%2520%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520lat%250A%2520%2520%2520%2520lon%250A%2520%2520%2520%2520allowDropoff%250A%2520%2520%257D%250A%257D) to run the query below in GraphiQL. It should fetch the city bike station and its current bike availability details.

```graphql
{
  vehicleRentalStation(id: "smoove:396") {
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

#### Fetch all floating rental vehicles

1. Click [this link](https://api.digitransit.fi/graphiql/hsl/v2?query=%257B%250A%2520%2520rentalVehicles%2520%257B%250A%2520%2520%2520%2520vehicleId%250A%2520%2520%2520%2520vehicleType%2520%257B%250A%2520%2520%2520%2520%2520%2520formFactor%250A%2520%2520%2520%2520%2520%2520propulsionType%250A%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520operative%250A%2520%2520%257D%250A%257D) to run the query below in GraphiQL. It should fetch all floating rental vehicles, their availability and vehicle type.

```graphql
{
  rentalVehicles {
    vehicleId
    vehicleType {
      formFactor
      propulsionType
    }
    operative
  }
}
```

2. Press play in GraphiQL to execute the query.

#### Fetch all scooters

1. Click [this link](https://api.digitransit.fi/graphiql/hsl/v2?query=%257B%250A%2520%2520rentalVehicles%28formFactors%253A%2520%255BSCOOTER%252C%2520SCOOTER_SEATED%252C%2520SCOOTER_STANDING%255D%29%2520%257B%250A%2520%2520%2520%2520vehicleId%250A%2520%2520%2520%2520vehicleType%2520%257B%250A%2520%2520%2520%2520%2520%2520formFactor%250A%2520%2520%2520%2520%2520%2520propulsionType%250A%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520operative%250A%2520%2520%257D%250A%257D) to run the query below in GraphiQL. It should fetch all scooters and some of their available information.

```graphql
{
  rentalVehicles(formFactors: [SCOOTER, SCOOTER_SEATED, SCOOTER_STANDING]) {
    vehicleId
    vehicleType {
      formFactor
      propulsionType
    }
    operative
  }
}
```

2. Press play in GraphiQL to execute the query.

#### Fetch a specific scooter

**Note:** IDs of floating vehicles tend to change constantly.

1. Click [this link](https://api.digitransit.fi/graphiql/hsl/v2?query=%257B%250A%2520%2520rentalVehicle%28id%253A%2522bolt_helsinki%253A04928ae0-aebc-4044-bd95-e5199e7fd0d8%2522%29%2520%257B%250A%2520%2520%2520%2520vehicleId%250A%2520%2520%2520%2520vehicleType%2520%257B%250A%2520%2520%2520%2520%2520%2520formFactor%250A%2520%2520%2520%2520%2520%2520propulsionType%250A%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520allowPickupNow%250A%2520%2520%257D%250A%257D) to run the query below in GraphiQL. It should fetch a specific scooter and some of its available information.

```graphql
{
  rentalVehicle(id:"bolt_helsinki:04928ae0-aebc-4044-bd95-e5199e7fd0d8") {
    vehicleId
    vehicleType {
      formFactor
      propulsionType
    }
    allowPickupNow
  }
}
```

2. Press play in GraphiQL to execute the query.

### Vehicle parking

The vehicle parking areas that can be found from the APIs are meant for park and ride. Other types of parking areas might not be found. Parking data is not available in every routing endpoint.

#### Fetch all vehicle parking areas

1. Click [this link](https://api.digitransit.fi/graphiql/hsl/v2?query=%257B%250A%2520%2520vehicleParkings%2520%257B%250A%2520%2520%2520%2520vehicleParkingId%250A%2520%2520%2520%2520name%250A%2520%2520%2520%2520state%250A%2520%2520%2520%2520availability%2520%257B%250A%2520%2520%2520%2520%2520%2520carSpaces%250A%2520%2520%2520%2520%2520%2520bicycleSpaces%250A%2520%2520%2520%2520%2520%2520wheelchairAccessibleCarSpaces%250A%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520capacity%2520%257B%250A%2520%2520%2520%2520%2520%2520carSpaces%250A%2520%2520%2520%2520%2520%2520bicycleSpaces%250A%2520%2520%2520%2520%2520%2520wheelchairAccessibleCarSpaces%250A%2520%2520%2520%2520%257D%250A%2520%2520%257D%250A%257D) to run the query below in GraphiQL. It should fetch all available vehicle parks.

```graphql
{
  vehicleParkings {
    vehicleParkingId
    name
    state
    availability {
      carSpaces
      bicycleSpaces
      wheelchairAccessibleCarSpaces
    }
    capacity {
      carSpaces
      bicycleSpaces
      wheelchairAccessibleCarSpaces
    }
  }
}
```

2. Press play in GraphiQL to execute the query.

#### Fetch a single bicycle park

1. Click [this link](https://api.digitransit.fi/graphiql/hsl/v2?query=%257B%250A%2520%2520vehicleParking%28id%253A%2522liipi%253A974%2522%29%2520%257B%250A%2520%2520%2520%2520vehicleParkingId%250A%2520%2520%2520%2520name%250A%2520%2520%2520%2520state%250A%2520%2520%2520%2520availability%2520%257B%250A%2520%2520%2520%2520%2520%2520bicycleSpaces%250A%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520capacity%2520%257B%250A%2520%2520%2520%2520%2520%2520bicycleSpaces%250A%2520%2520%2520%2520%257D%250A%2520%2520%257D%250A%257D) to run the query below in GraphiQL. It should fetch the bike park and its current space availability details.

```graphql
{
  vehicleParking(id:"liipi:974") {
    vehicleParkingId
    name
    state
    availability {
      bicycleSpaces
    }
    capacity {
      bicycleSpaces
    }
  }
}
```

2. Press play in GraphiQL to execute the query.

### Itinerary planning

#### Plan an itinerary from Kaartinkaupunki to Otaniemi using city bike rental

* Bike rental can be used by adding mode **BICYCLE_RENTAL** to `modes`.
  * Note that the response field `mode` does not differentiate between a rental bicycle and a personal bicycle.
  * Note that availability information of a station is only used if the search arrival or departure time is within the next 15 hours
  * If it doesn't make sense to use rental, no rental will be used in the suggestions.

1. Click [this link](https://api.digitransit.fi/graphiql/hsl/v2?query=%257B%250A%2520%2520planConnection%28%250A%2520%2520%2520%2520origin%253A%2520%257Blocation%253A%2520%257Bcoordinate%253A%2520%257Blatitude%253A%252060.1641516457%252C%2520longitude%253A%252024.95003700%257D%257D%257D%250A%2520%2520%2520%2520destination%253A%2520%257Blocation%253A%2520%257Bcoordinate%253A%2520%257Blatitude%253A%252060.188229950%252C%2520longitude%253A%252024.83785629272%257D%257D%257D%250A%2520%2520%2520%2520first%253A%25201%250A%2520%2520%2520%2520modes%253A%2520%257Bdirect%253A%2520%255BBICYCLE_RENTAL%252C%2520WALK%255D%252C%2520transit%253A%2520%257Baccess%253A%2520%255BBICYCLE_RENTAL%252C%2520WALK%255D%252C%2520egress%253A%2520%255BBICYCLE_RENTAL%252C%2520WALK%255D%257D%257D%250A%2520%2520%29%2520%257B%250A%2520%2520%2520%2520edges%2520%257B%250A%2520%2520%2520%2520%2520%2520node%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520start%250A%2520%2520%2520%2520%2520%2520%2520%2520end%250A%2520%2520%2520%2520%2520%2520%2520%2520legs%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520duration%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520mode%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520distance%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520from%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520lat%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520lon%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520vehicleRentalStation%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520stationId%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520availableVehicles%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520byType%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520vehicleType%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520propulsionType%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520count%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520to%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520lat%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520lon%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520vehicleRentalStation%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520stationId%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520start%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520scheduledTime%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520end%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520scheduledTime%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%257D%250A%2520%2520%257D%250A%257D) to run the query below in GraphiQL. It should plan an itinerary from Kamppi to Kasarmitori using city bike rental and show which rental stations are used.

```graphql
{
  planConnection(
    origin: {location: {coordinate: {latitude: 60.1641516457, longitude: 24.95003700}}}
    destination: {location: {coordinate: {latitude: 60.188229950, longitude: 24.83785629272}}}
    first: 1
    modes: {direct: [BICYCLE_RENTAL, WALK], transit: {access: [BICYCLE_RENTAL, WALK], egress: [BICYCLE_RENTAL, WALK]}}
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
              stationId
              availableVehicles {
                byType {
                  vehicleType {
                    propulsionType
                  }
                  count
                }
              }
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

#### Plan an itinerary riding your personal bike

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

#### Plan an itinerary with boarding transit with your personal bike

* Note that **directOnly** must used to avoid itineraries using public transport

1. Click [this link](https://api.digitransit.fi/graphiql/hsl/v2?query=%257B%250A%2520%2520planConnection%28%250A%2520%2520%2520%2520origin%253A%2520%257Blocation%253A%2520%257Bcoordinate%253A%2520%257Blatitude%253A%252060.1675747130%252C%2520longitude%253A%252024.9437713623%257D%257D%257D%250A%2520%2520%2520%2520destination%253A%2520%257Blocation%253A%2520%257Bcoordinate%253A%2520%257Blatitude%253A%252060.20011132%252C%2520longitude%253A%252024.93553161%257D%257D%257D%250A%2520%2520%2520%2520modes%253A%2520%257BtransitOnly%253Atrue%252C%2520transit%253A%2520%257Baccess%253A%2520BICYCLE%252C%2520transfer%253A%2520BICYCLE%252C%2520egress%253A%2520BICYCLE%257D%257D%250A%2520%2520%2520%2520first%253A%25201%250A%2520%2520%29%2520%257B%250A%2520%2520%2520%2520edges%2520%257B%250A%2520%2520%2520%2520%2520%2520node%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520legs%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520duration%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520mode%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520distance%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520from%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520lat%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520lon%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520name%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520stop%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520name%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520to%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520lat%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520lon%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520name%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520stop%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520name%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520legGeometry%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520points%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520length%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%257D%250A%2520%2520%257D%250A%257D) to run the query below in GraphiQL. It should fetch bicycle route from Rautatieasema to Pasila.

```graphql
{
  planConnection(
    origin: {location: {coordinate: {latitude: 60.1675747130, longitude: 24.9437713623}}}
    destination: {location: {coordinate: {latitude: 60.20011132, longitude: 24.93553161}}}
    modes: {transitOnly:true, transit: {access: BICYCLE, transfer: BICYCLE, egress: BICYCLE}}
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
            stop {
              name
            }
          }
          to {
            lat
            lon
            name
            stop {
              name
            }
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

#### Plan an itinerary from Herttoniemenranta to Itäkeskus and use your personal bike for the first part of the journey

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

