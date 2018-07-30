---
title: Trip updates
---

## API Documentation
Currently the service offers two GTFS-realtime data feeds filled with [trip updates](https://developers.google.com/transit/gtfs-realtime/guides/trip-updates), one for HSL data and one for JOLI data.

## Endpoint
`http://api.digitransit.fi/realtime/trip-updates/v1/:operator`
<!--<pre>http://api.digitransit.fi/realtime/raildigitraffic2gtfsrt/v1/:operator/:debug</pre>

**Note:** raildigitraffic2gtfsrt is for internal use only-->

## Supported query parameters
| Parameter   | Type           | Description                                                  |
|-------------|----------------|--------------------------------------------------------------|
| `operator`  | pathParameter  | id of a operator, either `HSL` or `JOLI`                               |
| `debug`     | queryParameter | Print data in human readable format (for debugging purposes) |

## Examples

### Show currently active HSL real-time trip updates (debug mode)
> curl http://api.digitransit.fi/realtime/trip-updates/v1/HSL?debug

### Show currently active JOLI real-time trip updates (debug mode)
> curl http://api.digitransit.fi/realtime/trip-updates/v1/JOLI?debug

More GTFS-rt programming examples from [Google](https://developers.google.com/transit/gtfs-realtime/examples/code-samples).
