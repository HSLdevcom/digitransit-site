---
title: Digitransit MQTT broker
order: 10
---

## Available endpoints

The URL of the MQTT broker is mqtt.digitransit.fi. It has support for the protocols (using standard port numbers) listed below:

| Protocol                             | Port |
|--------------------------------------|------|
| MQTT with TLS (mqtts://)             | 8883 |
| MQTT       (mqtt://)                 | 1883 |
| MQTT over secure web socket (wss://) | 433  |

## Topic Structure

```
/<feed_format>/<type>/<feed_id>/<agency_id>/<agency_name>/<mode>/<route_id>/<direction_id>/<trip_headsign>/<trip_id>/<next_stop>/<start_time>/<vehicle_id>/<geohash_head>/<geohash_firstdeg>/<geohash_seconddeg>/<geohash_thirddeg>/<short_name>/<color>/
```

| Topic level       | Description                                           | Possible values |
|-------------------|-------------------------------------------------------|-----------------|
| feed_format       | Feed format                                           | gtfsrt |
| type              | Type of the feed                                      | vp |
| feed_id           | GTFS feed ID                                          | [Listed here](#available-cities-and-regions) |
| agency_id         | GTFS agency ID                                        | Not implemented yet but will be any string or empty |
| agency_name       | GTFS agency name                                      | Not implemented yet but will be any string or empty |
| mode              | Transport mode                                        | BUS, FERRY, FUNICULAR, RAIL, TRAM or empty (there might be more possible values in the future) |
| route_id          | GTFS route ID                                         | Any string or empty |
| direction_id      | GTFS direction ID                                     | 0, 1 or empty |
| trip_headsign     | GTFS trip headsign                                    | Any string or empty |
| trip_id           | GTFS trip ID                                          | Any string or empty |
| next_stop         | Next (or current) stop ID                             | Any string or empty |
| start_time        | The scheduled start time of the trip                  | can be 25:30 for example, or empty |
| vehicle_id        | GTFS vehicle ID                                       | Any string or empty |
| geohash_head      | [The whole numbers of a simplified geohash](#geohash) | lat;lon, for example `60;24` |
| geohash_firstdeg  | [The first decimal place from lat and lon](#geohash)  | latlon, for example `17` |
| geohash_seconddeg | [The second decimal place from lat and lon](#geohash) | latlon, for example `28` |
| geohash_thirddeg  | [The third decimal place from lat and lon](#geohash)  | latlon, for example `39` |
| short_name        | Short name of the route                               | Any string or empty |
| color             | Color of the route                                    | A color encoded as a six-digit hexadecimal number (the leading "#" is not included) such as `FFFFFF` or empty |

## Message Structure

The messages are protobuf encoded GTFS realtime messages each containing information about one vehicle. There might be small differences in what data is included in a message depending on the feed ID as the data comes from different systems. [Here are some examples on how to decode the GTFS realtime data in code.](https://developers.google.com/transit/gtfs-realtime/examples/code-samples)

## Available cities and regions

This list contains cities or regions for which there is vehicle position data available through the MQTT broker. The listed feed IDs match the ones used in the topic structure. To fetch more relevant information about, for example, the vehicles' trips, one can use the listed GTFS data or the routing endpoint ([which are documented here](../../../1-routing-api/)). <b>Note, [subscription keys](../../../../api-registration/) need to used when downloading GTFS data</b>.

<b>This is list might not always be up-to-date and new data sources are constantly included.</b>

| City/region  | Feed ID and link to GTFS URL | Routing endpoint |
|---|---|----|
| Tampere        | [tampere](https://api.digitransit.fi/routing-data/v3/waltti/tampere-gtfs.zip)           | [waltti](https://api.digitransit.fi/routing/v2/waltti/gtfs/v1)
| Jyväskylä      | [LINKKI](https://api.digitransit.fi/routing-data/v3/waltti/LINKKI-gtfs.zip)             | [waltti](https://api.digitransit.fi/routing/v2/waltti/gtfs/v1)
| Lappeenranta   | [Lappeenranta](https://api.digitransit.fi/routing-data/v3/waltti/Lappeenranta-gtfs.zip) | [waltti](https://api.digitransit.fi/routing/v2/waltti/gtfs/v1)
| Joensuu        | [Joensuu](https://api.digitransit.fi/routing-data/v3/waltti/Joensuu-gtfs.zip)           | [waltti](https://api.digitransit.fi/routing/v2/waltti/gtfs/v1)
| Kuopio         | [Kuopio](https://api.digitransit.fi/routing-data/v3/waltti/Kuopio-gtfs.zip)             | [waltti](https://api.digitransit.fi/routing/v2/waltti/gtfs/v1)
| Turku          | [FOLI](https://api.digitransit.fi/routing-data/v3/waltti/FOLI-gtfs.zip)                 | [waltti](https://api.digitransit.fi/routing/v2/waltti/gtfs/v1)
| Oulu           | [OULU](https://api.digitransit.fi/routing-data/v3/waltti/OULU-gtfs.zip)                 | [waltti](https://api.digitransit.fi/routing/v2/waltti/gtfs/v1)
| Hämeenlinna    | [Hameenlinna](https://api.digitransit.fi/routing-data/v3/waltti/Hameenlinna-gtfs.zip)   | [waltti](https://api.digitransit.fi/routing/v2/waltti/gtfs/v1)
| Lahti          | [Lahti](https://api.digitransit.fi/routing-data/v3/waltti/Lahti-gtfs.zip)               | [waltti](https://api.digitransit.fi/routing/v2/waltti/gtfs/v1)
| Vaasa          | [Vaasa](https://api.digitransit.fi/routing-data/v3/waltti/Vaasa-gtfs.zip)               | [waltti](https://api.digitransit.fi/routing/v2/waltti/gtfs/v1)
| Mikkeli        | [Mikkeli](https://api.digitransit.fi/routing-data/v3/waltti/Mikkeli-gtfs.zip)           | [waltti](https://api.digitransit.fi/routing/v2/waltti/gtfs/v1)
| Pori           | [Pori](https://api.digitransit.fi/routing-data/v3/waltti/Pori-gtfs.zip)                 | [waltti](https://api.digitransit.fi/routing/v2/waltti/gtfs/v1)
| Kouvola        | [Kouvola](https://api.digitransit.fi/routing-data/v3/waltti/Kouvola-gtfs.zip)           | [waltti](https://api.digitransit.fi/routing/v2/waltti/gtfs/v1)
| Kotka          | [Kotka](https://api.digitransit.fi/routing-data/v3/waltti/Kotka-gtfs.zip)               | [waltti](https://api.digitransit.fi/routing/v2/waltti/gtfs/v1)
| Rovaniemi      | [Rovaniemi](https://api.digitransit.fi/routing-data/v3/waltti/Rovaniemi-gtfs.zip)       | [waltti](https://api.digitransit.fi/routing/v2/waltti/gtfs/v1)
| Salo           | [Salo](https://api.digitransit.fi/routing-data/v3/waltti/Salo-gtfs.zip)                 | [finland](https://api.digitransit.fi/routing/v2/waltti/gtfs/v1)
| Kajaani        | [Kajaani](https://api.digitransit.fi/routing-data/v3/waltti/Kajaani-gtfs.zip)           | [finland](https://api.digitransit.fi/routing/v2/waltti/gtfs/v1)
| VARELY         | [VARELY](https://api.digitransit.fi/routing-data/v3/varely/VARELY-gtfs.zip)             | [varely](https://api.digitransit.fi/routing/v2/varely/gtfs/v1)
| Rauma          | [Rauma](https://api.digitransit.fi/routing-data/v3/finland/Rauma-gtfs.zip)              | [finland](https://api.digitransit.fi/routing/v2/finland/gtfs/v1)
| Finland trains | [digitraffic](https://api.digitransit.fi/routing-data/v3/finland/digitraffic-gtfs.zip)  | [finland](https://api.digitransit.fi/routing/v2/finland/gtfs/v1)
| Härmän liikenne | [Harma](https://api.digitransit.fi/routing-data/v3/finland/Harma-gtfs.zip)             | [finland](https://api.digitransit.fi/routing/v2/finland/gtfs/v1)
| Uusimaa ELY Korsisaari | [Korsisaari](https://api.digitransit.fi/routing-data/v3/finland/Korsisaari-gtfs.zip) | [finland](https://api.digitransit.fi/routing/v2/finland/gtfs/v1)
| Etelä-Pohjanmaa ELY Ingves & Svanbäck | [IngvesSvanback](https://api.digitransit.fi/routing-data/v3/finland/IngvesSvanback-gtfs.zip) | [finland](https://api.digitransit.fi/routing/v2/finland/gtfs/v1)

## Geohash

The topic structure includes a form of geohash for the latitude and the longitude of the vehicle. The digits of the integer parts are separated into their own level, `geohash_head`, in the format `<lat>;<long>`, e.g. `60;24`. The digits of the fractional parts are split and interleaved into a custom format so that e.g. (60.123, 24.789) becomes `60;24/17/28/39`. This format enables subscribing to specific geographic boundaries easily.

## Best practices

Fetching everything (especially when it's not needed) through the broker is not recommended. One of the best things about MQTT is the possibility to limit what is fetched through subscriptions by specifying the interesting things in the topic. Instead of fetching information about all vehicles, for example, subscribing to a topic like `/gtfsrt/vp/tampere/+/+/+/5/+/Keskustori/#` will result to only receiving information about vehicles on Tampere's route with the short name `5` and trip headsign of `Keskustori`.

Additionally, to help separate different clients, it's recommended to include a random string at the end of the client ID. Also, keepalive interval should be configured to be less than a minute (for example 30 seconds) and retrying of connection should not be done every second but instead every 30 seconds, for example.
