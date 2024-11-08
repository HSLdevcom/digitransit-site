---
title: Map API
description:
  info: Map API provides raster and vector tiles in various formats.
  architecture: https://raw.githubusercontent.com/HSLdevcom/digitransit-site/master/src/pages/en/developers/architecture/x-apis/3-map-api/architecture.xml
assets:
  - title: "Source for background maps"
    url: https://github.com/HSLdevcom/hsl-map-server
  - title: "Source for points of interest vector maps"
    url: https://github.com/HSLdevcom/opentripplanner
  - title: "HSL-map-server DockerHub"
    url: https://hub.docker.com/r/hsldevcom/hsl-map-server/
  - title: "HSL-map-server Dockerfile"
    url: https://github.com/HSLdevcom/hsl-map-server/blob/master/Dockerfile
  - title: "OpenTripPlanner DockerHub"
    url: https://hub.docker.com/r/hsldevcom/opentripplanner/
  - title: "HSL map style"
    url: https://github.com/HSLdevcom/hsl-map-style.git
  - title: "HSL OpenMapTiles fork"
    url: https://github.com/HSLdevcom/openmaptiles.git
  - title: "tilelive-gl"
    url: https://github.com/HSLdevcom/tilelive-gl.git
  - title: "HSL-map-generator-ui"
    url: https://github.com/HSLdevcom/hsl-map-generator-ui
docker:
  dockerfile: https://github.com/HSLdevcom/hsl-map-server/blob/master/Dockerfile
  imageName: hsldevcom/hsl-map-server:prod
  buildScript: https://github.com/HSLdevcom/hsl-map-server/blob/master/.github/workflows/scripts/build_and_push_image.sh
  runContainer: docker run -d -p 8080:8080 --name hsl-map-server hsldevcom/hsl-map-server
  accessContainer: http://localhost:8080/map/v3/hsl-map/16/37313/18958.png
---

## Exploring HSL map style

HSL map style is available at https://github.com/HSLdevcom/hsl-map-style.git

[Readme file](https://github.com/HSLdevcom/hsl-map-style/blob/master/README.md) contains information of how to run map style on local machine.

HSL map style example:

`https://cdn.digitransit.fi/map/v3/hsl-map/16/37311/18963@2x.png?digitransit-subscription-key=<your subscription key>`

## APIs

APIs are documented [here](../../../apis/3-map-api/). There are instructions for how to run OpenTripPlanner locally in [routing-api architecture page](../1-routing-api/).

## Related links

| URL                                                          | Project description                                                                                       |
| ------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------- |
| https://github.com/mapbox/tilejson-spec                      | JSON format for describing map tilesets                                                                   |
| https://github.com/mapbox/vector-tile-spec                   | Mapbox Vector Tile specification                                                                          |
| https://github.com/mapbox/mbtiles-spec                       | MBTiles specification for storing tiled map data in SQLite databases for immediate usage and for transfer |
| https://github.com/CI-CMG/mapbox-vector-tile                 | Java library for generating MapBox vector tiles |
| https://wiki.osgeo.org/wiki/Tile\_Map\_Service_Specification | Tile Map Service Specification                                                                            |
| https://geojson.org/                                         | GeoJSON format for encoding a variety of geographic data structures                                       |
| https://github.com/mojodna/tessera                           | Tessera development on GitHub                                                                             |
| https://github.com/mapbox/tilelive                           | TileLive development on GitHub                                                                            |
| https://openmaptiles.org/                                    | OpenMapTiles Project                                                                                      |
| https://github.com/openmaptiles/openmaptiles                 | OpenMapTiles development on GitHub                                                                        |
| https://github.com/HSLdevcom/OpenTripPlanner/blob/dev-2.x/doc/user/sandbox/MapboxVectorTilesApi.md | OpenTripPlanner vector tile layer documentation                                                                        |
