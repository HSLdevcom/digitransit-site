---
title: Points of interest
---

This API provides vector map tiles for points of interests like rental stations and park and ride areas. They can be displayed on top of the background raster map.

## Data format

**Vector maps** are available in [Mapbox Vector Tile format](https://github.com/mapbox/vector-tile-spec)

## Endpoint

`https://cdn.digitransit.fi/map/v3/:router-id/:lang/:source/:z/:x/:y.pbf?digitransit-subscription-key={YOUR_SUBSCRIPTION_KEY}`

There is also a TileJSON index file available at `https://cdn.digitransit.fi/map/v3/:router-id/:lang/:source/tilejson.json?digitransit-subscription-key={YOUR_SUBSCRIPTION_KEY}`

### Supported URL parameters

| Parameter     | Type           | Description                                              |
|---------------|----------------|----------------------------------------------------------|
| router-id     | string         | Router id eg. `hsl` or `waltti`
| lang          | string         | Language `fi` or `sv` (`en` is available for parking layers)
| source        | string         | Comma separated list of source layers. See choices below. E.g, `stops` or `stops,stations`
| z             | int            | Zoom level
| x             | int            | x-coordinate
| y             | int            | y-coordinate

### Source values

**Note:** If the non-real-time versions of a layer provide enough data, those should be used instead of the real-time versions.

| Value                     | Description                                              | Available router-ids                                                       |
|---------------------------|----------------------------------------------------------|----------------------------------------------------------------------------|
| `stops`                   | A stop map for the requested router id                                           | `finland`, `hsl`, `waltti`, `waltti-alt`, `varely` |
| `realtimeStops`           | A stop map including if stop is in use at the moment                             | `finland`, `hsl`, `waltti`, `waltti-alt`, `varely` |
| `stations`                | A station map for the requested router id                                        | `finland`, `hsl`, `waltti`, `waltti-alt`, `varely` |
| `rentalStations`          | Available rental vehicle stations                                                | `finland`, `hsl`, `waltti`                         |
| `realtimeRentalStations`  | Rental vehicle stations including available rental vehicles and available spaces | `finland`, `hsl`, `waltti`                         |
| `realtimeRentalVehicles`  | A map of rental vehicles                                                         | `finland`, `hsl`                                   |
| `vehicleParking`          | A map showing vehicle parking places                                             | `finland`, `hsl`, `waltti`                         |
| `vehicleParkingGroups`    | A map of groups of vehicleParking                                                | `finland`, `hsl`, `waltti`                         |

## Examples

### Map tiles address

> https://cdn.digitransit.fi/map/v3/hsl/stops,stations/16/37308/18959.pbf?digitransit-subscription-key={YOUR_SUBSCRIPTION_KEY}
