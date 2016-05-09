---
title: Routing API
description:
  info: Routing API enables developers to query routes and timetable related information using either REST or GraphQL interfaces.
  architecture: https://raw.githubusercontent.com/HSLdevcom/digitransit-site/master/pages/en/developers/routing-api/architecture.xml
assets:
  source: https://github.com/HSLdevcom/OpenTripPlanner
  dockerHub: https://hub.docker.com/r/hsldevcom/OpenTripPlanner/
  Dockerfile: https://github.com/HSLdevcom/OpenTripPlanner/blob/master/Dockerfile
technologies:  
  "GTFS-RT": "https://developers.google.com/transit/gtfs-realtime/"
  "GTFS": "https://developers.google.com/transit/gtfs/"
  "Java": null
docker:
  dockerfile: https://github.com/HSLdevcom/OpenTripPlanner/blob/master/Dockerfile
  imageName: hsldevcom/opentripplanner
  buildScript: https://github.com/HSLdevcom/OpenTripPlanner/blob/master/build-docker-image.sh
  runContainer: docker run -e OTP_DATA_CONTAINER_URL=http://otp-data-container:8080 -p 8080:8080 hsldevcom/opentripplanner
  accessContainer: http://localhost:8080/routers/
---
Routing API is implemented using OpenTripPlanner.
> http://www.opentripplanner.org/

### Static and realtime information

OpenTripPlanner APIs provide access to static and realtime routing and transit information. Routing and timetable data
is based on static GTFS and it is enriched by realtime information for those departures that have realtime information
available. This means that results returned by OpenTripPlanner always contain realtime information should it be
available.

## API Documentation

### REST
REST interface is provided as it is available in OpenTripPlanner. First thing to do is to familiarize yourself with
OpenTripPlanner documentation:
> http://docs.opentripplanner.org/en/latest/

OpenTripPlanner requires developers to make API requests through routers. Digitransit providers routers for Helsinki
city region and entire Finland:
> http://api.digitransit.fi/routing/v1/routers/hsl/

> http://api.digitransit.fi/routing/v1/routers/finland/


### GraphQL
GraphQL interface is currently not covering all functionality of OpenTripPlanner. We're working on adding some of the
missing bits and pieces.

We provide GraphQL interface for both Helsinki city region and entire Finland:
> http://api.digitransit.fi/routing/v1/routers/hsl/index/graphql

> http://api.digitransit.fi/routing/v1/routers/finland/index/graphql


Interface can be tested using GraphQL console:
> http://dev.hsl.fi/graphql/console/

You can also download a standalone graphiql GraphQL client here:
> https://github.com/skevy/graphiql-app

You can get access to GraphQL schema by running
 [this example in GraphQL console](http://dev.hsl.fi/graphql/console/?query=query%20IntrospectionQuery%20%7B%0A%20%20%20%20__schema%20%7B%0A%20%20%20%20%20%20queryType%20%7B%20name%20%7D%0A%20%20%20%20%20%20mutationType%20%7B%20name%20%7D%0A%20%20%20%20%20%20types%20%7B%0A%20%20%20%20%20%20%20%20...FullType%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20directives%20%7B%0A%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%20%20description%0A%20%20%20%20%20%20%20%20args%20%7B%0A%20%20%20%20%20%20%20%20%20%20...InputValue%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20onOperation%0A%20%20%20%20%20%20%20%20onFragment%0A%20%20%20%20%20%20%20%20onField%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%20%20fragment%20FullType%20on%20__Type%20%7B%0A%20%20%20%20kind%0A%20%20%20%20name%0A%20%20%20%20description%0A%20%20%20%20fields(includeDeprecated%3A%20true)%20%7B%0A%20%20%20%20%20%20name%0A%20%20%20%20%20%20description%0A%20%20%20%20%20%20args%20%7B%0A%20%20%20%20%20%20%20%20...InputValue%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20type%20%7B%0A%20%20%20%20%20%20%20%20...TypeRef%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20isDeprecated%0A%20%20%20%20%20%20deprecationReason%0A%20%20%20%20%7D%0A%20%20%20%20inputFields%20%7B%0A%20%20%20%20%20%20...InputValue%0A%20%20%20%20%7D%0A%20%20%20%20interfaces%20%7B%0A%20%20%20%20%20%20...TypeRef%0A%20%20%20%20%7D%0A%20%20%20%20enumValues(includeDeprecated%3A%20true)%20%7B%0A%20%20%20%20%20%20name%0A%20%20%20%20%20%20description%0A%20%20%20%20%20%20isDeprecated%0A%20%20%20%20%20%20deprecationReason%0A%20%20%20%20%7D%0A%20%20%20%20possibleTypes%20%7B%0A%20%20%20%20%20%20...TypeRef%0A%20%20%20%20%7D%0A%20%20%7D%0A%20%20fragment%20InputValue%20on%20__InputValue%20%7B%0A%20%20%20%20name%0A%20%20%20%20description%0A%20%20%20%20type%20%7B%20...TypeRef%20%7D%0A%20%20%20%20defaultValue%0A%20%20%7D%0A%20%20fragment%20TypeRef%20on%20__Type%20%7B%0A%20%20%20%20kind%0A%20%20%20%20name%0A%20%20%20%20ofType%20%7B%0A%20%20%20%20%20%20kind%0A%20%20%20%20%20%20name%0A%20%20%20%20%20%20ofType%20%7B%0A%20%20%20%20%20%20%20%20kind%0A%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%20%20ofType%20%7B%0A%20%20%20%20%20%20%20%20%20%20kind%0A%20%20%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D)

### Example queries

1. Query stop by id:
```
{
  stop(id: "HSL:1173210") {
    name
    lat
    lon
    wheelchairBoarding
  }
}
```

2. Query stop by id and information about routes that go through it
```
{
  stop(id: "HSL:1173112") {
    name
    lat
    lon
    patterns {
      id
      name
      route {
        gtfsId
        shortName
        longName
      }
      directionId
    }
  }
}
```

3. Query stop names for bus number 50 for one direction
```
{
  pattern(id:"HSL:1050:1:01") {
    name
    stops{
      name  
    }
  }
}
```

4. Query a route plan from (60.4,24.5) to (60.41,24.51)
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

5. Query a route plan using only WALK and RAIL
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

6. Query all tram routes where number is like "1*"
```
{
  routes(name: "1", modes: "TRAM") {
    id
    agency {
      id
    }
    shortName
    longName
    desc
  }
}
```

7. Query all bus routes where number is like "58*"
```
{
  routes(name: "58", modes: "BUS") {
    id
    agency {
      id
    }
    shortName
    longName
    desc
  }
}
```

8. Query all stops where name is like "hertton"
```
{
  stops(name: "hertton") {
    id
    name
    wheelchairBoarding
  }
}
```

9. Query a stop by number
```
{
  stops(name: "4040") {
    id
    name
    wheelchairBoarding
  }
}
```

### Route planning

10. Basic route from Kamppi to Pisa

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

11. Route from Hakaniemi to Keilaniemi

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

12. Bicycle route from Kamppi to Pisa

- note maxWalkDistance is used for cycling too

```
{
  plan(
    fromPlace: "Kamppi, Helsinki",
    from: {lat: 60.168992, lon: 24.932366},
    toPlace: "Pisa, Espoo",
    to: {lat: 60.175294, lon: 24.684855},
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

### City bikes

14. Route from Kamppi to Kasarmitori using bike rental

- also show rental stations
- note use of mode `BICYCLE_RENT`, which is not returned as mode

```
{
  plan(
    fromPlace: "Kamppi, Helsinki",
    from: {lat: 60.168992, lon: 24.932366},
    toPlace: "Kasarmitori, Helsinki",
    to: {lat: 60.165246, lon: 24.949128},
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

14. Fetch bike station details

```
{
  bikeRentalStation(id:"Narinkka[24.935-60.170]") {
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

## Key service delivery activities
1. Keep up with OpenTripPlanner upstream development on GitHub<br/>
   https://github.com/opentripplanner/OpenTripPlanner

2. Follow OpenTripPlanner developers mailing list:<br/>
   https://groups.google.com/forum/#!forum/opentripplanner-dev
3. Follow OpenTripPlanner users mailing list:<br/>
   https://groups.google.com/forum/#!forum/opentripplanner-users
4. Keep up with Conveyal R5 development on GitHub<br/>
   https://github.com/conveyal/r5
5. Keep up with Conveyal and their blog:<br/>
   http://conveyal.com/blog/
6. Keep up with OneBusAway and especially GTFS related projects<br/>
   http://onebusaway.org/<br/>
   https://github.com/OneBusAway?utf8=%E2%9C%93&query=gtfs
7. Follow Google transit community and its mailing lists:<br/>
   https://developers.google.com/transit/community?hl=en
