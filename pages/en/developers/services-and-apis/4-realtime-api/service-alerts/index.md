---
title: Service alerts
description:
  info: HSL Alerts API can be used to query realtime updates about HSL fleet in GTFS-RT format.
  architecture: https://raw.githubusercontent.com/HSLdevcom/digitransit-site/master/pages/en/developers/service-catalogue/internal-components/hslalert/architecture.xml
assets:
  source: https://github.com/HSLdevcom/hslalert
  dockerHub: https://hub.docker.com/r/hsldevcom/hslalert/
  Dockerfile: https://github.com/HSLdevcom/hslalert/blob/master/Dockerfile
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

Service connects to Poikkeusinfo v3 xml interface (http://www.poikkeusinfo.fi/xml/v3),
reads this data, and converts it to GTFS-RT

## API Documentation
Hslalert service provides GTFS-RT [service alerts](
https://developers.google.com/transit/gtfs-realtime/service-alerts) and also [trip updates](https://developers.google.com/transit/gtfs-realtime/trip-updates).

## Endpoint
> http://api.digitransit.fi/realtime/service-alerts/v1/

Supported query parameters:
| Parameter | Type           | Description                                              |
|-----------|----------------|----------------------------------------------------------|
| debug     | queryParameter | Print data in human readable format (for debug purposes) |                                                                                  |

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

More examples from [Google](https://developers.google.com/transit/gtfs-realtime/code-samples).

## Service dependencies
No Digitransit related service dependencies. Reads data from http://www.poikkeusinfo.fi/xml/v3

## Key service delivery activities
1. Keep up with HSLAlerts upstream development (there probably won't happen much)
> https://github.com/samuelmr/hslalert
2. Follow Google transit community and its mailing lists (especially GTFS-RT):
> https://developers.google.com/transit/community?hl=en

> https://groups.google.com/forum/#!forum/gtfs-realtime
