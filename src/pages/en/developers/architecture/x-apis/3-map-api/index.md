---
title: Map API
description:
  info: Map API provides raster and vector tiles in various formats.
  architecture: https://raw.githubusercontent.com/HSLdevcom/digitransit-site/master/pages/en/developers/apis/3-map-api/x-service-architecture/architecture.xml
assets:
  - title: "Source"
    url: https://github.com/HSLdevcom/hsl-map-server
  - title: "DockerHub"
    url: https://hub.docker.com/r/hsldevcom/hsl-map-server/
  - title: "Dockerfile"
    url: https://github.com/HSLdevcom/hsl-map-server/blob/master/Dockerfile
  - title: "HSL map style"
    url: https://github.com/HSLdevcom/hsl-map-style.git
  - title: "HSL OpenMapTiles fork"
    url: https://github.com/HSLdevcom/openmaptiles.git
  - title: "tilelive-otp-stops"
    url: https://github.com/HSLdevcom/tilelive-otp-stops
  - title: "tilelive-otp-citybikes"
    url: https://github.com/HSLdevcom/tilelive-otp-citybikes
  - title: "tilelive-hsl-ticket-sales"
    url: https://github.com/HSLdevcom/tilelive-hsl-ticket-sales
  - title: "tilelive-hsl-parkandride"
    url: https://github.com/HSLdevcom/tilelive-hsl-parkandride
  - title: "tilelive-gl"
    url: https://github.com/HSLdevcom/tilelive-gl.git
  - title: "HSL-map-generator-ui"
    url: https://github.com/HSLdevcom/hsl-map-generator-ui
docker:
  dockerfile: https://github.com/HSLdevcom/hsl-map-server/blob/master/Dockerfile
  imageName: hsldevcom/hsl-map-server
  buildScript: https://github.com/HSLdevcom/hsl-map-server/blob/master/.github/workflows/scripts/build_and_push_image.sh
  runContainer: docker run -d -p 8080:8080 --name hsl-map-server hsldevcom/hsl-map-server
  accessContainer: http://localhost:8080/map/v2/hsl-map/16/37313/18958.png
---

## Exploring HSL map style

HSL map style is available at https://github.com/HSLdevcom/hsl-map-style.git

[Readme file](https://github.com/HSLdevcom/hsl-map-style/blob/master/README.md) contains information of how to run map style on local machine.

HSL map style example:

![hsl-map-style](https://cdn.digitransit.fi/map/v2/hsl-map/16/37311/18963@2x.png)

## Service dependencies

| Asset                 | Url                                                      |
| --------------------- | -------------------------------------------------------- |
| Routing - API         | https://digitransit.fi/en/developers/apis/1-routing-api/ |
| HSL park and ride API | https://www.hsl.fi/en/information/park-and-ride          |
| HSL Ticket Sales      | https://data-hslhrt.opendata.arcgis.com/datasets/        |

**Note:** HSL Ticket Sales is not really an API but data that gets updated manually. The exact file is available at:

https://data-hslhrt.opendata.arcgis.com/datasets/f9388fc8a8f848fda3bc584b607afe97_0.geojson

## Related open source projects

| URL                                                          | Project description                                                                                       |
| ------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------- |
| https://github.com/mapbox/tilejson-spec                      | JSON format for describing map tilesets                                                                   |
| https://github.com/mapbox/vector-tile-spec                   | Mapbox Vector Tile specification                                                                          |
| https://github.com/mapbox/mbtiles-spec                       | MBTiles specification for storing tiled map data in SQLite databases for immediate usage and for transfer |
| https://wiki.osgeo.org/wiki/Tile\_Map\_Service_Specification | Tile Map Service Specification                                                                            |
| https://geojson.org/                                         | GeoJSON format for encoding a variety of geographic data structures                                       |
| https://github.com/mojodna/tessera                           | Tessera development on GitHub                                                                             |
| https://github.com/mapbox/tilelive                           | TileLive development on GitHub                                                                            |
| https://openmaptiles.org/                                    | OpenMapTiles Project                                                                                      |
| https://github.com/openmaptiles/openmaptiles                 | OpenMapTiles development on GitHub                                                                        |
