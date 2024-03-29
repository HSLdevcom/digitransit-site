---
title: Advanced examples
order: 110
---

This page contains few examples on how to utilize the GraphQL API in more specific scenarios. Try exploring the schema in [GraphiQL](../1-graphiql/) for more ideas on what can be done with the API.

### Plan an itinerary with alternative departures for each leg

The following query plans an itinerary from Pasila to Kulosaari.

```graphql
{
  plan(
    from: {lat: 60.19775, lon: 24.94053},
    to: {lat: 60.18840, lon: 25.00744},
  ) {
    itineraries {
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
            code
            name
            gtfsId
            stoptimesForPatterns(omitNonPickups: true, timeRange: 1800) {
              pattern {
                code
              }
              stoptimes {
                scheduledDeparture
              }
            }
          }
        }
        to {
          lat
          lon
          name
          stop {
            patterns {
              code
            }
          }
        }
        trip {
          gtfsId
          pattern {
            code
          }
          tripHeadsign
        }
      }
    }
  }
}
```

For each stop that is used for boarding (field `from`), a list of departures grouped by pattern are returned (field `stoptimesForPatterns`). Client-side code could be used to filter the list of departures to only contain patterns which also pass through the destination stop (field `patterns` in `to`).

### Plan an itinerary on board a vehicle

It is possible to plan an itinerary which starts on board a vehicle by using argument `startTransitTripId`.

[High-frequency positioning API](../../4-realtime-api/vehicle-positions/high-frequency-positioning/) can be used to listen for vehicle position messages near the user and after the vehicle the user is on board of has been determined, query type **[fuzzyTrip](../routes/#fuzzytrip)** in the GraphQL API can be used to get a trip ID for the vehicle.

Here is an example query which plans an itinerary from Pasila to Itäkeskus, assuming that the user is already on board [bus 551](https://reittiopas.hsl.fi/linjat/HSL:2551/pysakit/HSL:2551:1:02), which departed from Tapionaukio at 15:37 PM on 16th August 2018.
<br/>**Note:** values for arguments `from` and `time` should be set based on the vehicle position message received from the HFP API, as argument `startTransitTripId` only takes into account the route and the estimated travel time of the trip and *not* the real-time position of the vehicle.

```graphql
{
  plan(
    from: {lat: 60.19727, lon: 24.94116}
    to: {lat: 60.21022, lon: 25.07831}
    date: "2018-08-16"
    time: "16:25:00"
    startTransitTripId: "HSL:2551_20180816_To_2_1537"
  ) {
    itineraries {
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
        trip {
          gtfsId
          pattern {
            code
          }
          tripHeadsign
        }
      }
    }
  }
}
```
