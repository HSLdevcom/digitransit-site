---
title: Service alerts
replit:
  embeds:
    -
      title: "Show currently active alerts"
      url: https://repl.it/@digitransit/RealtimeServiceAlerts
      height: 700px
---

The HSL Alerts API can be used to query real-time updates from the HSL fleet in [GTFS-RT](https://developers.google.com/transit/gtfs-realtime/) format.
The API provides [service alerts](https://developers.google.com/transit/gtfs-realtime/guides/service-alerts) for disruptions (e.g. detours and significant delays) and [trip updates](https://developers.google.com/transit/gtfs-realtime/guides/trip-updates) for cancelled trips.

## Endpoint
`http://api.digitransit.fi/realtime/service-alerts/v1/`

### Supported URL parameters

| Parameter | Type            | Description                                              |
|-----------|-----------------|----------------------------------------------------------|
| debug     | query parameter | Print data in human readable format (for debug purposes) |  

## Examples
* More examples from [Google](https://developers.google.com/transit/gtfs-realtime/examples/code-samples).
 
### Show currently active alerts with curl
> curl http://api.digitransit.fi/realtime/service-alerts/v1/?debug
