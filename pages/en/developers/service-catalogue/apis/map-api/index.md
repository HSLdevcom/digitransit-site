---
title: Map API
description:
  info: Map API provides raster and vector tiles in various formats.
  architecture: https://raw.githubusercontent.com/HSLdevcom/digitransit-site/master/pages/en/developers/service-catalogue/apis/map-api/architecture.xml
assets:
  source: https://github.com/HSLdevcom/hsl-map-server
  DockerHub: https://hub.docker.com/r/hsldevcom/hsl-map-server/
  Dockerfile: https://github.com/HSLdevcom/hsl-map-server/blob/master/Dockerfile
  "HSL map style": https://github.com/HSLdevcom/hsl-map-style.git
  "tilelive-otp-stops": https://github.com/hannesj/tilelive-otp-stops
  "tilelive-hsl-parkandride": https://github.com/HSLdevcom/tilelive-hsl-parkandride
  "tilelive-gl": https://github.com/hannesj/tilelive-gl.git
  "HSL-map-generator-ui": https://github.com/HSLdevcom/hsl-map-generator-ui
docker:
  dockerfile: https://github.com/HSLdevcom/hsl-map-server/blob/master/Dockerfile
  imageName: hsldevcom/hsl-map-server
  buildScript: https://github.com/HSLdevcom/hsl-map-server/blob/master/build-docker-image.sh
  runContainer: docker run -d -p 8080:8080 -e FONTSTACK_PASSWORD={add password here} --name hsl-map-server hsldevcom/hsl-map-server
  accessContainer: http://localhost:8080/hsl-map/16/37313/18958.png
---

## Raster map API
Raster maps are available in [Tile Map Service format](https://wiki.osgeo.org/wiki/Tile_Map_Service_Specification)

TMS tiles are available from endpoint:
<pre>http://api.digitransit.fi/map/v1/hsl-map/:z/:x/:y:size.png</pre>

Supported url parameters:
| Parameter     | Type           | Description                                              |
|---------------|----------------|----------------------------------------------------------|
| z             | int            | Zoom level
| x             | int            | x-coordinate
| y             | int            | y-coordinate
| size          | string         | '@2x' for retina tiles or empty value for normal

examples:
> http://api.digitransit.fi/map/v1/hsl-map/16/37313/18958.png

> http://api.digitransit.fi/map/v1/hsl-map/16/37313/18958@2x.png

### Display map using Leaflet:

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
      L.tileLayer('http://api.digitransit.fi/map/v1/{id}/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
          '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ',
        id: 'hsl-map'}).addTo(map);
    </script>
  </body>
</html>
```

[Show example on browser](http://htmlpreview.github.io/?https://gist.github.com/siren/3c08fdd1c49232edb4d0/raw)


## Vector map API
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

## Exploring HSL map style
![hsl-map-style](http://api.digitransit.fi/hsl-map/16/37311/18963@2x.png)

HSL map style is available in https://github.com/HSLdevcom/hsl-map-style.git

[Readme file](https://github.com/HSLdevcom/hsl-map-style/blob/master/README.md) contains information how to run map style on local machine.

## HSL map generator UI
Prototype UI that can be used to generate printable maps is available at
> https://github.com/HSLdevcom/hsl-map-generator-ui

## Service dependencies
| Asset                  |  Url                                                        |
|------------------------|-------------------------------------------------------------|
| Routing - API          | http://digitransit.fi/developers/routing-api/
| HSL park and ride API  | https://www.hsl.fi/en/information/park-and-ride

## Key service delivery activities
1. Keep up with various specifications<br/>
   https://github.com/mapbox/tilejson-spec<br/>
   https://github.com/mapbox/vector-tile-spec<br/>
   https://github.com/mapbox/mbtiles-spec<br/>
   https://wiki.osgeo.org/wiki/Tile_Map_Service_Specification<br/>
   http://geojson.org/

2. Keep up with Tessera development on GitHub<br/>
   https://github.com/mojodna/tessera

3. Keep up with TileLive development on GitHub<br/>
   https://github.com/mapbox/tilelive

4. Keep up with TileLive http developement on GitHub<br/>
   https://github.com/mojodna/tilelive-http

5. Keep up with TileLive xray development on GitHub<br/>
   https://github.com/mojodna/tilelive-xray

6. Follow OSM2VectorTiles Project<br/>
   http://osm2vectortiles.org/<br/>
   https://github.com/osm2vectortiles/osm2vectortiles
