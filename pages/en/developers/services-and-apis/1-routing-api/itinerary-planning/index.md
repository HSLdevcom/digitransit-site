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

You can ask server to return geometries for itineraries. API will return them in [Google poline-encoded format](https://developers.google.com/maps/documentation/utilities/polylinealgorithm). It looks like this:
```
"legGeometry": {
  "length": 349,
  "points": "wwfnJyjdwCXlAHLNfAFHDZz@nEh@hBXfA\\hAR^VLnChAD@HDHDjBt@^N|@`@JDHNFB`@RHDJFD@PD^fBDNNp@@JBPHl@FdA@d@@TFrCDnATpEL~CBnA@pADpELbQ?pB?nBC~@DdC?R?LDtC?P?j@@XG~@Ef@CPCHGHoAtAQT_@f@w@rAc@~@g@lAi@fBc@hBWvASzAWrBUtBQxBOtBMhCOvEEhCCfC@vB@fBDrCFlCJnCb@xIfFl_APdDr@dMd@bIV~D\\bFPnCjAtMt@~GxAhMlBfOz@jHVjCR~BNpCHrBFjCDdC?`CC`DIfDSxDUhDe@fFu@tHMzA{AlOcBtPCXE`@sCrY_BbPShCeAxJc@pDg@nECJi@~Di@dDUbAkA~Gk@bD_@vBUbB]lBe@lDY~B[rCWbC_@~DYfDW|BQ~Am@tGOfBOxAWlCKzAMvAIbAMpBIpAAd@GhACp@EhAEtAA~ACfCAnC@fA?rAClDC`G@`BCxHKlCMhIK~FE|CA~@@|@BxB@^?@DtAHbBLzALjBHbBFlAF|ADxAD|BNrEPjCTtHdAhVp@jSVlPFjJ?dC?hE?dJ?xC?vLDfKDpEF|CFnDPjHZvH\\xH|@jQXnF\\nFBXdAtSJtCZrG@^b@`K^dJLnDLtDj@bRT`IAb@?~@?dA@~A?fA?|@AjAE~BA`BBdABd@Bh@HfARnBPpBl@zFt@lGr@vE\\|Cz@dHrA|JdAtHPpAl@dEjA~I~AvNv@tIx@vKTtD`@nHTrENtDRzEPvHR|J\\`VNdKAjEFpLBlFDjCBfCFxBNjE`@nH@j@An@Cr@I^O^y@l@iAt@S@IAIGMKCICIKIKEI?MDILKVQVW^WVUPSJuAT??_ANaALg@No@ZkAz@a@ZKR]j@a@h@i@fA[f@Q`@u@dCmAvEw@dCk@nAe@z@S\\iAnAeA`Ai@f@eAfBy@rBu@rCMf@WfAU`Ac@`Bi@`CKh@ANUdBq@~GW|BQdAK^M\\IROVMLs@d@q@\\]P}@R{@BaA@_@Iu@E]?CAU?M?W@i@DKBg@NUDq@V}@^g@XQJk@h@EDQPeBnBIHILU\\"
}
```

We can use [polyline npm module](https://www.npmjs.com/package/polyline) to get some idea how this data looks:

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
