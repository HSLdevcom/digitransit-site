---
title: Points of interest
---

Vector maps are available in [Mapbox Vector Tile format](https://github.com/mapbox/vector-tile-spec)

Vector tiles are available from endpoint:
<pre>http://api.digitransit.fi/:source}/:z/:x/:y.pbf</pre>

Supported url parameters:
| Parameter     | Type           | Description                                              |
|---------------|----------------|----------------------------------------------------------|
| source        | string         | one of: 'hsl-stop-map', 'hsl-parkandride-map', 'hsl-vector-map', 'finland-stop-map'
| z             | int            | Zoom level
| x             | int            | x-coordinate
| y             | int            | y-coordinate
| size          | string         | '@2x' for retina tiles or empty value for normal

examples:
> http://api.digitransit.fi/hsl-stop-map/16/37308/18959.pbf
