---
title: Itinerary planning
---

**If you are not familiar with [GraphQL](../0-graphql) and [GraphiQL](../1-graphiql) yet it is highly recommended to review those pages at first.**

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

You can ask server to return geometries for itineraries. API will return them in [Google poline-encoded format](https://developers.google.com/maps/documentation/utilities/polylinealgorithm). It looks like this:
```
"legGeometry": {
  "length": 349,
  "points": "wwfnJyjdwCXlAHLNfAFHDZz@nEh@hBXfA\\hAR^VLnChAD@HDHDjBt@^N|@`@JDHNFB`@RHDJFD@PD^fBDNNp@@JBPHl@FdA@d@@TFrCDnATpEL~CBnA@pADpELbQ?pB?nBC~@DdC?R?LDtC?P?j@@XG~@Ef@CPCHGHoAtAQT_@f@w@rAc@~@g@lAi@fBc@hBWvASzAWrBUtBQxBOtBMhCOvEEhCCfC@vB@fBDrCFlCJnCb@xIfFl_APdDr@dMd@bIV~D\\bFPnCjAtMt@~GxAhMlBfOz@jHVjCR~BNpCHrBFjCDdC?`CC`DIfDSxDUhDe@fFu@tHMzA{AlOcBtPCXE`@sCrY_BbPShCeAxJc@pDg@nECJi@~Di@dDUbAkA~Gk@bD_@vBUbB]lBe@lDY~B[rCWbC_@~DYfDW|BQ~Am@tGOfBOxAWlCKzAMvAIbAMpBIpAAd@GhACp@EhAEtAA~ACfCAnC@fA?rAClDC`G@`BCxHKlCMhIK~FE|CA~@@|@BxB@^?@DtAHbBLzALjBHbBFlAF|ADxAD|BNrEPjCTtHdAhVp@jSVlPFjJ?dC?hE?dJ?xC?vLDfKDpEF|CFnDPjHZvH\\xH|@jQXnF\\nFBXdAtSJtCZrG@^b@`K^dJLnDLtDj@bRT`IAb@?~@?dA@~A?fA?|@AjAE~BA`BBdABd@Bh@HfARnBPpBl@zFt@lGr@vE\\|Cz@dHrA|JdAtHPpAl@dEjA~I~AvNv@tIx@vKTtD`@nHTrENtDRzEPvHR|J\\`VNdKAjEFpLBlFDjCBfCFxBNjE`@nH@j@An@Cr@I^O^y@l@iAt@S@IAIGMKCICIKIKEI?MDILKVQVW^WVUPSJuAT??_ANaALg@No@ZkAz@a@ZKR]j@a@h@i@fA[f@Q`@u@dCmAvEw@dCk@nAe@z@S\\iAnAeA`Ai@f@eAfBy@rBu@rCMf@WfAU`Ac@`Bi@`CKh@ANUdBq@~GW|BQdAK^M\\IROVMLs@d@q@\\]P}@R{@BaA@_@Iu@E]?CAU?M?W@i@DKBg@NUDq@V}@^g@XQJk@h@EDQPeBnBIHILU\\"
}
```

You can use [polyline npm module](https://www.npmjs.com/package/polyline) to get some idea how this data looks:

```
var polyline = require('polyline')
var line = polyline.decode("wwfnJyjdwCXlAHLNfAFHDZz@nEh@hBXfA\\hAR^VLnChAD@HDHDjBt@^N|@`@JDHNFB`@RHDJFD@PD^fBDNNp@@JBPHl@FdA@d@@TFrCDnATpEL~CBnA@pADpELbQ?pB?nBC~@DdC?R?LDtC?P?j@@XG~@Ef@CPCHGHoAtAQT_@f@w@rAc@~@g@lAi@fBc@hBWvASzAWrBUtBQxBOtBMhCOvEEhCCfC@vB@fBDrCFlCJnCb@xIfFl_APdDr@dMd@bIV~D\\bFPnCjAtMt@~GxAhMlBfOz@jHVjCR~BNpCHrBFjCDdC?`CC`DIfDSxDUhDe@fFu@tHMzA{AlOcBtPCXE`@sCrY_BbPShCeAxJc@pDg@nECJi@~Di@dDUbAkA~Gk@bD_@vBUbB]lBe@lDY~B[rCWbC_@~DYfDW|BQ~Am@tGOfBOxAWlCKzAMvAIbAMpBIpAAd@GhACp@EhAEtAA~ACfCAnC@fA?rAClDC`G@`BCxHKlCMhIK~FE|CA~@@|@BxB@^?@DtAHbBLzALjBHbBFlAF|ADxAD|BNrEPjCTtHdAhVp@jSVlPFjJ?dC?hE?dJ?xC?vLDfKDpEF|CFnDPjHZvH\\xH|@jQXnF\\nFBXdAtSJtCZrG@^b@`K^dJLnDLtDj@bRT`IAb@?~@?dA@~A?fA?|@AjAE~BA`BBdABd@Bh@HfARnBPpBl@zFt@lGr@vE\\|Cz@dHrA|JdAtHPpAl@dEjA~I~AvNv@tIx@vKTtD`@nHTrENtDRzEPvHR|J\\`VNdKAjEFpLBlFDjCBfCFxBNjE`@nH@j@An@Cr@I^O^y@l@iAt@S@IAIGMKCICIKIKEI?MDILKVQVW^WVUPSJuAT??_ANaALg@No@ZkAz@a@ZKR]j@a@h@i@fA[f@Q`@u@dCmAvEw@dCk@nAe@z@S\\iAnAeA`Ai@f@eAfBy@rBu@rCMf@WfAU`Ac@`Bi@`CKh@ANUdBq@~GW|BQdAK^M\\IROVMLs@d@q@\\]P}@R{@BaA@_@Iu@E]?CAU?M?W@i@DKBg@NUDq@V}@^g@XQJk@h@EDQPeBnBIHILU\\")
for (var i=0; i < line.length; i++) {
  var s = line[i][0] + ", " + line[i][1]
  console.log(s)
}
```
by running this on Node.js, it prints a table like so:
```
...
60.17545, 24.68756
60.1755, 24.68751
60.17555, 24.68744
60.17566, 24.68729
```

You can copy paste this into a tool that [plots points on map](http://www.darrinward.com/lat-long/?id=1974554).

![polyline](./polyline.png)

## Query examples

**Note:** For more details about the query type **plan** and its parameters you can use **Documentation Explorer** provided in GraphiQL.

**Note:** If the examples provided with some id or other value do not return what is expected then the value in question may not be in use any more and you should try again with an existing value.

### Plan an itinerary from location (60.168992,24.932366) to (60.175294,24.684855)

1. Click [this link](https://api.digitransit.fi/graphiql/hsl?query=%7B%0A%20%20plan(%0A%20%20%20%20from%3A%20%7Blat%3A%2060.168992%2C%20lon%3A%2024.932366%7D%0A%20%20%20%20to%3A%20%7Blat%3A%2060.175294%2C%20lon%3A%2024.684855%7D%0A%20%20%20%20numItineraries%3A%203%0A%20%20)%20%7B%0A%20%20%20%20itineraries%20%7B%0A%20%20%20%20%20%20legs%20%7B%0A%20%20%20%20%20%20%20%20startTime%0A%20%20%20%20%20%20%20%20endTime%0A%20%20%20%20%20%20%20%20mode%0A%20%20%20%20%20%20%20%20duration%0A%20%20%20%20%20%20%20%20realTime%0A%20%20%20%20%20%20%20%20distance%0A%20%20%20%20%20%20%20%20transitLeg%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D) 
to run the query below in GraphiQL.

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

1. Click [this link](https://api.digitransit.fi/graphiql/hsl?query=%7B%0A%20%20plan(%0A%20%20%20%20fromPlace%3A%20%22Kamppi%2C%20Helsinki%22%2C%0A%20%20%20%20from%3A%20%7Blat%3A%2060.168992%2C%20lon%3A%2024.932366%7D%2C%0A%20%20%20%20toPlace%3A%20%22Pisa%2C%20Espoo%22%2C%0A%20%20%20%20to%3A%20%7Blat%3A%2060.175294%2C%20lon%3A%2024.684855%7D%2C%0A%20%20%20%20modes%3A%20%22BUS%2CTRAM%2CRAIL%2CSUBWAY%2CFERRY%2CWALK%22%2C%0A%20%20%20%20walkReluctance%3A%202.1%2C%0A%20%20%20%20walkBoardCost%3A%20600%2C%0A%20%20%20%20minTransferTime%3A%20180%2C%0A%20%20%20%20walkSpeed%3A%201.2%2C%0A%20%20)%20%7B%0A%20%20%20%20itineraries%7B%0A%20%20%20%20%20%20walkDistance%2C%0A%20%20%20%20%20%20duration%2C%0A%20%20%20%20%20%20legs%20%7B%0A%20%20%20%20%20%20%20%20mode%0A%20%20%20%20%20%20%20%20startTime%0A%20%20%20%20%20%20%20%20endTime%0A%20%20%20%20%20%20%20%20from%20%7B%0A%20%20%20%20%20%20%20%20%20%20lat%0A%20%20%20%20%20%20%20%20%20%20lon%0A%20%20%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%20%20%20%20stop%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20code%0A%20%20%20%20%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%20%20to%20%7B%0A%20%20%20%20%20%20%20%20%20%20lat%0A%20%20%20%20%20%20%20%20%20%20lon%0A%20%20%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%20%20agency%20%7B%0A%20%20%20%20%20%20%20%20%20%20id%0A%20%20%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%20%20distance%0A%20%20%20%20%20%20%20%20legGeometry%20%7B%0A%20%20%20%20%20%20%20%20%20%20length%0A%20%20%20%20%20%20%20%20%20%20points%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D) to run the query below in GraphiQL.

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

### Plan an itinerary from Hakaniemi to Keilaniemi and modify parameters below:

- Return five results (numItineraries: 5)
- Using other modes than subway (modes: "BUS,TRAM,RAIL,FERRY,WALK")
- Fast walking speed (walkSpeed: 1.7)
- Safety margin 10 minutes (minTransferTime: 600)

1. Click [this link](https://api.digitransit.fi/graphiql/hsl?query=%7B%0A%20%20plan(%0A%20%20%20%20fromPlace%3A%20%22Hakaniemi%2C%20Helsinki%22%2C%0A%20%20%20%20from%3A%20%7Blat%3A%2060.179267%2C%20lon%3A%2024.951501%7D%2C%0A%20%20%20%20toPlace%3A%20%22Keilaniemi%2C%20Espoo%22%2C%0A%20%20%20%20to%3A%20%7Blat%3A%2060.1762%2C%20lon%3A%2024.836584%7D%2C%0A%20%20%20%20date%3A%20%222017-11-21%22%2C%0A%20%20%20%20time%3A%20%2223%3A28%3A00%22%2C%0A%20%20%20%20numItineraries%3A%205%2C%0A%20%20%20%20modes%3A%20%22BUS%2CTRAM%2CRAIL%2CFERRY%2CWALK%22%2C%0A%20%20%20%20walkReluctance%3A%202.1%2C%0A%20%20%20%20walkBoardCost%3A%20600%2C%0A%20%20%20%20minTransferTime%3A%20600%2C%0A%20%20%20%20walkSpeed%3A%201.7%2C%0A%20%20)%20%7B%0A%20%20%20%20itineraries%7B%0A%20%20%20%20%20%20walkDistance%2C%0A%20%20%20%20%20%20duration%2C%0A%20%20%20%20%20%20legs%20%7B%0A%20%20%20%20%20%20%20%20mode%0A%20%20%20%20%20%20%20%20startTime%0A%20%20%20%20%20%20%20%20endTime%0A%20%20%20%20%20%20%20%20from%20%7B%0A%20%20%20%20%20%20%20%20%20%20lat%0A%20%20%20%20%20%20%20%20%20%20lon%0A%20%20%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%20%20%20%20stop%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20code%0A%20%20%20%20%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%20%20to%20%7B%0A%20%20%20%20%20%20%20%20%20%20lat%0A%20%20%20%20%20%20%20%20%20%20lon%0A%20%20%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%20%20agency%20%7B%0A%20%20%20%20%20%20%20%20%20%20id%0A%20%20%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%20%20distance%0A%20%20%20%20%20%20%20%20legGeometry%20%7B%0A%20%20%20%20%20%20%20%20%20%20length%0A%20%20%20%20%20%20%20%20%20%20points%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D) to run the query below in GraphiQL.

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

2. Press play in GraphiQL to execute the query.
