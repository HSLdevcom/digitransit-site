---
title: Points of interest
---

This API provides vector map tiles for points of interests like ticket sales positions, city bike stations and park and ride areas. They can be displayed on top of the background raster map.

## Data format

**Vector maps** are available in [Mapbox Vector Tile format](https://github.com/mapbox/vector-tile-spec)

## Endpoint

`https://cdn.digitransit.fi/map/v2/:source/:z/:x/:y.pbf`

### Supported URL parameters

| Parameter     | Type           | Description                                              |
|---------------|----------------|----------------------------------------------------------|
| source        | string         | Source layer. See choices below. E.g, `hsl-stop-map`
| z             | int            | Zoom level
| x             | int            | x-coordinate
| y             | int            | y-coordinate

### Source values

| Value                  | Description                                              |
|------------------------|----------------------------------------------------------|
| `hsl-stop-map`         | A bus stop map of Helsinki
| `hsl-parkandride-map`  | A map showing the Park and Ride sites in the Helsinki region
| `waltti-stop-map`      | A bus stop map of Waltti regions. You can check the currently active regions at: http://waltti.fi/?lang=en
| `finland-stop-map`     | A bus stop map of Finland
| `hsl-citybike-map`     | A map showing the city bikes available in the Helsinki region
| `waltti-citybike-map`  | A map showing the city bikes available in the Waltti regions.
| `finland-citybike-map` | A map showing the city bikes available in Finland.
| `hsl-ticket-sales-map` | A map showing the ticket sales points in the Helsinki region. Includes for example many kiosks and stores.

## Examples

### Map tiles address

> https://cdn.digitransit.fi/map/v2/hsl-stop-map/16/37308/18959.pbf

### Source address for Mapbox GL JS library

> https://cdn.digitransit.fi/map/v2/hsl-stop-map/index.json
