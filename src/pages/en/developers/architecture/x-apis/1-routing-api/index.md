---
title: Routing API
description:
  info: Routing API enables developers to query routes and timetable related information through a GraphQL interface.
  architecture: https://raw.githubusercontent.com/HSLdevcom/digitransit-site/master/src/pages/en/developers/architecture/x-apis/1-routing-api/architecture.xml
assets:
  - title: "source"
    url: https://github.com/HSLdevcom/OpenTripPlanner
  - title: "DockerHub"
    url: "https://hub.docker.com/r/hsldevcom/opentripplanner/"
technologies:
  - title: "GTFS-RT"
    url: "https://gtfs.org/documentation/realtime/reference/"
  - title: "GTFS"
    url: "https://gtfs.org/documentation/schedule/reference/"
  - title: "GBFS"
    url: "https://gbfs.org/"
  - title: "Java"
docker:
  imageName: hsldevcom/opentripplanner
  runContainer: docker run --rm -p 9080:8080 -e JAVA_OPTS=-Xmx10g -v ./hsl/:/var/opentripplanner hsldevcom/opentripplanner:v2-prod --load --serve
  accessContainer: http://localhost:9080/
---

Routing API is implemented using OpenTripPlanner.

> https://www.opentripplanner.org/

Details on how static data is included in our OpenTripPlanner instances can be found [here](../../../services/6-data-containers/routing-data/).

## Static and realtime information

OpenTripPlanner APIs provide access to static and realtime routing and transit information.
Routing and timetable data is based on static GTFS and it is enriched by realtime information for those departures that have realtime information available. This means that results returned by OpenTripPlanner always contain realtime information should it be
available.

## Hosting the API locally

If you need to make a large amount of requests (e.g. requesting schedules from all stops) to the API, you might want to host the API locally.
To run OpenTripPlanner with Docker, you first need to download the required graph and configuration. The following instructions are for
running OTP with HSL data, but by changing `hsl` in the instructions to any of the other available [endpoints](../../../apis/1-routing-api/#endpoints),
it's possible to follow the same flow. The required files are available at `https://api.digitransit.fi/routing-data/v3/hsl/?digitransit-subscription-key=<subscription key>`.
The only file that needs to be downloaded is `graph-hsl-<commit hash>.zip`. That file should be unzipped and then the directory can be mounted as
a volume for running OTP with the following command:
`docker run --rm -p 9080:8080 -e JAVA_OPTS=-Xmx10g -v ./hsl/:/var/opentripplanner hsldevcom/opentripplanner:v2-prod --load --serve`

The GraphQL API can be accessed from `http://localhost:9080/otp/gtfs/v1` and a local GraphiQL UI from `http://localhost:9080/graphiql`.

**Note:** The data and OTP version need to be compatible. This can be validated by running `docker run --rm hsldevcom/opentripplanner:v2-prod --version`. OTP's commit version should match the commit hash from the graph zip's name.

**Note:** Some of the real-time updaters are configured by default to fetch data from a local instance of a `digitransit-proxy` which will lead to errors. However, the use of proxy is often not necessary. This can be circumvented by removing `digitransit-proxy:8080/out/` from the URLs inside `updaters` section of the `router-config.json` file that is located in the graph directory. The server needs to be restarted after this file is edited.

## API Documentation

OpenTripPlanner has multiple APIs but currently we only expose the GTFS GraphQL API version 1. Even though the version is called 1, it's a newer version
of the GraphQL API we had available in our `/routing/v1` API.

### GTFS GraphQL API v1

We expose 5 different version of this API to users with different data sets and configurations in use. There is documentation about this API in our [routing API documentation page](../../../apis/1-routing-api/0-graphql/).

## Related links

| URL                                                           | Project description                                                                              |
| ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| https://github.com/opentripplanner/OpenTripPlanner            | OpenTripPlanner upstream development on GitHub                                                   |
| https://app.gitter.im/#/room/#opentripplanner_OpenTripPlanner:gitter.im   | OpenTripPlanner Gitter room                                                            |
| https://gtfs.org/                        | Home page for the GTFS data standard           |
| https://gbfs.org/                        | Home page for the GBFS data standard           |
| https://onebusaway.org/                                       | OneBusAway: The Open Source platform for Real Time Transit Info                                  |
| https://github.com/OneBusAway?utf8=✓&query=gtfs               | GTFS related projects: Open-source transit app for real-time information                         |
| https://github.com/conveyal/r5                                | Conveyal R5 development on GitHub: Rapid Realistic Routing on Real-world and Reimagined networks |
| https://blog.conveyal.com/                                    | Conveyal blog                                                                                    |
