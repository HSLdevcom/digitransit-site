---
title: Service alerts
description:
  info: The HSL Alerts API can be used to query real-time updates from the HSL fleet in GTFS-RT format.
---

## API Documentation
The hslalert service provides both GTFS-RT [service alerts](https://developers.google.com/transit/gtfs-realtime/guides/service-alerts) and [trip updates](https://developers.google.com/transit/gtfs-realtime/guides/trip-updates).

## Endpoint
> http://api.digitransit.fi/realtime/service-alerts/v1/

## Supported query parameters

| Parameter | Type           | Description                                              |
|-----------|----------------|----------------------------------------------------------|
| debug     | queryParameter | Print data in human readable format (for debug purposes) |  

## Examples

### Show currently active alerts with curl
> curl http://api.digitransit.fi/realtime/service-alerts/v1/?debug


### Retrieve and print currently active alerts with node.js app
``` javascript
var GtfsRealtimeBindings = require('gtfs-realtime-bindings');
var request = require('request');

var req = {
  url: 'http://api.digitransit.fi/realtime/service-alerts/v1/',
  encoding: null
};

request(req, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    var feed = GtfsRealtimeBindings.FeedMessage.decode(body);
    feed.entity.forEach(function(entity) {
      if (entity.alert) {
        console.log(JSON.stringify(entity.alert,null,2));
      }
    });
  }
```

More examples from [Google](https://developers.google.com/transit/gtfs-realtime/examples/code-samples).
