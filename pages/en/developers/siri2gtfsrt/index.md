---
title: Siri2gtfsrt
dockerImageName: hsldevcom/siri2gtfsrt
assets:
  source: https://github.com/HSLdevcom/siri2gtfsrt
  dockerHub: https://hub.docker.com/r/hsldevcom/siri2gtfsrt/
  Dockerfile: https://github.com/HSLdevcom/siri2gtfsrt/blob/master/Dockerfile
technologies:  
  "SIRI": "http://user47094.vs.easily.co.uk/siri/"
  "GTFS-RT": "https://developers.google.com/transit/gtfs-realtime/"
  "Python": null
---

## Description
The main function of Siri2gtfsrt is to convert data from SIRI (Service Interface for Real Time Information) format to
GTFS-realtime format. In addition to this the service also blends in selected data from existing GTFS-realtime feeds.

## Service architecture
Service periodically polls the following services [hslalert](../alerts-hsl-api/), [raildigitraffic2gtfsrt](../raildigitraffic2gtfsrt/), [navigatorserver](../navigatorserver/) and [JOLI](http://wiki.itsfactory.fi/index.php/Tampere_Public_Transport_SIRI_Interface_(Realtime_JSON_at_data.itsfactory.fi))
and converts the combined data to GTFS-RT.

The reason we're blending HSL data from multiple sources in this service is that there are several systems providing
(dynamic) GTFS-realtime updates to same (static) GTFS-feed and OpenTripPlanner currently supports only one dynamic
updater per feed.

![Architecture](./siri2gtfsrt.svg)

## API Documentation
Currently the service offers two GTFS-realtime data feeds filled with [trip updates](https://developers.google.com/transit/gtfs-realtime/trip-updates),
one for HSL data and one for JOLI data.

## Endpoint
<pre>http://beta.digitransit.fi/siri2gtfsrt/:operator</pre>

Supported query parameters:
| Parameter | Type           | Description                                                  |
|-----------|----------------|--------------------------------------------------------------|
| operator  | pathParameter  | Id of operator 'HSL' or 'JOLI'                                              |
| debug     | queryParameter | Print data in human readable format (for debugging purposes) |

## Examples

### Show currently active JOLI realtime trip updates (debug mode)
> curl http://beta.digitransit.fi/siri2gtfsrt/JOLI?debug

More GTFS-rt programming examples from [Google](https://developers.google.com/transit/gtfs-realtime/code-samples).

## Service dependencies
Siri2gtfsrt uses the following Digitransit data sources: 
 * hslalert
 * raildigitraffic2gtfsrt
 * navigatorserver

## Key service delivery activities
1. Keep up with HSLAlert development:<br/> 
   https://github.com/HSLdevcom/hslalert

2. Follow Google transit community and its mailing lists (especially GTFS-RT):<br/>
   https://developers.google.com/transit/community?hl=en
   https://groups.google.com/forum/#!forum/gtfs-realtime

