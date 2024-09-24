---
title: Points of interest
---

This API provides vector map tiles for points of interests like ticket sales positions, city bike stations and park and ride areas. They can be displayed on top of the background raster map.

## Data format

**Vector maps** are available in [Mapbox Vector Tile format](https://github.com/mapbox/vector-tile-spec)

## Endpoint

`https://cdn.digitransit.fi/map/v3/:router-id/:lang/:source/:z/:x/:y.pbf?digitransit-subscription-key={YOUR_SUBSCRIPTION_KEY}`

### Supported URL parameters

| Parameter     | Type           | Description                                              |
|---------------|----------------|----------------------------------------------------------|
| router-id     | string         | Router id eg. `hsl' or `waltti`
| lang          | string         | Language eg. `en` or `fi`
| source        | string         | Comma separated list of source layers. See choices below. E.g, `stops` or `stops,stations`
| z             | int            | Zoom level
| x             | int            | x-coordinate
| y             | int            | y-coordinate

### Source values

| Value                     | Description                                              |
|---------------------------|----------------------------------------------------------|
| `stops`                   | A stop map for the requested router id
| `realtimeStops`           | A stop map including if stop is in use at the moment
| `stations`                | A station map for the requested router id
| `realtimeStations`        | A stop map including if station is in use at the moment
| `rentalStations`          | Available rental vehicle stations
| `realtimeRentalStations`  | Rental vehicle stations including available rental vehicles and available spaces
| `realtimeRentalVehicles`  | A map of rental vehicles 
| `vehicleParking`          | A map showing vehicle parking places
| `vehicleParkingGroups`    | A map of groups of vehicleParking
| `hsl-ticket-sales-map`    | A map showing the ticket sales points in the Helsinki region. Includes for example many kiosks and stores.

## Examples

### Map tiles address

> https://cdn.digitransit.fi/map/v3/hsl/stops,stations/16/37308/18959.pbf?digitransit-subscription-key={YOUR_SUBSCRIPTION_KEY}

### Ticket sales points in the Helsinki region
**Note:** Different url path compared to other sources
> https://cdn.digitransit.fi/map/v2/hsl-ticket-sales-map/16/37308/18959.pbf?digitransit-subscription-key={YOUR_SUBSCRIPTION_KEY}
