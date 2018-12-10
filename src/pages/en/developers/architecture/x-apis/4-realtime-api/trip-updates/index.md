---
title: Trip updates
description:
  info: The main function of Siri2gtfsrt is to convert data from SIRI (Service Interface for Real Time Information) format to GTFS-realtime format. In addition to this the service also blends in selected data from existing GTFS-realtime feeds. Raildigitraffic2gtfsrt that is for internal use only retrieves data from the open api of The Finnish Transport Agency and converts this data to GTFS-realtime.
  architecture: https://raw.githubusercontent.com/HSLdevcom/digitransit-site/master/pages/en/developers/apis/4-realtime-api/service-architecture/trip-updates/architecture.xml
assets:
  - title: "source"
    url: https://github.com/HSLdevcom/siri2gtfsrt https://github.com/HSLdevcom/raildigitraffic2gtfsrt
  - title: "DockerHub"
    url: https://hub.docker.com/r/hsldevcom/siri2gtfsrt/
  - title: "DockerHub"
    url: https://hub.docker.com/r/hsldevcom/raildigitraffic2gtfsrt/
  - title: "Dockerfile"
    url: https://github.com/HSLdevcom/siri2gtfsrt/blob/master/Dockerfile
  - title: "Dockerfile"
    url: https://github.com/HSLdevcom/raildigitraffic2gtfsrt/blob/master/Dockerfile
technologies:
  "SIRI": "http://user47094.vs.easily.co.uk/siri/"
  "GTFS-RT": "https://developers.google.com/transit/gtfs-realtime/"
  "Python": null
  "Finnish Transport Agency API": http://rata.digitraffic.fi/api/v1/doc/index.html
docker:
  dockerfile: https://github.com/HSLdevcom/siri2gtfsrt/blob/master/Dockerfile
  imageName: hsldevcom/siri2gtfsrt
  buildScript: https://github.com/HSLdevcom/siri2gtfsrt/blob/master/build-docker-image.sh
  runContainer: docker run -p 8080:8080 hsldevcom/siri2gtfsrt
  accessContainer: http://localhost:8080/HSL?debug
  travisBuild: siri2gtfsrt
---

Service periodically polls the following services [hslalert](../service-alerts/), [navigatorserver](../vehicle-positions/) and [JOLI](<http://wiki.itsfactory.fi/index.php/Tampere_Public_Transport_SIRI_Interface_(Realtime_JSON_at_data.itsfactory.fi)>)
and converts the combined data to GTFS-RT.

The reason we're blending HSL data from multiple sources in this service is that there are several systems providing
(dynamic) GTFS-realtime updates to same (static) GTFS-feed and OpenTripPlanner currently supports only one dynamic
updater per feed.

## Service dependencies

### Siri2gtfsrt uses the following Digitransit data sources

| Data source        | Description                                                                                              |
| ------------------ | -------------------------------------------------------------------------------------------------------- |
| hslalert           | Real-time updates about HSL fleet in GTFS-RT format                                                      |
| digitraffic2gtfsrt | Retrieves data from the open api of The Finnish Transport Agency and converts this data to GTFS-realtime |
| navigatorserver    | Snapshot of the current real-time vehicle location data                                                  |

### Raildigitraffic2gtfsrt the following Digitransit data source (for internal use only)

| Data source  | Description       |
| ------------ | ----------------- |
| route-server | static gtfs feeds |

## Related open source projects

| URL                                                   | Project description                |
| ----------------------------------------------------- | ---------------------------------- |
| https://github.com/HSLdevcom/hslalert                 | HSLAlert development               |
| https://developers.google.com/transit/                | Google transit community           |
| https://groups.google.com/forum/#!forum/gtfs-realtime | Google transit forum               |
| https://github.com/pailakka/raildigitraffic2gtfsrt    | raildigitraffic2gtfsrt development |
