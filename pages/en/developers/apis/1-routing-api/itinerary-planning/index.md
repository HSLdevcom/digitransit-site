---
title: Itinerary planning
---

**If you are not yet familiar with [GraphQL](../0-graphql) and [GraphiQL](../1-graphiql) it is highly recommended to review those pages at first.**

## Glossary

| Term                                  | Explanation                     |
|---------------------------------------|---------------------------------|
| Transportation Mode (or just Mode)    | A means of transport, for example: walking, cycling, driving a car, bus, train, subway, tram, ferry, taxi, airplane.
| Itinerary                             | A combination of different transportation modes at certain times to reach from origin to destination. For example to go from Pasila (Helsinki) to Koskikeskus (Tampere) you could walk to the train station, take the 14:00 P train to Aviapolis, walk to the airport, take the 15:00 flight to Tampere-Pirkkala and take a taxi to the final destination. Commonly used synonym: journey
| Leg                                   | One part of an itinerary
| Origin                                | When the context is a person; the geographical point where an itinerary begins. When the context is a route; the first stop on the route or the first location on the headsign.
| Destination                           | When the context is a person; the geographical point where an itinerary ends. When the context is a route; the last stop on the route or the last location on the headsign.
| Headsign                              | A description of a route usually written on the front of the vehicle. For example: “Helsinki” (for just the destination) or “Helsinki - Tampere” (for both the origin and destination).

### Note about Itinerary leg geometries

You can ask the server to return geometries for itineraries. The API will return them in [Google polyline-encoded format](https://developers.google.com/maps/documentation/utilities/polylinealgorithm). It looks like this:
```
"legGeometry": {
  "length": 349,
  "points": "wwfnJyjdwCXlAHLNfAFHDZz@nEh@hBXfA\\hAR^VLnChAD@HDHDjBt@^N|@`@JDHNFB`@RHDJFD@PD^fBDNNp@@JBPHl@FdA@d@@TFrCDnATpEL~CBnA@pADpELbQ?pB?nBC~@DdC?R?LDtC?P?j@@XG~@Ef@CPCHGHoAtAQT_@f@w@rAc@~@g@lAi@fBc@hBWvASzAWrBUtBQxBOtBMhCOvEEhCCfC@vB@fBDrCFlCJnCb@xIfFl_APdDr@dMd@bIV~D\\bFPnCjAtMt@~GxAhMlBfOz@jHVjCR~BNpCHrBFjCDdC?`CC`DIfDSxDUhDe@fFu@tHMzA{AlOcBtPCXE`@sCrY_BbPShCeAxJc@pDg@nECJi@~Di@dDUbAkA~Gk@bD_@vBUbB]lBe@lDY~B[rCWbC_@~DYfDW|BQ~Am@tGOfBOxAWlCKzAMvAIbAMpBIpAAd@GhACp@EhAEtAA~ACfCAnC@fA?rAClDC`G@`BCxHKlCMhIK~FE|CA~@@|@BxB@^?@DtAHbBLzALjBHbBFlAF|ADxAD|BNrEPjCTtHdAhVp@jSVlPFjJ?dC?hE?dJ?xC?vLDfKDpEF|CFnDPjHZvH\\xH|@jQXnF\\nFBXdAtSJtCZrG@^b@`K^dJLnDLtDj@bRT`IAb@?~@?dA@~A?fA?|@AjAE~BA`BBdABd@Bh@HfARnBPpBl@zFt@lGr@vE\\|Cz@dHrA|JdAtHPpAl@dEjA~I~AvNv@tIx@vKTtD`@nHTrENtDRzEPvHR|J\\`VNdKAjEFpLBlFDjCBfCFxBNjE`@nH@j@An@Cr@I^O^y@l@iAt@S@IAIGMKCICIKIKEI?MDILKVQVW^WVUPSJuAT??_ANaALg@No@ZkAz@a@ZKR]j@a@h@i@fA[f@Q`@u@dCmAvEw@dCk@nAe@z@S\\iAnAeA`Ai@f@eAfBy@rBu@rCMf@WfAU`Ac@`Bi@`CKh@ANUdBq@~GW|BQdAK^M\\IROVMLs@d@q@\\]P}@R{@BaA@_@Iu@E]?CAU?M?W@i@DKBg@NUDq@V}@^g@XQJk@h@EDQPeBnBIHILU\\"
}
```

You can use [this tool](https://polyline-mapper--mjaakko.repl.co/) to see what the polyline looks on a map.

See the following examples on how to decode and use polylines:
* [Node.js app](https://repl.it/@mjaakko/PolylineDecode), which prints a list of coordinates in an itinerary
* [Itinerary planner demo](https://repl.it/@mjaakko/PolylineDecodeMap), which shows itinerary leg polylines on a map

## Query examples

**Note:** For more details about the query type **plan** and its parameters you can use the **Documentation Explorer** provided in GraphiQL.

### Plan an itinerary from location (60.168992,24.932366) to (60.175294,24.684855)

1. Click [this link](https://api.digitransit.fi/graphiql/hsl?query=%7B%0A%20%20plan(%0A%20%20%20%20from%3A%20%7Blat%3A%2060.168992%2C%20lon%3A%2024.932366%7D%0A%20%20%20%20to%3A%20%7Blat%3A%2060.175294%2C%20lon%3A%2024.684855%7D%0A%20%20%20%20numItineraries%3A%203%0A%20%20)%20%7B%0A%20%20%20%20itineraries%20%7B%0A%20%20%20%20%20%20legs%20%7B%0A%20%20%20%20%20%20%20%20startTime%0A%20%20%20%20%20%20%20%20endTime%0A%20%20%20%20%20%20%20%20mode%0A%20%20%20%20%20%20%20%20duration%0A%20%20%20%20%20%20%20%20realTime%0A%20%20%20%20%20%20%20%20distance%0A%20%20%20%20%20%20%20%20transitLeg%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D) to run the query below in GraphiQL.

```
{
  plan(
    from: {lat: 60.168992, lon: 24.932366}
    to: {lat: 60.175294, lon: 24.684855}
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

2. Press play in GraphiQL to execute the query.

### Basic route from Kamppi (Helsinki) to Pisa (Espoo)

1. Click [this link](https://api.digitransit.fi/graphiql/hsl?query=%7B%0A%20%20plan(%0A%20%20%20%20fromPlace%3A%20%22Kamppi%2C%20Helsinki%22%2C%0A%20%20%20%20from%3A%20%7Blat%3A%2060.168992%2C%20lon%3A%2024.932366%7D%2C%0A%20%20%20%20toPlace%3A%20%22Pisa%2C%20Espoo%22%2C%0A%20%20%20%20to%3A%20%7Blat%3A%2060.175294%2C%20lon%3A%2024.684855%7D%2C%0A%20%20)%20%7B%0A%20%20%20%20itineraries%7B%0A%20%20%20%20%20%20walkDistance%2C%0A%20%20%20%20%20%20duration%2C%0A%20%20%20%20%20%20legs%20%7B%0A%20%20%20%20%20%20%20%20mode%0A%20%20%20%20%20%20%20%20startTime%0A%20%20%20%20%20%20%20%20endTime%0A%20%20%20%20%20%20%20%20from%20%7B%0A%20%20%20%20%20%20%20%20%20%20lat%0A%20%20%20%20%20%20%20%20%20%20lon%0A%20%20%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%20%20%20%20stop%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20code%0A%20%20%20%20%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%20%20to%20%7B%0A%20%20%20%20%20%20%20%20%20%20lat%0A%20%20%20%20%20%20%20%20%20%20lon%0A%20%20%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%20%20agency%20%7B%0A%20%20%20%20%20%20%20%20%20%20gtfsId%0A%09%20%20name%0A%20%20%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%20%20distance%0A%20%20%20%20%20%20%20%20legGeometry%20%7B%0A%20%20%20%20%20%20%20%20%20%20length%0A%20%20%20%20%20%20%20%20%20%20points%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D) to run the query below in GraphiQL.

```
{
  plan(
    fromPlace: "Kamppi, Helsinki",
    from: {lat: 60.168992, lon: 24.932366},
    toPlace: "Pisa, Espoo",
    to: {lat: 60.175294, lon: 24.684855},
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
          gtfsId
	  name
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

### Plan an itinerary using only WALK and RAIL modes

1. Click [this link](https://api.digitransit.fi/graphiql/hsl?query=%7B%0A%20%20plan(%0A%20%20%20%20from%3A%20%7Blat%3A%2060.199196699999995%2C%20lon%3A%2024.9397302%7D%0A%20%20%20%20to%3A%20%7Blat%3A%2060.168438%2C%20lon%3A%2024.929283%7D%0A%20%20%20%20numItineraries%3A%203%0A%20%20%20%20modes%3A%20%22WALK%2CRAIL%22%0A%20%20)%20%7B%0A%20%20%20%20itineraries%20%7B%0A%20%20%20%20%20%20legs%20%7B%0A%20%20%20%20%20%20%20%20startTime%0A%20%20%20%20%20%20%20%20endTime%0A%20%20%20%20%20%20%20%20mode%0A%20%20%20%20%20%20%20%20duration%0A%20%20%20%20%20%20%20%20realTime%0A%20%20%20%20%20%20%20%20distance%0A%20%20%20%20%20%20%20%20transitLeg%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D) to run the query below in GraphiQL.

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

2. Press play in GraphiQL to execute the query.

### Plan an itinerary from Hakaniemi to Keilaniemi and modify the following parameters:

* Return five results: (`numItineraries: 5`)
* Use transportation modes other than subway (`modes: "BUS,TRAM,RAIL,FERRY,WALK"`)
* Walking speed of 1,7m/s (`walkSpeed: 1.7`)
* Use a 10 minute safety margin for transfers (`minTransferTime: 600`)
* Use a 5 minute boarding cost (`walkBoardCost: 300`)
  * Boarding cost is used to prefer itineraries with less vehicle boardings
    * For example, if `walkBoardCost: 300` is used and there is a 48min itinerary with one boarding and a 45min itinerary with two boardings, the 48 minute itinerary is returned, because its total cost is smaller (48min + 5min vs. 45min + 5min + 5min)
* Use multiplier of 2.1 for walk reluctance to prefer routes with less walking (`walkReluctance: 2.1`)
  * Walking times are multiplied with this multiplier
* Specific departure date and time
  * `date` in format YYYY-MM-DD
  * `time` in format hh:mm:ss

1. Click [this link](https://api.digitransit.fi/graphiql/hsl?query=%7B%0A%20%20plan(%0A%20%20%20%20fromPlace%3A%20%22Hakaniemi%2C%20Helsinki%22%2C%0A%20%20%20%20from%3A%20%7Blat%3A%2060.179267%2C%20lon%3A%2024.951501%7D%2C%0A%20%20%20%20toPlace%3A%20%22Keilaniemi%2C%20Espoo%22%2C%0A%20%20%20%20to%3A%20%7Blat%3A%2060.1762%2C%20lon%3A%2024.836584%7D%2C%0A%20%20%20%20date%3A%20%222017-11-21%22%2C%0A%20%20%20%20time%3A%20%2223%3A28%3A00%22%2C%0A%20%20%20%20numItineraries%3A%205%2C%0A%20%20%20%20modes%3A%20%22BUS%2CTRAM%2CRAIL%2CFERRY%2CWALK%22%2C%0A%20%20%20%20walkReluctance%3A%202.1%2C%0A%20%20%20%20walkBoardCost%3A%20300%2C%0A%20%20%20%20minTransferTime%3A%20600%2C%0A%20%20%20%20walkSpeed%3A%201.7%2C%0A%20%20)%20%7B%0A%20%20%20%20itineraries%7B%0A%20%20%20%20%20%20walkDistance%2C%0A%20%20%20%20%20%20duration%2C%0A%20%20%20%20%20%20legs%20%7B%0A%20%20%20%20%20%20%20%20mode%0A%20%20%20%20%20%20%20%20startTime%0A%20%20%20%20%20%20%20%20endTime%0A%20%20%20%20%20%20%20%20from%20%7B%0A%20%20%20%20%20%20%20%20%20%20lat%0A%20%20%20%20%20%20%20%20%20%20lon%0A%20%20%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%20%20%20%20stop%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20code%0A%20%20%20%20%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%20%20to%20%7B%0A%20%20%20%20%20%20%20%20%20%20lat%0A%20%20%20%20%20%20%20%20%20%20lon%0A%20%20%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%20%20agency%20%7B%0A%20%20%20%20%20%20%20%20%20%20gtfsId%0A%09%20%20%09%09%09name%0A%20%20%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%20%20distance%0A%20%20%20%20%20%20%20%20legGeometry%20%7B%0A%20%20%20%20%20%20%20%20%20%20length%0A%20%20%20%20%20%20%20%20%20%20points%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D) to run the query below in GraphiQL.

```
{
  plan(
    fromPlace: "Hakaniemi, Helsinki",
    from: {lat: 60.179267, lon: 24.951501},
    toPlace: "Keilaniemi, Espoo",
    to: {lat: 60.1762, lon: 24.836584},
    date: "2017-11-21",
    time: "23:28:00",
    numItineraries: 5,
    modes: "BUS,TRAM,RAIL,FERRY,WALK",
    walkReluctance: 2.1,
    walkBoardCost: 300,
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
          gtfsId
	  name
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

2. Change arguments `date` and `time`.
3. Press play in GraphiQL to execute the query.

### Plan an itinerary and query fare information

* **Note:** Currently only regular adult fare information is available

1. Click [this link](https://api.digitransit.fi/graphiql/hsl?query=%7B%0A%20%20plan(%0A%20%20%20%20from%3A%20%7Blat%3A%2060.1713572%2C%20lon%3A%2024.9416544%7D%0A%20%20%20%20to%3A%20%7Blat%3A%2060.40431%2C%20lon%3A%2025.1066186%7D%0A%20%20%20%20numItineraries%3A%203%0A%20%20)%20%7B%0A%20%20%20%20date%0A%20%20%20%20itineraries%20%7B%0A%20%20%20%20%20%20legs%20%7B%0A%20%20%20%20%20%20%20%20startTime%0A%20%20%20%20%20%20%20%20endTime%0A%20%20%20%20%20%20%20%20mode%0A%20%20%20%20%20%20%20%20duration%0A%20%20%20%20%20%20%20%20realTime%0A%20%20%20%20%20%20%20%20distance%0A%20%20%20%20%20%20%20%20transitLeg%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20fares%20%7B%0A%20%20%20%20%20%20%20%20type%0A%20%20%20%20%20%20%20%20cents%0A%20%20%20%20%20%20%20%20currency%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D) to run the query below in GraphiQL.

```
{
  plan(
    from: {lat: 60.1713572, lon: 24.9416544}
    to: {lat: 60.40431, lon: 25.1066186}
    numItineraries: 3
  ) {
    date
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
      fares {
        type
        cents
        currency
      }
    }
  }
}
```

2. Press play in GraphiQL to execute the query.
