---
title: Advanced examples
---

This page contains more advanced examples on how to utilize the GraphQL API.

## Plan an itinerary with alternative routes for each leg

The following query plans an itinerary from Pasila to Kulosaari.

```
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

For each stop that is used for boarding (field `from`), a list of departures grouped by pattern are returned (field `stoptimesForPatterns`). Client-side code could be used to filter the list of departures to only contain patterns which also passthrough the destination stop (field `to`).
