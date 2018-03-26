---
title: High-frequency positioning
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
| trip_mode       | One of bus, tram or train. Subway and ferry are not supported yet.
| operator_id     | Unique id of the operator
| vehicle_id      | Unique id of the vehicle. This is the number that can be seen painted on the side of the vehicle.
| line            | Unique id of the route/line
| direction       | One of 1 or 2
| headsign        | Destination name, e.g. Aviapolis
| start_time      | Scheduled start time of the trip, HH:mm
| next_stop       | Unique id of the next stop/station
| (geohash_level) | The Geohash Level defines the change in the GeoHash values from the previous ones. The first part of the coordinates which has changed is the level. GeoHash level is 0 if there is no previous location. GeoHash level is also 0 if non-location parts of the topic (line, direction, headsign, start_time, next_stop, journey_type) change.
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

In general, the MQTT topic can be viewed as a tree, and the client subscribes to a certain level of the tree. MQTT supports two wildcards, "+" and "#". The "+" is used for single levels of the topic tree, allowing for any values for that specific parameter. The "#" is used at the end of the topic, allowing for any values for topic parameters lower in the topic tree. It needs to be used at the end of the subscrition if the subscribed topic is not a leaf of the topic tree. 

A more detailed introduction to MQTT can be found at https://www.hivemq.com/blog/mqtt-essentials-part-1-introducing-mqtt

Both MQTT clients support a `-v` flag, which prints the full topic for each response entity. This helps you figure out which values you can use for the different topic parameters.

##### Example subscriptions

Subscribe to everything, the '#' sign is MQTT wildcard for any remaining levels of topic hierarchy
> `mosquitto_sub -h mqtt.hsl.fi -v -t '/hfp/v1/journey/#'`

Subscribe to all trams
> `mosquitto_sub -h mqtt.hsl.fi -v -t '/hfp/v1/journey/ongoing/tram/#'`

Subscribe to bus line 551 (2551 == the "Jore" id of the bus line, please see the reference below)
> `mosquitto_sub -h mqtt.hsl.fi -v -t '/hfp/v1/journey/ongoing/bus/+/+/2551/#'`

Subscribe to all movement within a geohash map tile (60.1xxx, 24.9xxx) "60;24/19"
The format of the geohash portion is lat0;long0/lat1long1/lat2long2/... [integer latitude];[integer longitude]/[first decimal of latitude][first decimal of longitude]/[second decimal of latitude][second decimal of longitude]/ etc. You can specify 0 to 3 decimal places.

> `mosquitto_sub -h mqtt.hsl.fi -v -t '/hfp/v1/journey/+/+/+/+/+/+/+/+/+/+/60;24/19/#'`

##### Example response

With the -v flag the response contains the full topic for the reponse and the actual payload in JSON format.

> `/hfp/v1/journey/ongoing/bus/0012/01208/1077/2/Rautatientori/12:41/1385148/4/60;25/20/44/43 {"VP":{"desi":"77","dir":"2","oper":12,"veh":1208,"tst":"2018-03-02T10:48:54Z","tsi":1519987734,"spd":13.04,"hdg":247,"lat":60.244929,"long":25.043034,"acc":1.11,"dl":0,"odo":4559,"drst":0,"oday":"2018-03-02","jrn":300,"line":107,"start":"12:41"}}`

## Topic parameter reference

The route identifiers are formed with a leading city code and the actual route name. For example, route id 2551 is the route 551 with a city code of 2, and 9788K is 788K with a city code of 9. Full list of codes:

| Code      | Meaning                                     |
|-----------|---------------------------------------------|
| 1         | Helsinki
| 2         | Espoo, regional routes between Espoo and Helsinki
| 3         | Commuter trains
| 4         | Vantaa, regional routes between Vantaa and Helsinki
| 5         | Tangential lines
| 6         | Kirkkonummi and Siuntio
| 7         | "U-lines" - 3rd party bus lines where HSL tickets can be used. Generally no data available
| 8         | Unused
| 9         | Tuusula, Kerava and Sipoo

The numerical codes for different operators are listed below:

| Operator id   | Operator name                           |
|---------------|-----------------------------------------|
| 12             | Helsingin Bussiliikenne Oy
| 17             | Tammelundin Liikenne Oy
| 18             | Pohjolan Kaupunkiliikenne Oy
| 20             | Bus Travel Åbergin Linja Oy
| 21             | Bus Travel Oy Reissu Ruoti
| 22             | Nobina Finland Oy
| 36             | Nurmijärven Linja Oy
| 40             | HKL-Raitioliikenne
| 45             | Transdev Vantaa Oy
| 47             | Taksikuljetus Oy
| 54             | V-S Bussipalvelut Oy
| 59             | Tilausliikenne Nikkanen Oy
| 90             | VR Oy

## Related open source projects and other useful urls

| URL                                                     | Description                                            |
|---------------------------------------------------------|--------------------------------------------------------|
| mqtt://mqtt.hsl.fi:1883/                                | HSL MQTT API URL, direct MQTT connection over TCP, very lightweight
| ws://mqtt.hsl.fi:1883/                                  | HSL MQTT API URL, MQTT connection on top of Websockets, works in web browsers
| https://www.npmjs.com/package/mqtt                      | MQTT CLIENT, javascript library and command line client
| https://github.com/PasiSalenius/LightMQTT               | Swift library
| http://dev.hsl.fi/tmp/mqtt/browser/                     | View source
| http://dev.hsl.fi/tmp/mqtt/map/                         | View map (Try changing the topic in the address bar)
| https://developers.google.com/transit/                  | Google transit community
| https://groups.google.com/forum/#!forum/gtfs-realtime   | Google transit forum
