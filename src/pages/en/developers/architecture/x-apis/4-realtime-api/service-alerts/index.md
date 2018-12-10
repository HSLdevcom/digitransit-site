---
title: Service alerts
description:
  info: The HSL Alerts API can be used to query real-time updates from the HSL fleet in GTFS-RT format.
  architecture: https://raw.githubusercontent.com/HSLdevcom/digitransit-site/master/pages/en/developers/apis/4-realtime-api/service-architecture/service-alerts/architecture.xml
assets:
  - title: "source"
    url: https://github.com/HSLdevcom/hslalert
  - title: "DockerHub"
    url: https://hub.docker.com/r/hsldevcom/hslalert/
  - title: "Dockerfile"
    url: https://github.com/HSLdevcom/hslalert/blob/master/Dockerfile
technologies:
  "Python": null
  "GTFS-RT": null
docker:
  dockerfile: https://github.com/HSLdevcom/hslalert/blob/master/Dockerfile
  imageName: hsldevcom/hslalert
  buildScript: https://github.com/HSLdevcom/hslalert/blob/master/build-docker-image.sh
  runContainer: docker run -p 8080:5000 hsldevcom/hslalert
  accessContainer: http://localhost:8080/?debug
---

The service connects to the Poikkeusinfo v3 XML interface (http://www.poikkeusinfo.fi/xml/v3),
reads this data, and converts it to GTFS-RT

## Service dependencies

No Digitransit related service dependencies. Reads data from http://www.poikkeusinfo.fi/xml/v3

## Related open source projects

| URL                                                   | Project description                                               |
| ----------------------------------------------------- | ----------------------------------------------------------------- |
| https://github.com/samuelmr/hslalert                  | HSLAlerts upstream development (there probably won't happen much) |
| https://developers.google.com/transit/                | Google transit community (especially GTFS-RT)                     |
| https://groups.google.com/forum/#!forum/gtfs-realtime | Google transit forum                                              |
