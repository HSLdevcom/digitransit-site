---
title: Trip updates
---

## API Documentation
Currently the service offers two GTFS-realtime data feeds filled with [trip updates](https://developers.google.com/transit/gtfs-realtime/guides/trip-updates), one for HSL data and one for JOLI data.

## Endpoints
<pre>http://api.digitransit.fi/realtime/trip-updates/v1/:operator</pre>
<pre>http://api.digitransit.fi/realtime/raildigitraffic2gtfsrt/v1/:operator/:debug</pre>

**Note:** raildigitraffic2gtfsrt is for internal use only

## Supported query parameters
| Parameter | Type           | Description                                                  |
|-----------|----------------|--------------------------------------------------------------|
| operator  | pathParameter  | Id of operator 'HSL' or 'JOLI'                               |
| debug     | queryParameter | Print data in human readable format (for debugging purposes) |

## Examples
* More GTFS-rt programming examples from [Google](https://developers.google.com/transit/gtfs-realtime/examples/code-samples).

### Retrieve and print currently active HSL trip updates (JavaScript)

<iframe height="700px" width="100%" src="https://repl.it/@mjaakko/RealtimeTripUpdates?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

### Show currently active HSL real-time trip updates (debug mode)
> curl http://api.digitransit.fi/realtime/trip-updates/v1/HSL?debug

### Show currently active JOLI real-time trip updates (debug mode)
> curl http://api.digitransit.fi/realtime/trip-updates/v1/JOLI?debug
