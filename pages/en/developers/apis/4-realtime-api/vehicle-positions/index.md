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



## API Documentation

HSL provides an open API for publish-subscribe access to vehicle movements in real time. All vehicles should publish a message once per second, and apps can subscribe to receive the messages that are relevant to them based on mode of transport, route/line number, map region etc. The syntax that specifies a subscription and that filters the messages is the MQTT topic structure of the API.

The API is currently available in MQTT format via a broker maintained by HSL. Everyone can subscribe directly to the broker, and there is no need for the older http service named `navigator-server`.

### MQTT topic format

/hfp/v1/journey/journey_type/trip_mode/operator_id/vehicle_id/line/direction/headsign/start_time/next_stop/(geohash_level)/geohash/#

| Attribute       | Decription                                             |
|-----------------|--------------------------------------------------------|
| prefix          | /hfp/v1/journey/ is the lowest level in the topic tree that is available for users
| journey_type    | Type of journey, `ongoing` or `upcoming`
| trip_mode       | One of bus, rail, subway, tram, ferry
| operator_id     | Unique id of the operator
| vehicle_id      | Unique id of the vehicle. This is the number that can be seen painted on the side of the vehicle
| line            | Unique id of the route/line
| direction       | One of 1 or 2
| headsign        | Destination name, e.g. Aviapolis
| start_time      | Scheduled start time of the trip, HH:mm
| next_stop       | Unique id of the next stop/station
| (geohash_level) | Significance of the change compared to previous message - which decimal place changed
| geohash         | Map tile coordinates, more decimals specifies a smaller tile

## Response entity attributes

| Attribute  | Decription                                             |
|------------|--------------------------------------------------------|
| start      | Scheduled start time of the trip, same as in the topic 
| line       | An internal line descriptor, not for external use 
| hdg        | Heading in degrees (⁰)                                 |
| spd        | Speed in meters per second (m/s)                       |
| tsi        | Timestamp in UNIX epoch                                   |
| tst        | Timestamp in ISO8861 format                            |
| veh        | Unique id of the vehicle, same as in the topic 
| oper       | Unique id the operator, same as in the topic 
| dir        | Direction of the trip the vehicle is on, same as in the topic 
| desi       | The line number visible to passengers, derived from the `line` attribute of the topic 
| lat        | Coordinates                                            |
| long       | Coordinates                                            |
| acc        | Acceleration (m/s^2), calculated from two previous messages 
| dl         | Delay in seconds (s) compared to timetable. Negative values are behind schedule, positive values ahead of schedule 
| odo        | Odometer reading in meters since the start of the trip
| drst       | Door status flag. 0 if doors are closed, 1 if any on the doors is open 
| oday       | Operating day of the trip. Usually cuts off at 4:29 in the morning, so that for late night trips the operating day is the previous calendar day
| jrn        | An internal trip descriptor, not for external use

## Examples

Below are sample subscriptions to the broker. The examples are for node-mqtt package. When installed globally (npm install mqtt -g) it can be used as a standalone CLI tool. Mosquitto (https://mosquitto.org/) is another free tool for trying out MQTT.

In general, the MQTT topic can be viewed as a tree, and the subscription is done to a certain level of the tree. MQTT supports two wildcards, "+" and "#". The "+" is used for single levels of the topic tree, allowing for any values for that specific parameter. The "#" is used at the end of the topic, allowing for any values for topic parameters lower in the topic tree. It needs to be used at the end of the subscrition if the subscribed topic is not a leaf of the topic tree. 

A more detailed introduction to MQTT can be found at https://www.hivemq.com/blog/mqtt-essentials-part-1-introducing-mqtt

##### Retrieve the last known position for tram 9

### Retrieve real-time updates in json/SIRI format
> curl http://api.digitransit.fi/realtime/vehicle-positions/v1/siriaccess/vm/json

### Subscribe to everything, the '+' sign is MQTT wildcard for one level of topic hierarchy
> `mqtt sub -v -h mqtt.hsl.fi -p 1883 -t '/hfp/journey/+/+/+/+/+/+/+/+/+/#'`

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
