---
title: High frequency positioning
description:
  info: "Navigator server provides snapshot of the current real-time vehicle location data. Data is provided in two separate formats: json/SIRI and in custom json format."
  architecture: https://raw.githubusercontent.com/HSLdevcom/digitransit-site/master/pages/en/developers/apis/4-realtime-api/vehicle-positions/architecture.xml
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
---


The Navigator server connects to the HSL Live server (Real-time API of high frequency positioning) and consumes messages about vehicle
locations in real time. This information is stored in memory and provided to clients requesting it.

The provided information can be used to draw vehicles on a map.

## API Documentation

HSL provides an open API for publish-subscribe access to vehicle movements in real time. All vehicles should publish a message once per second, and apps can subscribe to receive the messages that are relevant to them based on mode of transport, route/line number, map region etc. The syntax that specifies a subscription and that filters the messages is the MQTT topic structure of the API.

The API definition is mostly stable, but the data still comes from old systems. The new passenger information system should be in production soon. This is why some data is currently missing and shown as "XXX". Also, messages are published once every 1 to 30 seconds, depending on the source systems.

### MQTT topic format

/hfp/journey/type/id/line/direction/headsign/start_time/next_stop/(geohash_level)/geohash/#

| Attribute       | Decription                                             |
|-----------------|--------------------------------------------------------|
| type            | One of bus, rail, subway, tram, ferry
| id              | Unique id of the vehicle
| line            | Unique id of the route/line
| direction       | One of 1 or 2
| headsign        | Destination name, e.g. Aviapolis
| start_time      | HHmm
| next_stop       | Unique id of the stop/station
| (geohash_level) | Significance of the change compared to previous message - which decimal place changed
| geohash         | Map tile coordinates, more decimals specifies a smaller tile

## Endpoint
<pre>http://api.digitransit.fi/realtime/vehicle-positions/v1/</pre>

## Response entity attributes

| Attribute  | Decription                                             |
|------------|--------------------------------------------------------|
| desi       | designation (route/line number as shown to passengers) |
| oday       | operating day (day of departure)                       |
| tsi        | timestamp in seconds                                   |
| tst        | timestamp in ISO8861 format                            |
| dl         | delay in seconds (s); difference to timetable          |
| lat, long  | coordinates                                            |
| hdg        | heading in degrees (⁰)                                 |
| odo        | odometer in meters                                     |
| spd        | speed in meters per second (m/s)                       |

## Examples

### Show last known positions for all trams in json format
> curl http://api.digitransit.fi/realtime/vehicle-positions/v1/hfp/journey/tram/#

### Retrieve the last known position for tram 9

First you will need to locate the vehicle identifier for the tram number 9. You can use [This app](http://htmlpreview.github.io/?https://gist.githubusercontent.com/siren/459db18bf4b128df0555/raw) to locate the identifier. The app reads the current information from the Digitransit GraphQL API and lets you filter through it.

After you have found out that the tram 9 has gtfsId of <strong>HSL:1009</strong> you can just skip the prefix (HSL:) and use the
id 1009 to construct the url:
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
[Show example in browser](http://htmlpreview.github.io/?https://gist.githubusercontent.com/siren/e77696cb5b7c9cd7095c/raw)

### Retrieve real-time updates in json/SIRI format
> curl http://api.digitransit.fi/realtime/vehicle-positions/v1/siriaccess/vm/json

### Subscribe to everything, the '+' sign is MQTT wildcard for one level of topic hierarchy
`mqtt sub -v -h mqtt.hsl.fi -p 1883 -t '/hfp/journey/+/+/+/+/+/+/+/+/+/#'`

### Subscribe to everything, the '#' sign is MQTT wildcard for any remaining levels of topic hierarchy
`mqtt sub -v -h mqtt.hsl.fi -p 1883 -t '/hfp/journey/#'`

### Subscribe to all trams
`mqtt sub -v -h mqtt.hsl.fi -p 1883 -t '/hfp/journey/tram/#'`

### Subscribe to bus line 611 (4611 == the "JORE" id of the bus line: disambiguation prefix (City of Vantaa is 4) + line number)
`mqtt sub -v -h mqtt.hsl.fi -p 1883 -t '/hfp/journey/bus/+/4611/#'`

**Response** (topic followed by payload):
`/hfp/journey/bus/a96ced26/4611/2/XXX/1343/4500206/60;24/29/68/94 {"VP":{"desi":"611","dir":"2","oper":"XXX","veh":"a96ced26","tst":"2016-02-09T12:06:03.962Z","tsi":1455019563,"spd":9.44,"lat":60.26992,"long":24.98478,"dl":16,"oday":"2016-02-09","jrn":"XXX","line":"XXX","start":"1343","source":"hsl helmi"}}`

### Subscribe to all movement within a geohash map tile (60.1xxx, 24.9xxx) "60;24/19"
The format of the geohash portion is lat0;long0/lat1long1/lat2long2/... [integer latitude];[integer longitude]/[first decimal of latitude][first decimal of longitude]/[second decimal of latitude][second decimal of longitude]/ etc. You can specify 0 to 3 decimal places.

`mqtt sub -v -h mqtt.hsl.fi -p 1883 -t '/hfp/journey/+/+/+/+/+/+/+/60;24/19/#'`

## Service dependencies
The Navigator server does not use any Digitransit data sources, it retrieves the data from the HSL Live server.

## Related open source projects and other useful urls

| URL                                                     | Description                                            |
|---------------------------------------------------------|--------------------------------------------------------|
| https://github.com/HSLdevcom/navigator-server           | HSL high frequency positioning development
| mqtt://mqtt.hsl.fi:1883/                                | HSL MQTT API URL, direct MQTT connection over TCP, very lightweight
| ws://mqtt.hsl.fi:1883/                                  | HSL MQTT API URL, MQTT connection on top of Websockets, works in web browsers
| https://www.npmjs.com/package/mqtt                      | MQTT CLIENT, javascript library and command line client
| https://github.com/PasiSalenius/LightMQTT               | Swift library
| http://dev.hsl.fi/tmp/mqtt/browser/                     | View source
| http://dev.hsl.fi/tmp/mqtt/map/                         | View map (Try changing the topic in the address bar)
| https://developers.google.com/transit/                  | Google transit community
| https://groups.google.com/forum/#!forum/gtfs-realtime   | Google transit forum
