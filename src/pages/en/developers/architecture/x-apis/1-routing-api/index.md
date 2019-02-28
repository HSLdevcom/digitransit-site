---
title: Routing API
description:
  info: Routing API enables developers to query routes and timetable related information using either REST or GraphQL interfaces.
  architecture: https://raw.githubusercontent.com/HSLdevcom/digitransit-site/master/pages/en/developers/apis/1-routing-api/x-service-architecture/architecture.xml
assets:
  - title: "source"
    url: https://github.com/HSLdevcom/OpenTripPlanner
  - title: "DockerHub"
    url: "https://hub.docker.com/r/hsldevcom/opentripplanner/"
  - title: "Dockerfile"
    url: "https://github.com/HSLdevcom/OpenTripPlanner/blob/master/Dockerfile"
technologies:
  - title: "GTFS-RT"
    url: "https://developers.google.com/transit/gtfs-realtime/"
  - title: "GTFS"
    url: "https://developers.google.com/transit/gtfs/"
  - title: "Java"
docker:
  dockerfile: https://github.com/HSLdevcom/OpenTripPlanner/blob/master/Dockerfile
  imageName: hsldevcom/opentripplanner
  buildScript: https://github.com/HSLdevcom/OpenTripPlanner/blob/master/travis-build.sh
  runContainer: docker run -e OTP_DATA_CONTAINER_URL=http://otp-data-container:8080 -p 8080:8080 hsldevcom/opentripplanner
  accessContainer: http://localhost:8080/routers/
  travisBuild: OpenTripPlanner
---

Routing API is implemented using OpenTripPlanner.

> http://www.opentripplanner.org/

## Static and realtime information

OpenTripPlanner APIs provide access to static and realtime routing and transit information.
Routing and timetable data is based on static GTFS and it is enriched by realtime information for those departures that have realtime information available. This means that results returned by OpenTripPlanner always contain realtime information should it be
available.

## Hosting the API locally

If you need to make large amount of requests (e.g. requesting schedules from all stops) to the API, you might want to host the API locally.
To run OpenTripPlanner with Docker, use command:
```
docker run --rm --name otp-hsl -p 9080:8080 -e ROUTER_NAME=hsl -e JAVA_OPTS=-Xmx5g -e ROUTER_DATA_CONTAINER_URL=https://api.digitransit.fi/routing-data/v2/hsl hsldevcom/opentripplanner
```
After OpenTripPlanner has built the routing graph, the API can be accessed from `http://localhost:9080/otp/routers/hsl/index/graphql`

## API Documentation

### REST

REST interface is provided as it is available in OpenTripPlanner. First thing to do is to familiarize yourself with OpenTripPlanner documentation:

> http://docs.opentripplanner.org/en/latest/

OpenTripPlanner requires developers to make API requests through routers. Digitransit providers routers for Helsinki region, the Waltti regions and entire Finland:

| Region          | Router URL                                            |
| --------------- | ----------------------------------------------------- |
| Helsinki region | http://api.digitransit.fi/routing/v1/routers/hsl/     |
| Waltti regions  | http://api.digitransit.fi/routing/v1/routers/waltti/  |
| Entire Finland  | http://api.digitransit.fi/routing/v1/routers/finland/ |

### GraphQL

GraphQL API is built by us. Similarly to REST, GraphQL has different router endpoints for Helsinki region, the Waltti regions and entire Finland.

**For more details about the GraphQL you can go to our [GraphQL](../../../apis/1-routing-api/0-graphql/) page**

#### Introspection query

You can get access to GraphQL schema by running
[this example in GraphQL console](<http://dev.hsl.fi/graphql/console/?query=query%20IntrospectionQuery%20%7B%0A%20%20%20%20__schema%20%7B%0A%20%20%20%20%20%20queryType%20%7B%20name%20%7D%0A%20%20%20%20%20%20mutationType%20%7B%20name%20%7D%0A%20%20%20%20%20%20types%20%7B%0A%20%20%20%20%20%20%20%20...FullType%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20directives%20%7B%0A%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%20%20description%0A%20%20%20%20%20%20%20%20args%20%7B%0A%20%20%20%20%20%20%20%20%20%20...InputValue%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20onOperation%0A%20%20%20%20%20%20%20%20onFragment%0A%20%20%20%20%20%20%20%20onField%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%20%20fragment%20FullType%20on%20__Type%20%7B%0A%20%20%20%20kind%0A%20%20%20%20name%0A%20%20%20%20description%0A%20%20%20%20fields(includeDeprecated%3A%20true)%20%7B%0A%20%20%20%20%20%20name%0A%20%20%20%20%20%20description%0A%20%20%20%20%20%20args%20%7B%0A%20%20%20%20%20%20%20%20...InputValue%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20type%20%7B%0A%20%20%20%20%20%20%20%20...TypeRef%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20isDeprecated%0A%20%20%20%20%20%20deprecationReason%0A%20%20%20%20%7D%0A%20%20%20%20inputFields%20%7B%0A%20%20%20%20%20%20...InputValue%0A%20%20%20%20%7D%0A%20%20%20%20interfaces%20%7B%0A%20%20%20%20%20%20...TypeRef%0A%20%20%20%20%7D%0A%20%20%20%20enumValues(includeDeprecated%3A%20true)%20%7B%0A%20%20%20%20%20%20name%0A%20%20%20%20%20%20description%0A%20%20%20%20%20%20isDeprecated%0A%20%20%20%20%20%20deprecationReason%0A%20%20%20%20%7D%0A%20%20%20%20possibleTypes%20%7B%0A%20%20%20%20%20%20...TypeRef%0A%20%20%20%20%7D%0A%20%20%7D%0A%20%20fragment%20InputValue%20on%20__InputValue%20%7B%0A%20%20%20%20name%0A%20%20%20%20description%0A%20%20%20%20type%20%7B%20...TypeRef%20%7D%0A%20%20%20%20defaultValue%0A%20%20%7D%0A%20%20fragment%20TypeRef%20on%20__Type%20%7B%0A%20%20%20%20kind%0A%20%20%20%20name%0A%20%20%20%20ofType%20%7B%0A%20%20%20%20%20%20kind%0A%20%20%20%20%20%20name%0A%20%20%20%20%20%20ofType%20%7B%0A%20%20%20%20%20%20%20%20kind%0A%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%20%20ofType%20%7B%0A%20%20%20%20%20%20%20%20%20%20kind%0A%20%20%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D>)

## Related open source projects

| URL                                                           | Project description                                                                              |
| ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| https://github.com/opentripplanner/OpenTripPlanner            | OpenTripPlanner upstream development on GitHub                                                   |
| https://groups.google.com/forum/#!forum/opentripplanner-dev   | OpenTripPlanner forum for developers                                                             |
| https://groups.google.com/forum/#!forum/opentripplanner-users | OpenTripPlanner forum for end users                                                              |
| https://onebusaway.org/                                       | OneBusAway: The Open Source platform for Real Time Transit Info                                  |
| https://github.com/OneBusAway?utf8=✓&query=gtfs               | GTFS related projects: Open-source transit app for real-time information                         |
| https://developers.google.com/transit/                        | Google developers transit community: Making public transit data universally accessible           |
| https://github.com/conveyal/r5                                | Conveyal R5 development on GitHub: Rapid Realistic Routing on Real-world and Reimagined networks |
| https://blog.conveyal.com/                                    | Conveyal blog                                                                                    |
