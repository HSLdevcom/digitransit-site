---
title: Service architecture
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
  buildScript: https://github.com/HSLdevcom/hsl-map-server/blob/master/travis-build.sh
  runContainer: docker run -d -p 8080:8080 -e FONTSTACK_PASSWORD={add password here} --name hsl-map-server hsldevcom/hsl-map-server
  accessContainer: http://localhost:8080/hsl-map/16/37313/18958.png
  travisBuild: hsl-map-server 
---

## Exploring HSL map style

HSL map style is available at https://github.com/HSLdevcom/hsl-map-style.git

[Readme file](https://github.com/HSLdevcom/hsl-map-style/blob/master/README.md) contains information of how to run map style on local machine.

HSL map style example:

![hsl-map-style](http://api.digitransit.fi/hsl-map/16/37311/18963@2x.png)

## Service dependencies
| Asset                  |  Url                                                        |
|------------------------|-------------------------------------------------------------|
| Routing - API          | https://digitransit.fi/en/developers/apis/1-routing-api/
| HSL park and ride API  | https://www.hsl.fi/en/information/park-and-ride
| HSL Ticket Sales       | https://data-hslhrt.opendata.arcgis.com/datasets/

**Note:** HSL Ticket Sales is not really an API but data that gets updated manually. The exact file is available at:

http://data.hslhrt.opendata.arcgis.com/datasets/42045a8235114dc8bf417df0a1a89edd_0.geojson

## Related open source projects 

| URL                                                        | Project description                     |
|------------------------------------------------------------|-----------------------------------------|
| https://github.com/mapbox/tilejson-spec                    | JSON format for describing map tilesets
| https://github.com/mapbox/vector-tile-spec                 | Mapbox Vector Tile specification 
| https://github.com/mapbox/mbtiles-spec                     | MBTiles specification for storing tiled map data in SQLite databases for immediate usage and for transfer
| https://wiki.osgeo.org/wiki/Tile_Map_Service_Specification | Tile Map Service Specification
| http://geojson.org/                                       | GeoJSON format for encoding a variety of geographic data structures
| https://github.com/mojodna/tessera                         | Tessera development on GitHub
| https://github.com/mapbox/tilelive                         | TileLive development on GitHub
| https://github.com/mojodna/tilelive-http                   | TileLive http developement on GitHub
| https://github.com/mojodna/tilelive-xray                   | TileLive xray development on GitHub
| http://osm2vectortiles.org/                               | OSM2VectorTiles Project
| https://github.com/osm2vectortiles/osm2vectortiles         | OSM2VectorTiles development on GitHub
