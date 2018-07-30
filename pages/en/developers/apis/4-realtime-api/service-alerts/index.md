---
title: Service alerts
replit:
  "Show currently active alerts":
    url: https://repl.it/@mjaakko/RealtimeServiceAlerts
    height: 700px
---

The HSL Alerts API can be used to query real-time updates from the HSL fleet in GTFS-RT format.

## API Documentation
The hslalert service provides both GTFS-RT [service alerts](https://developers.google.com/transit/gtfs-realtime/guides/service-alerts) and [trip updates](https://developers.google.com/transit/gtfs-realtime/guides/trip-updates).

## Endpoint
> http://api.digitransit.fi/realtime/service-alerts/v1/

## Supported query parameters

| Parameter | Type           | Description                                              |
|-----------|----------------|----------------------------------------------------------|
| debug     | queryParameter | Print data in human readable format (for debug purposes) |  

## Examples
* More examples from [Google](https://developers.google.com/transit/gtfs-realtime/examples/code-samples).
 
### Show currently active alerts with curl
> curl http://api.digitransit.fi/realtime/service-alerts/v1/?debug
