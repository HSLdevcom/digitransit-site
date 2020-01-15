---
title: Service alerts
order: 20
replit:
  embeds:
    -
      title: "Show currently active alerts"
      url: https://repl.it/@digitransit/RealtimeServiceAlerts
      height: 700px
---

[[alert-warning]]
| **Note:** Service alerts API will be deprecated in the future in favor of [Disruption info](../../1-routing-api/disruption-info/) GraphQL API. This is part of an effort to reduce overlapping API functionalities and to concentrate APIs under the GraphQL APIs.<br/><br/>If you need service alerts in GTFS-RT format, see [HSL GTFS-RT API documentation](https://hsldevcom.github.io/gtfs_rt/)

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
