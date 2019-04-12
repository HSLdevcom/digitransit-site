---
title: Trip updates
replit:
  embeds:
    -
      title: "Show currently active HSL trip updates"
      url: https://repl.it/@digitransit/RealtimeTripUpdates
      height: 700px
---

<div class="alert alert-warning"></div>

**Note:** Trip updates API will be deprecated in the future in favor of [Stop times](../../1-routing-api/stops/) GraphQL API. This is part of an effort to reduce overlapping API functionalities and to concentrate APIs under the GraphQL APIs.

Currently the service offers two [GTFS-RT](https://developers.google.com/transit/gtfs-realtime/) data feeds filled with [trip updates](https://developers.google.com/transit/gtfs-realtime/guides/trip-updates), one for HSL data and one for JOLI data.

## Endpoint
`http://api.digitransit.fi/realtime/trip-updates/v1/:operator`
<!--<pre>http://api.digitransit.fi/realtime/raildigitraffic2gtfsrt/v1/:operator/:debug</pre>

**Note:** raildigitraffic2gtfsrt is for internal use only-->

### Supported URL parameters
| Parameter   | Type            | Description                                                  |
|-------------|-----------------|--------------------------------------------------------------|
| `operator`  | path parameter  | id of an operator, either `HSL` or `JOLI`
| `debug`     | query parameter | Print data in human readable format (for debugging purposes)

## Examples
* More GTFS-rt programming examples from [Google](https://developers.google.com/transit/gtfs-realtime/examples/code-samples).

### Show currently active HSL real-time trip updates (debug mode)
> curl http://api.digitransit.fi/realtime/trip-updates/v1/HSL?debug

### Show currently active JOLI real-time trip updates (debug mode)
> curl http://api.digitransit.fi/realtime/trip-updates/v1/JOLI?debug
