---
title: Background map
replit: 
  "Display map using Leaflet":
    description: "Here is a quick example that uses <a href=\"http://leafletjs.com/\">Leaflet</a> to display scrollable map." 
    url: https://repl.it/@digitransit/LeafletMap
    height: 800px
---
Background map provides **HSL style** map tiles for example for browser based applications.

## Data format

**Raster maps** are available in [Tile Map Service format](https://wiki.osgeo.org/wiki/Tile_Map_Service_Specification)

**Note:** Background map is also available as vector tiles from source `hsl-vector-map`.

## Endpoint
```https://cdn.digitransit.fi/map/v1/:source/:z/:x/:y:size.png```

### Supported URL parameters

| Parameter     | Type           | Description                                              |
|---------------|----------------|----------------------------------------------------------|
| source	| string	 | <ul><li>`hsl-map` for raster tiles</li><li>`hsl-map-sv` for raster tiles with Swedish language</li><li>`hsl-vector-map` for vector tiles</li></ul>|
| z             | int            | Zoom level
| x             | int            | x-coordinate
| y             | int            | y-coordinate
| size          | string         | '@2x' for retina tiles or empty value for normal

## Examples 

### An example of what the HSL map tiles look like

![hsl-map-style](http://cdn.digitransit.fi/hsl-map/16/37311/18963@2x.png)

### HSL style map tiles

> https://cdn.digitransit.fi/map/v1/hsl-map/16/37313/18958.png

### Retina tiles

> https://cdn.digitransit.fi/map/v1/hsl-map/16/37313/18958@2x.png

### Swedish language tiles 

> https://cdn.digitransit.fi/map/v1/hsl-map-sv/16/37313/18958.png
