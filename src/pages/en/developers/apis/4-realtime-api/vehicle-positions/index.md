---
title: HFP 1.0
order: 50
toc: true
description:
  info: The open HFP API can be used to subscribe to vehicle movements in soft real time.
  architecture: https://raw.githubusercontent.com/HSLdevcom/digitransit-site/master/pages/en/developers/apis/4-realtime-api/vehicle-positions/architecture.xml
replit:
  embeds:
    - title: "MQTT.js"
      description: The example below uses MQTT.js library to listen to updates from all vehicles currently on route. See command line examples for other possible topics to try.
      url: https://repl.it/@digitransit/VehiclePositionsMQTT
      height: 800px
---

[[alert-warning]]
| **Note:** HFP 1.0 is deprecated and vehicles will stop sending HFP 1.0 messages in the future. Please migrate to [HFP 2.0](../vehicle-positions-2) if you're using HFP 1.0.

Most of the vehicles in the HSL area should publish their status, including their position, once per second.
The devices of the end users, e.g. smartphones, may subscribe to receive the relevant messages based on their context, e.g. filtered on the mode of transport, the route ID, the geographical region etc.
The subscription scope is specified by the MQTT topic structure of the API.

## Quickstart

Try this example to get an quick idea of what kind of data is available from the API:

1. Install [MQTT.js](https://github.com/mqttjs/MQTT.js) command line tools:

```bash
npm install -g mqtt
```

2. Use MQTT.js to subscribe to HFP messages:

```bash
mqtt subscribe -h mqtt.hsl.fi -p 8883 -l mqtts -v -t "/hfp/v1/journey/#"
```

(or try [this example](https://repl.it/@digitransit/VehiclePositionsMQTTrawJSON) if you don't want to install anything)

## API endpoints

| URL                         | Description                                                                                                            |
| --------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `mqtts://mqtt.hsl.fi:8883/` | The bare MQTT protocol with TLS, lightweight.                                                                          |
| `wss://mqtt.hsl.fi:443/`    | MQTT over WebSockets with TLS, for browsers.                                                                           |
| `mqtt://mqtt.hsl.fi:1883/`  | The bare MQTT protocol without TLS, lightweight. Prefer the port 8883 to respect the locational privacy of your users. |
| `ws://mqtt.hsl.fi:1883/`    | MQTT over WebSockets without TLS. Prefer the port 443 to respect the locational privacy of your users.                 |

## Message format

From a client's point of view, every MQTT message has two parts, the topic and the binary payload.

### The topic

The topic looks similar to a file path with levels separated by `/`.
When subscribing, all values for a level or several levels may be specified with a wildcard.
`+` refers to all values for one level, `#` refers to all values of the parent level and its child levels.
See the advanced examples [further below](#examples) on how to tailor the subscription to your needs.

Here is an example of an HFP message topic:

```
/hfp/v1/journey/ongoing/bus/0022/00869/2118B/2/Tapiola (M)/16:23/2241237/5/60;24/17/84/15
```

It can be split into these parts:

```
<prefix><version>/journey/<temporal_type>/<transport_mode>/<operator_id>/<vehicle_number>/<route_id>/<direction_id>/<headsign>/<start_time>/<next_stop>/<geohash_level>/<geohash>/#
```

| Attribute        | Decription                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `prefix`         | `/hfp/` is the root of the topic tree.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `version`        | `v1` is the current version of the HFP topic and the payload format.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `temporal_type`  | The type of the journey, `ongoing` or `upcoming`. `ongoing` describes the current situation. `upcoming` refers to the next expected journey of the same vehicle. `upcoming` messages are broadcasted shortly before the start of the next journey. One use of `upcoming` is to show the relevant vehicle to your users even before the driver has signed on to the journey that your users are interested in. `upcoming` is not working properly yet, though.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `transport_mode` | The type of the vehicle. One of `bus`, `tram` or `train`. The metro, the ferries and the U-line busses are not supported.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `operator_id`    | The unique ID of the operator that _owns_ the vehicle. See the list of operators below.<br/>**Note:** Operator ids must be exactly 4 digits long in the topic filter, so prefix them with zeroes if needed (e.g. `80` → `0080`)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `vehicle_number` | The vehicle number that can be seen painted on the side of the vehicle, often next to the front door. Different operators may use overlapping vehicle numbers. `operator_id/vehicle_number` uniquely identifies the vehicle.<br/>**Note:** Vehicle numbers must be exactly 5 digits long in the topic filter, so prefix them with zeroes if needed.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `route_id`       | The ID of the route the vehicle is running on. This matches `route_id` in GTFS (field `gtfsId` of `Route` in [the routing API](../../1-routing-api/)). Due to a bug some rare "number variants" do not match GTFS properly. We are working on it.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `direction_id`   | The line direction of the trip, either `1` or `2`.<br/>**Note:** This does not exactly match `direction_id` in GTFS or the routing API.<br/>Value `1` here is same as `0` in GTFS and the Routing API.<br/>Value `2` here is same as `1` in GTFS and the Routing API.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `headsign`       | The destination name, e.g. `Aviapolis`. **Note:** This does NOT match `trip_headsign` in GTFS exactly.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `start_time`     | The scheduled start time of the trip, i.e. the scheduled departure time from the first stop of the trip. The format follows `%H:%M` in 24-hour local time, not the 30-hour overlapping operating days present in GTFS.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `next_stop`      | The next stop or station. Updated on each departure from or passing of a stop. `EOL` (end of line) after final stop. Matches `stop_id` in GTFS (field `gtfsId` of `Stop` in the routing API).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `geohash_level`  | The geohash level represents the magnitude of change in the GPS coordinates since the previous message from the same vehicle. More exactly, `geohash_level` is equal to the minimum of the digit positions of the most significant changed digit in [the latitude and the longitude](#payload) since the previous message. For example, if the previous message has value (60.12345, 25.12345) for (`lat`, `long`) and the current message has value (60.12499, 25.12388), then the third digit of the fractional part is the most significant changed digit and `geohash_level` has value `3`.<br/>However, `geohash_level` value `0` is overloaded. `geohash_level` is `0` if:<ul><li>the integer part of the latitude or the longitude has changed,</li><li>the previous or the current message has `null` for coordinates or</li><li>the non-location parts of the topic have changed, e.g. when a bus departs from a stop.</li></ul>By subscribing to specific geohash levels, you can reduce the amount of traffic into the client. By only subscribing to level `0` the client gets the most important status changes. The rough percentages of messages with a specific `geohash_level` value out of all `ongoing` messages are:<ul><li>`0`: 3 %</li><li>`1`: 0.09 %</li><li>`2`: 0.9 %</li><li>`3`: 8 %</li><li>`4`: 43 %</li><li>`5`: 44 %</li></ul> |
| `geohash`        | The latitude and the longitude of the vehicle. The digits of the integer parts are separated into their own level in the format `<lat>;<long>`, e.g. `60;24`. The digits of the fractional parts are split and interleaved into a custom format so that e.g. (60.123, 24.789) becomes `60;24/17/28/39`. This format enables subscribing to specific geographic boundaries easily.<br/>If the coordinates are missing, `geohash_level` and `geohash` have the concatenated value `0////`.<br/>Currently only 3 digits of the fractional part are published in the topic for both the latitude and the longitude even though `geohash_level` currently has precision up to 5 digits of the fractional part. As a form of future proofing your subscriptions, do not rely on the amount of fractional digits present in the topic. Instead, use the wildcard `#` at the end of topic filters.<br/>This geohash scheme is greatly simplified from [the original geohash scheme](https://en.wikipedia.org/wiki/Geohash).                                                                                                                                                                                                                                                                                                                                            |

### The payload

The payload is an UTF-8-encoded, compact JSON string. Here is an example:

```json
{
  "VP": {
    "desi": "81",
    "dir": "2",
    "oper": 22,
    "veh": 792,
    "tst": "2018-04-05T17:38:36Z",
    "tsi": 1522949916,
    "spd": 0.16,
    "hdg": 225,
    "lat": 60.194481,
    "long": 25.03095,
    "acc": 0,
    "dl": -25,
    "odo": 2819,
    "drst": 0,
    "oday": "2018-04-05",
    "jrn": 636,
    "line": 112,
    "start": "20:25"
  }
}
```

which prettyprints to:

```json
{
  "VP": {
    "desi": "81",
    "dir": "2",
    "oper": 22,
    "veh": 792,
    "tst": "2018-04-05T17:38:36Z",
    "tsi": 1522949916,
    "spd": 0.16,
    "hdg": 225,
    "lat": 60.194481,
    "long": 25.03095,
    "acc": 0,
    "dl": -25,
    "odo": 2819,
    "drst": 0,
    "oday": "2018-04-05",
    "jrn": 636,
    "line": 112,
    "start": "20:25"
  }
}
```

`VP` is a fixed key and refers to Vehicle Position but not to GTFS Realtime. The changing fields are described below:

| Attribute | Type                  | Description                                                                                                                                                                                                                                                                             |
| --------- | --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `desi`    | String                | Route number visible to passengers.                                                                                                                                                                                                                                                     |
| `dir`     | String                | Route direction of the trip. After type conversion matches `direction_id` in GTFS and the topic. Either `"1"` or `"2"`.                                                                                                                                                                 |
| `oper`    | Integer               | Unique ID of the operator _running_ the trip. The unique ID does not have prefix zeroes here.                                                                                                                                                                                           |
| `veh`     | Integer               | Vehicle number that can be seen painted on the side of the vehicle, often next to the front door. Different operators may use overlapping vehicle numbers. Matches `vehicle_number` in the topic except without the prefix zeroes.                                                      |
| `tst`     | String                | UTC timestamp from the vehicle in ISO 8601 format as output by `date --utc "+%Y-%m-%dT%H:%M:%SZ"`.                                                                                                                                                                                      |
| `tsi`     | Integer               | Unix time in seconds, matching `tst`.                                                                                                                                                                                                                                                   |
| `spd`     | Floating-point number | Speed of the vehicle, in meters per second (m/s).                                                                                                                                                                                                                                       |
| `hdg`     | Integer               | Heading of the vehicle, in degrees (⁰) starting clockwise from geographic north. Valid values are on the closed interval [0, 360].                                                                                                                                                      |
| `lat`     | Floating-point number | WGS 84 latitude in degrees. `null` if there is no GPS fix.                                                                                                                                                                                                                              |
| `long`    | Floating-point number | WGS 84 longitude in degrees. `null` if there is no GPS fix.                                                                                                                                                                                                                             |
| `acc`     | Floating-point number | Acceleration (m/s^2), calculated from the speed on this and the previous message. Negative values indicate that the speed of the vehicle is decreasing.                                                                                                                                 |
| `dl`      | Integer               | Offset from the scheduled timetable in seconds (s). Negative values indicate lagging behind the schedule, positive values running ahead of schedule.                                                                                                                                    |
| `odo`     | Integer               | The odometer reading in meters (m) since the start of the trip. Currently the values not very reliable.                                                                                                                                                                                 |
| `drst`    | Integer               | Door status. `0` if all the doors are closed, `1` if any of the doors are open.                                                                                                                                                                                                         |
| `oday`    | String                | Operating day of the trip. The exact time when an operating day ends depends on the route. For most routes, the operating day ends at 4:30 AM on the next day. In that case, for example, the final moment of the operating day `"2018-04-05"` would be at 2018-04-06T04:30 local time. |
| `jrn`     | Integer               | Internal journey descriptor, not meant to be useful for external use.                                                                                                                                                                                                                   |
| `line`    | Integer               | Internal line descriptor, not meant to be useful for external use.                                                                                                                                                                                                                      |
| `start`   | String                | Scheduled start time of the trip, i.e. the scheduled departure time from the first stop of the trip. The format follows `%H:%M` in 24-hour local time, not the 30-hour overlapping operating days present in GTFS. Matches `start_time` in the topic.                                   |

### Operators

The numerical values for the different transit operators are listed below:

| `oper` | Operator name                 |
| ------ | ----------------------------- |
| `6`    | Oy Pohjolan Liikenne Ab       |
| `12`   | Helsingin Bussiliikenne Oy    |
| `17`   | Tammelundin Liikenne Oy       |
| `18`   | Pohjolan Kaupunkiliikenne Oy  |
| `20`   | Bus Travel Åbergin Linja Oy   |
| `21`   | Bus Travel Oy Reissu Ruoti    | 
| `22`   | Nobina Finland Oy             |
| `30`   | Savonlinja Oy                 |
| `36`   | Nurmijärven Linja Oy          |
| `40`   | HKL-Raitioliikenne            |
| `45`   | Transdev Vantaa Oy            |
| `47`   | Taksikuljetus Oy              |
| `51`   | Korsisaari Oy                 |
| `54`   | V-S Bussipalvelut Oy          |
| `55`   | Transdev Helsinki Oy          |
| `58`   | Koillisen Liikennepalvelut Oy |
| `59`   | Tilausliikenne Nikkanen Oy    |
| `90`   | VR Oy                         |

Note that in some cases (for example if the public transport service has been subcontracted to another operator) the operator code might be different in MQTT topic than the one in vehicle position message.

## Examples

### Topics

The HFP topic format forms a tree.
By combining wildcards with several topic filters in one MQTT `SUBSCRIBE` packet you can carve quite interesting subsets of the tree to serve different use cases.
As the MQTT broker handles the resolving of the topic filters, handling messages for complicated subscriptions does not have inherent overhead in the client compared to simple subscriptions.
Go hog wild.

### Command line

Below are sample subscriptions utilizing [MQTT.js](https://github.com/mqttjs/MQTT.js) command line tools.  
MQTT.js command line tools can be installed with:

```bash
npm install -g mqtt
```

If you insist on using [mosquitto](https://mosquitto.org/), try this for TLS access:

```bash
mosquitto_sub --capath "/etc/ssl/certs/" -h mqtt.hsl.fi -p 8883 -v -t "/hfp/v1/journey/#"
```

#### A situational overview

To get just the most significant status updates, use:

```bash
mqtt subscribe -h mqtt.hsl.fi -l mqtts -p 8883 -v \
  -t "/hfp/v1/journey/ongoing/+/+/+/+/+/+/+/+/0/#"
```

#### A line in one direction

To subscribe to all vehicles currently on the line 551 (`route_short_name` in GTFS) going in direction 1, subscribe to the corresponding `route_id` 2551:

```bash
mqtt subscribe -h mqtt.hsl.fi -l mqtts -p 8883 -v \
  -t "/hfp/v1/journey/ongoing/+/+/+/2551/1/#"
```

#### All trams

Subscribe to all trams with:

```bash
mqtt subscribe -h mqtt.hsl.fi -l mqtts -p 8883 -v \
  -t "/hfp/v1/journey/ongoing/tram/#"
```

#### A certain trip

Subscribe to messages of a certain trip, even slightly before the driver has signed onto the trip:

```bash
mqtt subscribe -h mqtt.hsl.fi -l mqtts -p 8883 -v \
  -t "/hfp/v1/journey/+/+/+/+/9975/1/+/12:15/#"
```

Or if your users would find it confusing to see a vehicle going in the wrong direction, subscribe to the `ongoing` messages only:

```bash
mqtt subscribe -h mqtt.hsl.fi -l mqtts -p 8883 -v \
  -t "/hfp/v1/journey/ongoing/+/+/+/9975/1/+/12:15/#"
```

#### A bounding box

- See [this example](https://gist.github.com/mjaakko/f148be987734fdb9f7f8e71458516571) on how to generate topic filters for a bounding box

Let's assume that you wish to subscribe to all action inside the following [GeoJSON](http://geojson.io) Polygon:

```json
{
  "type": "Feature",
  "geometry": {
    "type": "Polygon",
    "coordinates": [
      [
        [24.9578905105, 60.1836538254],
        [24.9646711349, 60.1836538254],
        [24.9646711349, 60.1894146967],
        [24.9578905105, 60.1894146967],
        [24.9578905105, 60.1836538254]
      ]
    ]
  }
}
```

The box bounded by the latitude interval [60.18, 60.19[ and the longitude interval [24.95, 24.97[ corresponds with the following HFP subscription:

```bash
mqtt subscribe -h mqtt.hsl.fi -l mqtts -p 8883 -v \
  -t "/hfp/v1/journey/ongoing/+/+/+/+/+/+/+/+/+/60;24/19/85/#" \
  -t "/hfp/v1/journey/ongoing/+/+/+/+/+/+/+/+/+/60;24/19/86/#"
```

For the precision of one more digit of latitude and longitude, one would need 56 topic filters for the bounding box:

```bash
mqtt subscribe -h mqtt.hsl.fi -l mqtts -p 8883 -v \
  -t "/hfp/v1/journey/ongoing/+/+/+/+/+/+/+/+/+/60;24/19/85/37/#" \
  -t "/hfp/v1/journey/ongoing/+/+/+/+/+/+/+/+/+/60;24/19/85/38/#" \
  -t "/hfp/v1/journey/ongoing/+/+/+/+/+/+/+/+/+/60;24/19/85/39/#" \
  -t "/hfp/v1/journey/ongoing/+/+/+/+/+/+/+/+/+/60;24/19/86/30/#" \
  -t "/hfp/v1/journey/ongoing/+/+/+/+/+/+/+/+/+/60;24/19/86/31/#" \
  -t "/hfp/v1/journey/ongoing/+/+/+/+/+/+/+/+/+/60;24/19/86/32/#" \
  -t "/hfp/v1/journey/ongoing/+/+/+/+/+/+/+/+/+/60;24/19/86/33/#" \
  -t "/hfp/v1/journey/ongoing/+/+/+/+/+/+/+/+/+/60;24/19/86/34/#" \
  \
  -t "/hfp/v1/journey/ongoing/+/+/+/+/+/+/+/+/+/60;24/19/85/47/#" \
  -t "/hfp/v1/journey/ongoing/+/+/+/+/+/+/+/+/+/60;24/19/85/48/#" \
  -t "/hfp/v1/journey/ongoing/+/+/+/+/+/+/+/+/+/60;24/19/85/49/#" \
  -t "/hfp/v1/journey/ongoing/+/+/+/+/+/+/+/+/+/60;24/19/86/40/#" \
  -t "/hfp/v1/journey/ongoing/+/+/+/+/+/+/+/+/+/60;24/19/86/41/#" \
  -t "/hfp/v1/journey/ongoing/+/+/+/+/+/+/+/+/+/60;24/19/86/42/#" \
  -t "/hfp/v1/journey/ongoing/+/+/+/+/+/+/+/+/+/60;24/19/86/43/#" \
  -t "/hfp/v1/journey/ongoing/+/+/+/+/+/+/+/+/+/60;24/19/86/44/#" \
  \
  -t "/hfp/v1/journey/ongoing/+/+/+/+/+/+/+/+/+/60;24/19/85/57/#" \
  -t "/hfp/v1/journey/ongoing/+/+/+/+/+/+/+/+/+/60;24/19/85/58/#" \
  -t "/hfp/v1/journey/ongoing/+/+/+/+/+/+/+/+/+/60;24/19/85/59/#" \
  -t "/hfp/v1/journey/ongoing/+/+/+/+/+/+/+/+/+/60;24/19/86/50/#" \
  -t "/hfp/v1/journey/ongoing/+/+/+/+/+/+/+/+/+/60;24/19/86/51/#" \
  -t "/hfp/v1/journey/ongoing/+/+/+/+/+/+/+/+/+/60;24/19/86/52/#" \
  -t "/hfp/v1/journey/ongoing/+/+/+/+/+/+/+/+/+/60;24/19/86/53/#" \
  -t "/hfp/v1/journey/ongoing/+/+/+/+/+/+/+/+/+/60;24/19/86/54/#" \
  \
  -t "/hfp/v1/journey/ongoing/+/+/+/+/+/+/+/+/+/60;24/19/85/67/#" \
  -t "/hfp/v1/journey/ongoing/+/+/+/+/+/+/+/+/+/60;24/19/85/68/#" \
  -t "/hfp/v1/journey/ongoing/+/+/+/+/+/+/+/+/+/60;24/19/85/69/#" \
  -t "/hfp/v1/journey/ongoing/+/+/+/+/+/+/+/+/+/60;24/19/86/60/#" \
  -t "/hfp/v1/journey/ongoing/+/+/+/+/+/+/+/+/+/60;24/19/86/61/#" \
  -t "/hfp/v1/journey/ongoing/+/+/+/+/+/+/+/+/+/60;24/19/86/62/#" \
  -t "/hfp/v1/journey/ongoing/+/+/+/+/+/+/+/+/+/60;24/19/86/63/#" \
  -t "/hfp/v1/journey/ongoing/+/+/+/+/+/+/+/+/+/60;24/19/86/64/#" \
  \
  -t "/hfp/v1/journey/ongoing/+/+/+/+/+/+/+/+/+/60;24/19/85/77/#" \
  -t "/hfp/v1/journey/ongoing/+/+/+/+/+/+/+/+/+/60;24/19/85/78/#" \
  -t "/hfp/v1/journey/ongoing/+/+/+/+/+/+/+/+/+/60;24/19/85/79/#" \
  -t "/hfp/v1/journey/ongoing/+/+/+/+/+/+/+/+/+/60;24/19/86/70/#" \
  -t "/hfp/v1/journey/ongoing/+/+/+/+/+/+/+/+/+/60;24/19/86/71/#" \
  -t "/hfp/v1/journey/ongoing/+/+/+/+/+/+/+/+/+/60;24/19/86/72/#" \
  -t "/hfp/v1/journey/ongoing/+/+/+/+/+/+/+/+/+/60;24/19/86/73/#" \
  -t "/hfp/v1/journey/ongoing/+/+/+/+/+/+/+/+/+/60;24/19/86/74/#" \
  \
  -t "/hfp/v1/journey/ongoing/+/+/+/+/+/+/+/+/+/60;24/19/85/87/#" \
  -t "/hfp/v1/journey/ongoing/+/+/+/+/+/+/+/+/+/60;24/19/85/88/#" \
  -t "/hfp/v1/journey/ongoing/+/+/+/+/+/+/+/+/+/60;24/19/85/89/#" \
  -t "/hfp/v1/journey/ongoing/+/+/+/+/+/+/+/+/+/60;24/19/86/80/#" \
  -t "/hfp/v1/journey/ongoing/+/+/+/+/+/+/+/+/+/60;24/19/86/81/#" \
  -t "/hfp/v1/journey/ongoing/+/+/+/+/+/+/+/+/+/60;24/19/86/82/#" \
  -t "/hfp/v1/journey/ongoing/+/+/+/+/+/+/+/+/+/60;24/19/86/83/#" \
  -t "/hfp/v1/journey/ongoing/+/+/+/+/+/+/+/+/+/60;24/19/86/84/#" \
  \
  -t "/hfp/v1/journey/ongoing/+/+/+/+/+/+/+/+/+/60;24/19/85/97/#" \
  -t "/hfp/v1/journey/ongoing/+/+/+/+/+/+/+/+/+/60;24/19/85/98/#" \
  -t "/hfp/v1/journey/ongoing/+/+/+/+/+/+/+/+/+/60;24/19/85/99/#" \
  -t "/hfp/v1/journey/ongoing/+/+/+/+/+/+/+/+/+/60;24/19/86/90/#" \
  -t "/hfp/v1/journey/ongoing/+/+/+/+/+/+/+/+/+/60;24/19/86/91/#" \
  -t "/hfp/v1/journey/ongoing/+/+/+/+/+/+/+/+/+/60;24/19/86/92/#" \
  -t "/hfp/v1/journey/ongoing/+/+/+/+/+/+/+/+/+/60;24/19/86/93/#" \
  -t "/hfp/v1/journey/ongoing/+/+/+/+/+/+/+/+/+/60;24/19/86/94/#"
```

There is no need to restrict yourself to just one rectangle like above, though.

For example, you could try to generate an HFP subscription for all `ongoing` vehicles in the minimal geographic area encompassing the Kontula borough with the precision of two digits in the fractional part.

### Querying a trip corresponding to a vehicle position

The Routing API can be used to query a trip correspoding to a vehicle position message.
<br/>See [this example](../../1-routing-api/routes/#fuzzytrip) on how to check if a vehicle is wheelchair accessible.

## Demos

- [MQTT demo map](https://vehiclepositionsmapdemo--digitransit.repl.co/), displays vehicle positions from a specific topic on a map _[(source code)](https://repl.it/@digitransit/VehiclePositionsMapDemo)_

## Further reading

- The [MQTT Essentials](https://www.hivemq.com/blog/mqtt-essentials-part-1-introducing-mqtt) series introduces the MQTT protocol in more detail.
- [LightMQTT](https://github.com/PasiSalenius/LightMQTT) is an MQTT client library written in Swift by one of the developers in the HSL developer community.
