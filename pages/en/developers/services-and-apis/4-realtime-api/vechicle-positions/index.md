---
title: Vechicle positions
description:
  info: "Navigator server provides snapshot of current realtime vehicle location data. Data is provided in two separate formats: json/SIRI and in custom json format."
  architecture: https://raw.githubusercontent.com/HSLdevcom/digitransit-site/master/pages/en/developers/service-catalogue/internal-components/navigator-server/architecture.xml
docker:
  dockerfile: https://github.com/HSLdevcom/navigator-server/blob/master/Dockerfile
  imageName: hsldevcom/navigator-server
  buildScript: https://github.com/HSLdevcom/navigator-server/blob/master/build-docker-image.sh
  runContainer: docker run -d -p 8080:8080 hsldevcom/navigator-server
  accessContainer: http://localhost:8080/hfp/journey/tram/#
assets:
  source: https://github.com/HSLdevcom/navigator-server
  dockerHub: https://hub.docker.com/r/hsldevcom/navigator-server/
  Dockerfile: https://github.com/HSLdevcom/navigator-server/blob/master/Dockerfile
technologies:  
  "SIRI": "http://user47094.vs.easily.co.uk/siri/"
  "HSL-MQTT-API-draft": "https://digipalvelutehdas.hackpad.com/HSL-MQTT-API-draft"
---


Navigator server connects to HSL Live server (Realtime API of vehicle locations) and consumes messages about vehicle
locations in realtime. This information is stored in memory and provided to clients requesting for it.

The provided information can be used to draw vehicles on map. To draw realtime updates to the vehicle locations on map
one should subscribe to mgtt (see the HSL-MQTT-API-draft link in the technologies section).


## API Documentation
The api url structure follows the topic names in the HSL-MQTT-API-draft. See [HSL-MQTT-API-draft](https://digipalvelutehdas.hackpad.com/HSL-MQTT-API-draft) for more info.

## Endpoint
<pre>http://api.digitransit.fi/realtime/vehicle-positions/v1/</pre>

## Response entity attributes

| Attribute  | Decription                                             |
|------------|--------------------------------------------------------|
| desi       | designation (route/line number as shown to passengers) |
| oday       | operating day (day of departure)                       |
| tsi and tst| timestamp                                              |
| dl         | delay (difference to timetable)                        |
| lat, long  | coordinates                                            |
| hdg        | heading                                                |
| odo        | odometer                                               |
| spd        | speed                                                  |

## Examples

### Show last known positions for all trams in json format
> curl http://api.digitransit.fi/realtime/vehicle-positions/v1/hfp/journey/tram/#

### Retrieve the last known position for tram 9

First we need to locate the vehicle identifier for the tram number 9. You can use [This app](http://htmlpreview.github.io/?https://gist.githubusercontent.com/siren/459db18bf4b128df0555/raw)
locate the identifier. The app reads current information from digitransit graphql api and lets you filter through it.

Ok now that we found out that tram 9 had gtfsId of <strong>HSL:1009</strong> we can just skip the prefix (HSL:) and use this
id to construct the url based on the information on the HSL-MQTT-API-draft:
> curl http://api.digitransit.fi/realtime/vehicle-positions/v1/hfp/journey/+/+/1009/

### Display all tram 9s on map

```html
<!doctype html>
<html ng-app="tram-9">
  <head>
    <title>Map My Tram 9</title>
    <link rel="stylesheet" href="http://cdn.leafletjs.com/leaflet/v0.7.7/leaflet.css" />
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.0/angular.min.js"></script>
    <script src="http://cdn.leafletjs.com/leaflet/v0.7.7/leaflet.js"></script>
    <script>
      angular.module('locator',[]).controller('Ctrl',
        function ($scope, $http) {
          var map = L.map('map').setView([60.192059,24.945831], 11);
          L.tileLayer('http://api.digitransit.fi/map/v1/{id}/{z}/{x}/{y}.png', {
            maxZoom: 18,
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
              '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ',
            id: 'hsl-map'}).addTo(map);
          $http.get('http://api.digitransit.fi/realtime/vehicle-positions/v1/hfp/journey/+/+/1009/').then(function(data){
            Object.keys(data.data).forEach(function(id){
              var vehicle = data.data[id].VP;
              L.marker([vehicle.lat, vehicle.long]).addTo(map).bindPopup("<pre>" + angular.toJson(vehicle, true) + "</pre>");
            });
          }, console.err);
        });
    </script>
  </head>
  <body ng-controller="Ctrl">
    <div id="map" style="width: 800px; height: 600px"></div>
  </body>
</html>
```
[Show example on browser](http://htmlpreview.github.io/?https://gist.githubusercontent.com/siren/e77696cb5b7c9cd7095c/raw)


### Retrieve realtime updates in json/SIRI format
> curl http://api.digitransit.fi/realtime/vehicle-positions/v1/siriaccess/vm/json

## Service dependencies
Navigator-server does not use any digitransit data sources, it retrieves the data from HSL Live server

## Key service delivery activities
1. Keep up with HSL-MQTT-API<br/>
   https://digipalvelutehdas.hackpad.com/HSL-MQTT-API-draft
