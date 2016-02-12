---
title: Map - API
---

## Description
Map API provides raster and vector tiles in various formats

## Raster map API
Raster maps are available in Tile Map Service format:
> https://wiki.osgeo.org/wiki/Tile_Map_Service_Specification

TMS tiles are available from:
> http://{environment}/hsl-map/{z}/{x}/{y}{size}.png

where:
- environment is e.g. "matka.hsl.fi"
- z is zoom level
- x is coordinate
- y is coordinate
- size is empty or '@2x' for retina tiles

examples:
> http://matka.hsl.fi/hsl-map/16/37313/18958.png

> http://matka.hsl.fi/hsl-map/16/37313/18958@2x.png

## Vector map API
Vector maps are available in Mapbox Vector Tile format:
> https://github.com/mapbox/vector-tile-spec

Vector tiles are available from:
> http://{environment}/{source}/{z}/{x}/{y}.pbf

where:
- environment is e.g. "matka.hsl.fi"
- source is one of 'hsl-stop-map', 'hsl-parkandride-map', 'finland-stop-map'
- z is zoom level
- x is coordinate
- y is coordinate

examples:
> http://dev.reittiopas.fi/hsl-stop-map/16/37308/18959.pbf

## Getting started with Docker containers

### Building docker image
- First you need password for fontstack.zip. Get it.
- docker build -t hsldevcom/hsl-map-server --build-arg FONTSTACK_PASSWORD=add_password .

### Running docker container
- docker run -d -p 8088:8088 --name hsl-map-server hsldevcom/hsl-map-server
- browse to http://{DOCKER HOST}:8088/hsl-map/16/37313/18958.png

## Exploring HSL map style
![hsl-map-style](http://matka.hsl.fi/hsl-map/16/37311/18963@2x.png)

HSL map style is available in https://github.com/HSLdevcom/hsl-map-style.git
Repository contains information how to run map style on local machine.

## Service dependencies
| Asset                  |  Url                                                        |
|------------------------|-------------------------------------------------------------|
| Routing - API          | http://digitransit.fi/developers/routing-api/
| HSL park and ride API  | https://www.hsl.fi/en/information/park-and-ride

## Project assets

| Asset                    | url                                                            |
|--------------------------|----------------------------------------------------------------|
| Code                     | http://github.com/HSLdevcom/hsl-map-server.git
| Dockerfile               |
| Docker image             |
| HSL map style            | https://github.com/HSLdevcom/hsl-map-style.git
| tilelive-otp-stops       | https://github.com/hannesj/tilelive-otp-stops
| tilelive-hsl-parkandride | https://github.com/HSLdevcom/tilelive-hsl-parkandride
| tilelive-gl              | https://github.com/hannesj/tilelive-gl.git


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
