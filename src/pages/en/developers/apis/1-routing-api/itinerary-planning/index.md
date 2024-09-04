---
title: Itinerary planning
order: 80
---

**If you are not yet familiar with [GraphQL](../0-graphql) and [GraphiQL](../1-graphiql) it is highly recommended to review those pages at first.**

## Glossary

| Term                   | Explanation                     |
|------------------------|---------------------------------|
| Itinerary              | A combination of different transportation modes at certain times to reach from origin to destination. For example, walking to a bus stop, taking a bus for two stops and then walking to the final destination.<br/>Commonly used synonym: journey |
| Leg                    | One part of an itinerary, e.g. walking to a bus stop or a bus ride between two stops. |
| Origin                 | A geographical point where an itinerary begins. |
| Destination            | A geographical point where an itinerary ends. |

### Note about Itinerary leg geometries

You can ask the server to return geometries for itineraries. The API will return them in [Google polyline-encoded format](https://developers.google.com/maps/documentation/utilities/polylinealgorithm). It looks like this:
```json
"legGeometry": {
  "length": 349,
  "points": "wwfnJyjdwCXlAHLNfAFHDZz@nEh@hBXfA\\hAR^VLnChAD@HDHDjBt@^N|@`@JDHNFB`@RHDJFD@PD^fBDNNp@@JBPHl@FdA@d@@TFrCDnATpEL~CBnA@pADpELbQ?pB?nBC~@DdC?R?LDtC?P?j@@XG~@Ef@CPCHGHoAtAQT_@f@w@rAc@~@g@lAi@fBc@hBWvASzAWrBUtBQxBOtBMhCOvEEhCCfC@vB@fBDrCFlCJnCb@xIfFl_APdDr@dMd@bIV~D\\bFPnCjAtMt@~GxAhMlBfOz@jHVjCR~BNpCHrBFjCDdC?`CC`DIfDSxDUhDe@fFu@tHMzA{AlOcBtPCXE`@sCrY_BbPShCeAxJc@pDg@nECJi@~Di@dDUbAkA~Gk@bD_@vBUbB]lBe@lDY~B[rCWbC_@~DYfDW|BQ~Am@tGOfBOxAWlCKzAMvAIbAMpBIpAAd@GhACp@EhAEtAA~ACfCAnC@fA?rAClDC`G@`BCxHKlCMhIK~FE|CA~@@|@BxB@^?@DtAHbBLzALjBHbBFlAF|ADxAD|BNrEPjCTtHdAhVp@jSVlPFjJ?dC?hE?dJ?xC?vLDfKDpEF|CFnDPjHZvH\\xH|@jQXnF\\nFBXdAtSJtCZrG@^b@`K^dJLnDLtDj@bRT`IAb@?~@?dA@~A?fA?|@AjAE~BA`BBdABd@Bh@HfARnBPpBl@zFt@lGr@vE\\|Cz@dHrA|JdAtHPpAl@dEjA~I~AvNv@tIx@vKTtD`@nHTrENtDRzEPvHR|J\\`VNdKAjEFpLBlFDjCBfCFxBNjE`@nH@j@An@Cr@I^O^y@l@iAt@S@IAIGMKCICIKIKEI?MDILKVQVW^WVUPSJuAT??_ANaALg@No@ZkAz@a@ZKR]j@a@h@i@fA[f@Q`@u@dCmAvEw@dCk@nAe@z@S\\iAnAeA`Ai@f@eAfBy@rBu@rCMf@WfAU`Ac@`Bi@`CKh@ANUdBq@~GW|BQdAK^M\\IROVMLs@d@q@\\]P}@R{@BaA@_@Iu@E]?CAU?M?W@i@DKBg@NUDq@V}@^g@XQJk@h@EDQPeBnBIHILU\\"
}
```

<!-- You can use [this tool](https://repl.it/@digitransit/Polyline-Mapper) to see what the polyline looks on a map.

See the following examples on how to decode and use polylines:
* [Node.js app](https://repl.it/@digitransit/PolylineDecode), which prints a list of coordinates in an itinerary
* [Itinerary planner demo](https://repl.it/@digitransit/PolylineDecodeMap), which shows itinerary leg polylines on a map -->

## Query examples

**Note:** For more details about the query type **planConnection** and its parameters you can use the **Documentation Explorer** provided in GraphiQL.

Itinerary planning can be tuned by multiple arguments of the **planConnection** query.
* Time arguments are taken into account literally when planning the itinerary
  * For example, if `preferences: {street: { transit: {transfer: {slack: "2m"}}}` is set to 2 minutes, it is not possible to continue the journey by another vehicle within two minutes after disembarking one vehicle
  * Values of time arguments are included in the returned duration of an itinerary
    * For example, if there is a 15 minute  leg and `slack` is set to 1 minute, the returned duration of the leg will be 17 minutes
* Cost arguments on the other hand are not hard limits, but preferences
  * For example, if `preferences: {street: {walk: {boardCost: 120}}}` is set to 2 minutes, it is possible to continue the journey immediately after disembarking from one vehicle, but up to 2 minutes longer itineraries are preferred if they have one transfer less and up to 4 minutes longer itineraries are preferred if they have two transfers less, etc.
  * Cost is not included in the returned duration of an itinerary
    * For example, if there is a 15 minute walking leg and `boardCost` is set to 1 minute, the returned duration of the walking leg will be 15 minutes
* Multiplier arguments (e.g. `preferences: {street: {walk: {reluctance: 3}}}`) are used to multiply costs of an leg
  * For example, if `reluctance` is set to 3.0, the cost of each walking section will be multiplied by 3 and thus itineraries with less walking are preferred

### Plan an itinerary from location (60.168992,24.932366) to (60.175294,24.684855)

1. Click [this link](https://api.digitransit.fi/graphiql/hsl/v2?query=%257B%250A%2520%2520planConnection%28%250A%2520%2520%2520%2520origin%253A%2520%257Blocation%253A%2520%257Bcoordinate%253A%2520%257Blatitude%253A%252060.168992%252C%2520longitude%253A%252024.932366%257D%257D%257D%250A%2520%2520%2520%2520destination%253A%2520%257Blocation%253A%2520%257Bcoordinate%253A%2520%257Blatitude%253A%252060.175294%252C%2520longitude%253A%252024.684855%257D%257D%257D%250A%2520%2520%2520%2520first%253A%25202%250A%2520%2520%29%2520%257B%250A%2520%2520%2520%2520pageInfo%2520%257B%250A%2520%2520%2520%2520%2520%2520endCursor%250A%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520edges%2520%257B%250A%2520%2520%2520%2520%2520%2520node%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520start%250A%2520%2520%2520%2520%2520%2520%2520%2520end%250A%2520%2520%2520%2520%2520%2520%2520%2520legs%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520duration%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520mode%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520distance%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520start%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520scheduledTime%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520end%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520scheduledTime%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520mode%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520duration%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520realtimeState%250A%2520%2520%2520%2520%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%2520%2520%2520%2520emissionsPerPerson%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520co2%250A%2520%2520%2520%2520%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%257D%250A%2520%2520%257D%250A%257D) to run the query below in GraphiQL.

```graphql
{
  planConnection(
    origin: {location: {coordinate: {latitude: 60.168992, longitude: 24.932366}}}
    destination: {location: {coordinate: {latitude: 60.175294, longitude: 24.684855}}}
    first: 2
  ) {
    pageInfo {
      endCursor
    }
    edges {
      node {
        start
        end
        legs {
          duration
          mode
          distance
          start {
            scheduledTime
          }
          end {
            scheduledTime
          }
          mode
          duration
          realtimeState
        }
        emissionsPerPerson {
          co2
        }
      }
    }
  }
}
```

2. Press play in GraphiQL to execute the query.

### Pagnation
The `first` argument in the GraphQL query specifies the number of itinerary plans (`nodes`) to be returned. To retrieve more results, you can use the after argument with the value of `endCursor` from the previous query's response. 

```graphql
{
  planConnection(
    origin: {location: {coordinate: {latitude: 60.168992, longitude: 24.932366}}}
    destination: {location: {coordinate: {latitude: 60.175294, longitude: 24.684855}}}
    first: 2
    after: <endCursor from previous query>
  )....
``` 
### Basic route from Kamppi (Helsinki) to Pisa (Espoo)

* Origin and destination locations can be named by using the argument `label`. The label is then returned with the location
in the itineraries.

1. Click [this link](https://api.digitransit.fi/graphiql/hsl/v2?query=%257B%250A%2520%2520planConnection%28%250A%2520%2520%2520%2520origin%253A%2520%257Blocation%253A%2520%257Bcoordinate%253A%2520%257Blatitude%253A%252060.168992%252C%2520longitude%253A%252024.932366%257D%257D%252C%2520label%253A%2520%2522Kamppi%252C%2520Helsinki%2522%257D%250A%2520%2520%2520%2520destination%253A%2520%257Blocation%253A%2520%257Bcoordinate%253A%2520%257Blatitude%253A%252060.175294%252C%2520longitude%253A%252024.684855%257D%257D%252C%2520label%253A%2520%2522Pisa%252C%2520Espoo%2522%257D%250A%2520%2520%2520%2520first%253A%25202%250A%2520%2520%29%2520%257B%250A%2520%2520%2520%2520pageInfo%2520%257B%250A%2520%2520%2520%2520%2520%2520endCursor%250A%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520edges%2520%257B%250A%2520%2520%2520%2520%2520%2520node%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520start%250A%2520%2520%2520%2520%2520%2520%2520%2520end%250A%2520%2520%2520%2520%2520%2520%2520%2520legs%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520from%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520name%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520to%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520name%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520start%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520scheduledTime%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520end%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520scheduledTime%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520mode%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520duration%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520realtimeState%250A%2520%2520%2520%2520%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%2520%2520%2520%2520emissionsPerPerson%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520co2%250A%2520%2520%2520%2520%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%257D%250A%2520%2520%257D%250A%257D) to run the query below in GraphiQL.

```graphql
{
  planConnection(
    origin: {location: {coordinate: {latitude: 60.168992, longitude: 24.932366}}, label: "Kamppi, Helsinki"}
    destination: {location: {coordinate: {latitude: 60.175294, longitude: 24.684855}}, label: "Pisa, Espoo"}
    first: 2
  ) {
    pageInfo {
      endCursor
    }
    edges {
      node {
        start
        end
        legs {
          from {
            name
          }
          to {
            name
          }
          start {
            scheduledTime
          }
          end {
            scheduledTime
          }
          mode
          duration
          realtimeState
        }
        emissionsPerPerson {
          co2
        }
      }
    }
  }
}
```

2. Press play in GraphiQL to execute the query.

### Plan an itinerary using only WALK and RAIL modes


* By default, all transit modes are usable and `WALK` is used for direct street suggestions,
access, egress and transfers.

1. Click [this link](https://api.digitransit.fi/graphiql/hsl/v2?query=%257B%250A%2520%2520planConnection%28%250A%2520%2520%2520%2520origin%253A%2520%257Blocation%253A%2520%257Bcoordinate%253A%2520%257Blatitude%253A%252060.199196699999995%252C%2520longitude%253A%252024.9397302%257D%257D%257D%250A%2520%2520%2520%2520destination%253A%2520%257Blocation%253A%2520%257Bcoordinate%253A%2520%257Blatitude%253A%252060.168438%252C%2520longitude%253A%252024.929283%257D%257D%257D%250A%2520%2520%2520%2520first%253A%25202%250A%2520%2520%2520%2520modes%253A%2520%257Btransit%253A%2520%257Btransit%253A%2520%255B%257Bmode%253A%2520RAIL%257D%255D%257D%257D%250A%2520%2520%29%2520%257B%250A%2520%2520%2520%2520pageInfo%2520%257B%250A%2520%2520%2520%2520%2520%2520endCursor%250A%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520edges%2520%257B%250A%2520%2520%2520%2520%2520%2520node%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520start%250A%2520%2520%2520%2520%2520%2520%2520%2520end%250A%2520%2520%2520%2520%2520%2520%2520%2520legs%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520from%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520name%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520to%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520name%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520start%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520scheduledTime%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520end%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520scheduledTime%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520mode%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520duration%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520realtimeState%250A%2520%2520%2520%2520%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%2520%2520%2520%2520emissionsPerPerson%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520co2%250A%2520%2520%2520%2520%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%257D%250A%2520%2520%257D%250A%257D) to run the query below in GraphiQL.

```graphql
{
  planConnection(
    origin: {location: {coordinate: {latitude: 60.199196699999995, longitude: 24.9397302}}}
    destination: {location: {coordinate: {latitude: 60.168438, longitude: 24.929283}}}
    first: 2
    modes: {transit: {transit: [{mode: RAIL}]}}
  ) {
    pageInfo {
      endCursor
    }
    edges {
      node {
        start
        end
        legs {
          from {
            name
          }
          to {
            name
          }
          start {
            scheduledTime
          }
          end {
            scheduledTime
          }
          mode
          duration
          realtimeState
        }
        emissionsPerPerson {
          co2
        }
      }
    }
  }
}
```

2. Press play in GraphiQL to execute the query.

### Plan an itinerary from Hakaniemi to Keilaniemi and modify the following parameters:

* Return five results: (`fist: 5`)
* Use transportation modes other than subway (`modes: {transit: {transit: [{mode: BUS}, {mode: RAIL}, {mode: TRAM}, {mode: FERRY}]}}`)
* Walking speed of 1,7m/s (`preferences: {street: {walk: {speed: 1.7}}}`)
* Use a 10 minute safety margin for transfers (`preferences: {street: { transit: {transfer: {slack: "10m"}}}`)
  *  In a lenient ISO-8601 duration format. Example P2DT2H12M40S, 2d2h12m40s or 1h
* Use a 5 minute boarding cost (`preferences: {street: {walk: {boardCost: 300}}}`)
  * Boarding cost is used to prefer itineraries with less vehicle boardings
    * For example, if `boardCost: 300` is used and there is a 48min itinerary with one boarding and a 45min itinerary with two boardings, the 48 minute itinerary is returned, because its total cost is smaller (48min + 5min vs. 45min + 5min + 5min)
* Use multiplier of 2.1 for walk reluctance to prefer routes with less walking (`preferences: {street: {walk: {reluctance: 2.1}}}`)
  * Walking times are multiplied with this multiplier
* Specific departure date and time
  * `dateTime: {earliestDeparture: "2024-06-13T14:30+03:00"}` In ISO-8601-formatted datetime with offset, e.g. 2024-06-13T14:30+03:00 for 2:30pm on June 13th 2024 at Helsinki's offset from UTC.


1. Click [this link](https://api.digitransit.fi/graphiql/hsl/v2?query=%257B%250A%2520%2520planConnection%28%250A%2520%2520%2520%2520origin%253A%2520%257Blocation%253A%2520%257Bcoordinate%253A%2520%257Blatitude%253A%252060.179267%252C%2520longitude%253A%252024.951501%257D%257D%252C%2520label%253A%2520%2522Hakaniemi%252C%2520Helsinki%2522%257D%250A%2520%2520%2520%2520destination%253A%2520%257Blocation%253A%2520%257Bcoordinate%253A%2520%257Blatitude%253A%252060.1762%252C%2520longitude%253A%252024.836584%257D%257D%252C%2520label%253A%2520%2522Keilaniemi%252C%2520Espoo%2522%257D%250A%2520%2520%2520%2520first%253A%25205%250A%2520%2520%2520%2520dateTime%253A%2520%257BearliestDeparture%253A%2520%25222024-06-13T14%253A30%252B03%253A00%2522%257D%250A%2520%2520%2520%2520modes%253A%2520%257Btransit%253A%2520%257Btransit%253A%2520%255B%257Bmode%253A%2520BUS%257D%252C%2520%257Bmode%253A%2520RAIL%257D%252C%2520%257Bmode%253A%2520TRAM%257D%252C%2520%257Bmode%253A%2520FERRY%257D%255D%257D%257D%250A%2520%2520%2520%2520preferences%253A%2520%257Bstreet%253A%2520%257Bwalk%253A%2520%257Bspeed%253A%25201.7%252C%2520reluctance%253A%25202.1%252C%2520boardCost%253A%2520300%257D%257D%252C%2520transit%253A%2520%257Btransfer%253A%2520%257Bslack%253A%2520%252210M%2522%257D%257D%257D%250A%2520%2520%29%2520%257B%250A%2520%2520%2520%2520pageInfo%2520%257B%250A%2520%2520%2520%2520%2520%2520endCursor%250A%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520edges%2520%257B%250A%2520%2520%2520%2520%2520%2520node%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520walkDistance%250A%2520%2520%2520%2520%2520%2520%2520%2520duration%250A%2520%2520%2520%2520%2520%2520%2520%2520legs%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520from%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520lat%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520lon%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520name%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520stop%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520code%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520name%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520to%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520lat%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520lon%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520name%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520stop%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520code%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520name%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520trip%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520tripHeadsign%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520routeShortName%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520distance%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520legGeometry%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520length%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520points%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%257D%250A%2520%2520%257D%250A%257D) to run the query below in GraphiQL.

```graphql
{
  planConnection(
    origin: {location: {coordinate: {latitude: 60.179267, longitude: 24.951501}}, label: "Hakaniemi, Helsinki"}
    destination: {location: {coordinate: {latitude: 60.1762, longitude: 24.836584}}, label: "Keilaniemi, Espoo"}
    first: 5
    dateTime: {earliestDeparture: "2024-06-13T14:30+03:00"}
    modes: {transit: {transit: [{mode: BUS}, {mode: RAIL}, {mode: TRAM}, {mode: FERRY}]}}
    preferences: {street: {walk: {speed: 1.7, reluctance: 2.1, boardCost: 300}}, transit: {transfer: {slack: "10M"}}}
  ) {
    pageInfo {
      endCursor
    }
    edges {
      node {
        walkDistance
        duration
        legs {
          from {
            lat
            lon
            name
            stop {
              code
              name
            }
          }
          to {
            lat
            lon
            name
            stop {
              code
              name
            }
          }
          trip {
            tripHeadsign
            routeShortName
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
}
```

2. Change  `earliestDeparture` arguments.
3. Press play in GraphiQL to execute the query.

### Plan an itinerary using Park & Ride

* By using arguments `modes: {transit: {access: [CAR_PARKING]}}` we can plan an itinerary using Park & Ride, i.e. the first leg of the journey is done by driving to a car park and continuing by public transportation from there


1. Click [this link](https://api.digitransit.fi/graphiql/hsl/v2?query=%257B%250A%2520%2520planConnection%28%250A%2520%2520%2520%2520origin%253A%2520%257Blocation%253A%2520%257Bcoordinate%253A%2520%257Blatitude%253A%252060.34770%252C%2520longitude%253A%252024.86569%257D%257D%252C%2520label%253A%2520%2522Seutula%2522%257D%250A%2520%2520%2520%2520destination%253A%2520%257Blocation%253A%2520%257Bcoordinate%253A%2520%257Blatitude%253A%252060.16870%252C%2520longitude%253A%252024.93129%257D%257D%252C%2520label%253A%2520%2522Kamppi%2522%257D%250A%2520%2520%2520%2520first%253A%25202%250A%2520%2520%2520%2520modes%253A%2520%257Btransit%253A%2520%257Baccess%253A%2520%255BCAR_PARKING%255D%257D%257D%250A%2520%2520%29%2520%257B%250A%2520%2520%2520%2520pageInfo%2520%257B%250A%2520%2520%2520%2520%2520%2520endCursor%250A%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520edges%2520%257B%250A%2520%2520%2520%2520%2520%2520node%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520walkDistance%250A%2520%2520%2520%2520%2520%2520%2520%2520duration%250A%2520%2520%2520%2520%2520%2520%2520%2520legs%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520mode%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520start%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520scheduledTime%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520end%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520scheduledTime%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520duration%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520from%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520lat%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520lon%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520name%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520stop%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520code%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520name%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520vehicleParking%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520vehicleParkingId%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520name%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520to%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520lat%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520lon%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520name%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520stop%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520code%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520name%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520vehicleParking%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520vehicleParkingId%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520name%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520trip%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520tripHeadsign%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520routeShortName%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520distance%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520legGeometry%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520length%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520points%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%257D%250A%2520%2520%257D%250A%257D) to run the query below in GraphiQL.

```graphql
{
  planConnection(
    origin: {location: {coordinate: {latitude: 60.34770, longitude: 24.86569}}, label: "Seutula"}
    destination: {location: {coordinate: {latitude: 60.16870, longitude: 24.93129}}, label: "Kamppi"}
    first: 2
    modes: {transit: {access: [CAR_PARKING]}}
  ) {
    pageInfo {
      endCursor
    }
    edges {
      node {
        walkDistance
        duration
        legs {
          mode
          start {
            scheduledTime
          }
          end {
            scheduledTime
          }
          duration
          from {
            lat
            lon
            name
            stop {
              code
              name
            }
            vehicleParking {
              vehicleParkingId
              name
            }
          }
          to {
            lat
            lon
            name
            stop {
              code
              name
            }
            vehicleParking {
              vehicleParkingId
              name
            }
          }
          trip {
            tripHeadsign
            routeShortName
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
}
```

2. Press play in GraphiQL to execute the query.

### Plan an itinerary with alternative departures for each leg

1. Click [this link](https://api.digitransit.fi/graphiql/hsl/v2?query=%257B%250A%2520%2520planConnection%28%250A%2520%2520%2520%2520origin%253A%2520%257Blocation%253A%2520%257Bcoordinate%253A%2520%257Blatitude%253A%252060.168992%252C%2520longitude%253A%252024.932366%257D%257D%252C%2520label%253A%2520%2522Kamppi%252C%2520Helsinki%2522%257D%250A%2520%2520%2520%2520destination%253A%2520%257Blocation%253A%2520%257Bcoordinate%253A%2520%257Blatitude%253A%252060.175294%252C%2520longitude%253A%252024.684855%257D%257D%252C%2520label%253A%2520%2522Pisa%252C%2520Espoo%2522%257D%250A%2520%2520%2520%2520first%253A%25201%250A%2520%2520%29%2520%257B%250A%2520%2520%2520%2520pageInfo%2520%257B%250A%2520%2520%2520%2520%2520%2520endCursor%250A%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520edges%2520%257B%250A%2520%2520%2520%2520%2520%2520node%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520start%250A%2520%2520%2520%2520%2520%2520%2520%2520end%250A%2520%2520%2520%2520%2520%2520%2520%2520legs%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520nextLegs%28numberOfLegs%253A%25203%29%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520start%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520scheduledTime%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520from%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520name%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520to%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520name%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520start%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520scheduledTime%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520end%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520scheduledTime%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520mode%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520duration%250A%2520%2520%2520%2520%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%2520%2520%2520%2520%250A%2520%2520%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%257D%250A%2520%2520%257D%250A%257D) to run the query below in GraphiQL.

```graphql
{
  planConnection(
    origin: {location: {coordinate: {latitude: 60.168992, longitude: 24.932366}}, label: "Kamppi, Helsinki"}
    destination: {location: {coordinate: {latitude: 60.175294, longitude: 24.684855}}, label: "Pisa, Espoo"}
    first: 1
  ) {
    pageInfo {
      endCursor
    }
    edges {
      node {
        start
        end
        legs {
          nextLegs(numberOfLegs: 3) {
            start {
              scheduledTime
            }
          }
          from {
            name
          }
          to {
            name
          }
          start {
            scheduledTime
          }
          end {
            scheduledTime
          }
          mode
          duration
        }
        
      }
    }
  }
}
```

2. Press play in GraphiQL to execute the query.



### Plan an itinerary and query fare information


1. Click [this link](https://api.digitransit.fi/graphiql/hsl/v2?query=%257B%250A%2520%2520planConnection%28%250A%2520%2520%2520%2520origin%253A%2520%257Blocation%253A%2520%257Bcoordinate%253A%2520%257Blatitude%253A%252060.199196699999995%252C%2520longitude%253A%252024.9397302%257D%257D%257D%250A%2520%2520%2520%2520destination%253A%2520%257Blocation%253A%2520%257Bcoordinate%253A%2520%257Blatitude%253A%252060.168438%252C%2520longitude%253A%252024.929283%257D%257D%257D%250A%2520%2520%2520%2520first%253A%25202%250A%2520%2520%29%2520%257B%250A%2520%2520%2520%2520pageInfo%2520%257B%250A%2520%2520%2520%2520%2520%2520endCursor%250A%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520edges%2520%257B%250A%2520%2520%2520%2520%2520%2520node%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520start%250A%2520%2520%2520%2520%2520%2520%2520%2520end%250A%2520%2520%2520%2520%2520%2520%2520%2520legs%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520fareProducts%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520product%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520id%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520name%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520from%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520name%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520to%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520name%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520start%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520scheduledTime%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520end%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520scheduledTime%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%250A%2520%2520%2520%2520%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%257D%250A%2520%2520%257D%250A%257D) to run the query below in GraphiQL.

```graphql
{
  planConnection(
    origin: {location: {coordinate: {latitude: 60.199196699999995, longitude: 24.9397302}}}
    destination: {location: {coordinate: {latitude: 60.168438, longitude: 24.929283}}}
    first: 2
  ) {
    pageInfo {
      endCursor
    }
    edges {
      node {
        start
        end
        legs {
          fareProducts {
            product {
              id
              name
            }
          }
          from {
            name
          }
          to {
            name
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
