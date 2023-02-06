---
title: Background map
# replit:
#   embeds:
#     -
#       title: "Display map using Leaflet"
#       description: "Here is a quick example that uses <a href=\"http://leafletjs.com/\">Leaflet</a> to display scrollable map.<br/>Note that this example is using <code>hsl-map</code> tiles (<b>512px</b>), which are not the size that Leaflet expects. To display 512px tiles correctly with Leaflet, use options <code>tileSize: 512</code> and <code>zoomOffset: -1</code>"
#       url: https://repl.it/@digitransit/LeafletMap
#       height: 800px
---
Background map provides **HSL style** map tiles for example for browser based applications.


## Data format

**Raster maps** are available in [Tile Map Service format](https://wiki.osgeo.org/wiki/Tile_Map_Service_Specification)

**Note:** Background map is also available as vector tiles from source `hsl-vector-map` in [OpenMapTiles](https://openmaptiles.org/) schema. Styles used by HSL can be found on: https://github.com/HSLdevcom/hsl-map-style

Remember to include your ```digitransit-subscription-key``` parameter !

## Endpoint
```https://cdn.digitransit.fi/map/v2/:source/:z/:x/:y:size.png?digitransit-subscription-key={YOUR_SUBSCRIPTION_KEY}```

## TileJSON endpoint 
```https://cdn.digitransit.fi/map/v2/:source/index.json?digitransit-subscription-key={YOUR_SUBSCRIPTION_KEY}```

You can also include ```digitransit-subscription-key``` header in your request instead of the url parameters.

### Supported URL parameters

| Parameter     | Type           | Description                                                          |
|---------------|----------------|----------------------------------------------------------------------|
| source      	| string	       | Source layer. See choices below. E.g., `hsl-map` or `hsl-vector-map` |
| z             | int            | Zoom level                                                           |
| x             | int            | x-coordinate                                                         |
| y             | int            | y-coordinate                                                         |
| size          | string         | '@2x' for retina tiles or empty value for normal                     |

### Sources
| Value                           | Description                                                   |
|---------------------------------|---------------------------------------------------------------|
| `hsl-map`                       | 512px raster tiles with Finnish language                      |
| `hsl-map-256`                   | 256px raster tiles with Finnish language                      |
| `hsl-map-sv`                    | 512px raster tiles with Swedish language                      |
| `hsl-map-sv-256`                | 256px raster tiles with Swedish language                      |
| `hsl-map-fi-sv`                 | 512px bilingual raster tiles with Finnish / Swedish language  |
| `hsl-map-fi-sv-256`             | 256px bilingual raster tiles with Finnish / Swedish language  |
| `hsl-map-no-text`               | 512px raster tiles with no texts                              |
| `hsl-map-no-text-256`           | 256px raster tiles with no texts                              |
| `hsl-map-greyscale`             | 512px grayscale raster tiles with Finnish language            |
| `hsl-map-greyscale-256`         | 256px grayscale raster tiles with Finnish language            |
| `hsl-map-greyscale-no-text`     | 512px grayscale raster tiles with no texts                    |
| `hsl-map-greyscale-256-no-text` | 256px grayscale raster tiles with no texts                    |
| `hsl-vector-map`                | Vector tiles                                                  |

## Examples

### An example of what the HSL map tiles look like

![hsl-map-style](http://cdn.digitransit.fi/map/v2/hsl-map/16/37311/18963@2x.png)

### HSL style map tiles

> https://cdn.digitransit.fi/map/v2/hsl-map/16/37313/18958.png

### Retina tiles

> https://cdn.digitransit.fi/map/v2/hsl-map/16/37313/18958@2x.png

### Swedish language tiles

> https://cdn.digitransit.fi/map/v2/hsl-map-sv/16/37313/18958.png

### English language tiles

> https://cdn.digitransit.fi/map/v2/hsl-map-en/16/37313/18958.png

### Bilingual Finnish / Swedish language tiles

> https://cdn.digitransit.fi/map/v2/hsl-map-fi-sv/16/37313/18958.png
