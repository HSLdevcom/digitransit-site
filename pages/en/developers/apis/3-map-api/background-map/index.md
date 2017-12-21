---
title: Background map
---
Background map provides **HSL style** map tiles for example for browser based applications.

## Data format

**Raster maps** are available in [Tile Map Service format](https://wiki.osgeo.org/wiki/Tile_Map_Service_Specification)

**TMS tiles** are available from endpoint:
<pre>https://cdn.digitransit.fi/map/v1/hsl-map/:z/:x/:y:size.png</pre>

**Note:** Background map is available as vector tiles too from source hsl-vector-map.

## Supported URL parameters:

| Parameter     | Type           | Description                                              |
|---------------|----------------|----------------------------------------------------------|
| z             | int            | Zoom level
| x             | int            | x-coordinate
| y             | int            | y-coordinate
| size          | string         | '@2x' for retina tiles or empty value for normal

## Examples 

### An example of what the map tiles look like:

![hsl-map-style](http://cdn.digitransit.fi/hsl-map/16/37311/18963@2x.png)

### HSL style map tiles

> https://cdn.digitransit.fi/map/v1/hsl-map/16/37313/18958.png

### Retina tiles

> https://cdn.digitransit.fi/map/v1/hsl-map/16/37313/18958@2x.png

### Swedish language tiles 

> https://cdn.digitransit.fi/map/v1/hsl-map-sv/16/37313/18958.png

### Display map using Leaflet

Here is a quick example that uses [Leaflet](http://leafletjs.com/) to display scrollable map.

``` html
<!doctype html>
<html>
  <head>
    <title>Map Leaflet - example</title>
    <link rel="stylesheet" href="http://cdn.leafletjs.com/leaflet/v0.7.7/leaflet.css" />
    <script src="http://cdn.leafletjs.com/leaflet/v0.7.7/leaflet.js"></script>
  </head>
  <body>
    <div id="map" style="height:600px; width:800px;"/>
    <script>
      var map = L.map('map').setView([60.192059,24.945831], 15);
      L.tileLayer('https://cdn.digitransit.fi/map/v1/{id}/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
          '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ',
        id: 'hsl-map'}).addTo(map);
    </script>
  </body>
</html>
```

[Show example on browser](http://htmlpreview.github.io/?https://gist.github.com/siren/3c08fdd1c49232edb4d0/raw)
