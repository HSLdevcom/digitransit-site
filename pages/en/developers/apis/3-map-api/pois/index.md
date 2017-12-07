---
title: Points of interest
---

This API provides vector map tiles for points of interests like ticket sales positions, city bike stations and park and ride areas. They can be displayed on top of the background raster map.

## Data format

**Vector maps** are available in [Mapbox Vector Tile format](https://github.com/mapbox/vector-tile-spec)

**Vector tiles** are available from endpoint:

<pre>https://digitransit-prod-cdn-origin.azureedge.net/map/v1/source/:z/:x/:y.pbf</pre>

## Supported url parameters

| Parameter     | Type           | Description                                              |
|---------------|----------------|----------------------------------------------------------|
| source        | string         | one of: 'hsl-stop-map', 'hsl-parkandride-map', 'waltti-stop-map', 'finland-stop-map', 'hsl-citybike-map', 'hsl-ticket-sales-map'
| z             | int            | Zoom level
| x             | int            | x-coordinate
| y             | int            | y-coordinate
| size          | string         | '@2x' for retina tiles or empty value for normal

## Examples

### Map tiles address

> https://digitransit-prod-cdn-origin.azureedge.net/map/v1/hsl-stop-map/16/37308/18959.pbf

### Source address for Mapbox GL JS library

> https://digitransit-prod-cdn-origin.azureedge.net/map/v1/hsl-stop-map/index.json
