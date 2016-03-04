---
title: Raildigitraffic2gtfsrt
description:
  info: Retrieves data from the open api of The Finnish Transport Agency and converts this data to GTFS-realtime.
  architecture: https://raw.githubusercontent.com/HSLdevcom/digitransit-site/master/pages/en/developers/service-catalogue/internal-components/raildigitraffic2gtfsrt/architecture.xml
assets:
  source: https://github.com/HSLdevcom/raildigitraffic2gtfsrt
  dockerHub: https://hub.docker.com/r/hsldevcom/raildigitraffic2gtfsrt/
  Dockerfile: https://github.com/HSLdevcom/raildigitraffic2gtfsrt/blob/master/Dockerfile
technologies:  
  "Finnish Transport Agency API": "http://rata.digitraffic.fi/api/v1/doc/index.html"
  "GTFS-RT": "https://developers.google.com/transit/gtfs-realtime/"
  "Python": null
docker:
  dockerfile: https://github.com/HSLdevcom/raildigitraffic2gtfsrt/blob/master/Dockerfile
  imageName: hsldevcom/raildigitraffic2gtfsrt
  buildScript: https://github.com/HSLdevcom/raildigitraffic2gtfsrt/blob/master/build-docker-image.sh
  runContainer: docker run -p 8080:8080 hsldevcom/raildigitraffic2gtfsrt
  accessContainer: http://localhost:8080/hsl/debug
---

On start service reads gtfs feed files from "route-server", then it periodically polls data from the
Finnish Transport Agency API and converts this data to GTFS-realtime format.


## API Documentation
The service offers two GTFS-realtime data feeds filled with [trip updates](https://developers.google.com/transit/gtfs-realtime/trip-updates),
one for HSL data and one for national data.

## Endpoint
<pre>http://beta.digitransit.fi/raildigitraffic2gtfsrt/:operator/:debug</pre>

Supported query parameters:
| Parameter | Type           | Description                                                             |
|-----------|----------------|-------------------------------------------------------------------------|
| operator  | pathParameter  | Id of operator 'hsl' or 'national'                                      |
| debug     | pathParameter  | 'debug' to print data in human readable format (for debugging purposes) |

## Examples

### Show currently active HSL realtime trip updates (debug mode)
> curl http://beta.digitransit.fi/raildigitraffic2gtfsrt/hsl/debug

More GTFS-rt programming examples from [Google](https://developers.google.com/transit/gtfs-realtime/code-samples).

## Service dependencies
Raildigitraffic2gtfsrt the following Digitransit data sources:
 * route-server (static gtfs feeds)

## Key service delivery activities
1. Keep up with raildigitraffic2gtfsrt development:<br/>
   https://github.com/pailakka/raildigitraffic2gtfsrt

2. Follow Google transit community and its mailing lists (especially GTFS-RT):<br/>
   https://developers.google.com/transit/community?hl=en
   https://groups.google.com/forum/#!forum/gtfs-realtime
