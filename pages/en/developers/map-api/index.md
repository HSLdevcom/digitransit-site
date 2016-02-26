---
title: Map - API
description:
  info: Map API provides raster and vector tiles in various formats.
  architecture: https://raw.githubusercontent.com/HSLdevcom/digitransit-site/master/pages/en/developers/map-api/architecture.xml
assets:
  source: https://github.com/HSLdevcom/hsl-map-server
  DockerHub: https://hub.docker.com/r/hsldevcom/hsl-map-server/
  Dockerfile: https://github.com/HSLdevcom/hsl-map-server/blob/master/Dockerfile
  "HSL map style": https://github.com/HSLdevcom/hsl-map-style.git
  "tilelive-otp-stops": https://github.com/hannesj/tilelive-otp-stops
  "tilelive-hsl-parkandride": https://github.com/HSLdevcom/tilelive-hsl-parkandride
  "tilelive-gl": https://github.com/hannesj/tilelive-gl.git
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
<pre>http://beta.digitransit.fi/hsl-map/:z/:x/:y:size.png</pre>

Supported url parameters:
| Parameter     | Type           | Description                                              |
|---------------|----------------|----------------------------------------------------------|
| z             | int            | Zoom level
| x             | int            | x-coordinate
| y             | int            | y-coordinate
| size          | string         | '@2x' for retina tiles or empty value for normal

examples:
> http://beta.digitransit.fi/hsl-map/16/37313/18958.png

> http://beta.digitransit.fi/hsl-map/16/37313/18958@2x.png

## Vector map API
Vector maps are available in [Mapbox Vector Tile format](https://github.com/mapbox/vector-tile-spec)

Vector tiles are available from endpoint:
<pre>http://beta.digitransit.fi/:source}/:z/:x/:y.pbf</pre>

Supported url parameters:
| Parameter     | Type           | Description                                              |
|---------------|----------------|----------------------------------------------------------|
| source        | string         | one of: 'hsl-stop-map', 'hsl-parkandride-map', 'hsl-vector-map', 'finland-stop-map'
| z             | int            | Zoom level
| x             | int            | x-coordinate
| y             | int            | y-coordinate
| size          | string         | '@2x' for retina tiles or empty value for normal

examples:
> http://beta.digitransit.fi/hsl-stop-map/16/37308/18959.pbf

## Exploring HSL map style
![hsl-map-style](http://beta.digitransit.fi/hsl-map/16/37311/18963@2x.png)

HSL map style is available in https://github.com/HSLdevcom/hsl-map-style.git

[Readme file](https://github.com/HSLdevcom/hsl-map-style/blob/master/README.md) contains information how to run map style on local machine.

## Service dependencies
| Asset                  |  Url                                                        |
|------------------------|-------------------------------------------------------------|
| Routing - API          | http://digitransit.fi/developers/routing-api/
| HSL park and ride API  | https://www.hsl.fi/en/information/park-and-ride

## Key service delivery activities
1. Keep up with various specifications
> https://github.com/mapbox/tilejson-spec

> https://github.com/mapbox/vector-tile-spec

> https://github.com/mapbox/mbtiles-spec

> https://wiki.osgeo.org/wiki/Tile_Map_Service_Specification

> http://geojson.org/

2. Keep up with Tessera development on GitHub
> https://github.com/mojodna/tessera

3. Keep up with TileLive development on GitHub
> https://github.com/mapbox/tilelive

4. Keep up with TileLive http developement on GitHub
> https://github.com/mojodna/tilelive-http

5. Keep up with TileLive xray development on GitHub
> https://github.com/mojodna/tilelive-xray

6. Follow OSM2VectorTiles Project
> http://osm2vectortiles.org/

> https://github.com/osm2vectortiles/osm2vectortiles
