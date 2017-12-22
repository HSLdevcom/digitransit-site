---
title: Service alerts
description:
  info: The HSL Alerts API can be used to query real-time updates from the HSL fleet in GTFS-RT format.
  architecture: https://raw.githubusercontent.com/HSLdevcom/digitransit-site/master/pages/en/developers/apis/4-realtime-api/service-alerts/architecture.xml
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

The service connects to the Poikkeusinfo v3 XML interface (http://www.poikkeusinfo.fi/xml/v3),
reads this data, and converts it to GTFS-RT

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

## Service dependencies
No Digitransit related service dependencies. Reads data from http://www.poikkeusinfo.fi/xml/v3

## Related open source projects

| URL                | Project description                                          |
|--------------------|--------------------------------------------------------------|
| https://github.com/samuelmr/hslalert                 | HSLAlerts upstream development (there probably won't happen much) 
| https://developers.google.com/transit/                | Google transit community (especially GTFS-RT)
| https://groups.google.com/forum/#!forum/gtfs-realtime | Google transit forum
