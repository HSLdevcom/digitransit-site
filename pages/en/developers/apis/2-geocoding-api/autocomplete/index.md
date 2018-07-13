---
title: Autocomplete
---

Autocomplete can be used to search addresses and place names with incomplete search terms to provide real-time suggestions as the user types.

## Autocomplete API

API is available at:

`http://api.digitransit.fi/geocoding/v1/autocomplete`

### Supported url parameters

| Parameter              | Type                   | Description                                              |
|------------------------|------------------------|----------------------------------------------------------|
| `text`                 | string                 | Text to be searched
| `boundary.rect.min_lon`<br/>`boundary.rect.max_lon`<br/>`boundary.rect.min_lat`<br/>`boundary.rect.max_lat`	 | floating point number  | Searches using a  boundary that is specified by a rectangle with latitude and longitude coordinates for two diagonals of the bounding box (the minimum and the maximum latitude, longitude).
| `focus.point.lat`<br/>`focus.point.lon` | floating point number  | Scores the nearby places higher depending on how close they are to the **focus.point** so that places with higher scores will appear higher in the results list.
| `sources`                | comma-delimited string array | Filters results by source (value can be `oa`, `osm` or `nlsfi`)
| `layers`                 | string                 | Filters results by layer (value can be address, venue or street)
| `boundary.country`       | [ISO 3166-1 alpha-2 or alpha-3](https://en.wikipedia.org/wiki/ISO_3166-1)                  | Filters results by country
| `lang`                   | string                 | Returns results in the preferred language if such a language-bound name version is available (value can be `fi` or `sv`).

### Response fields

| Name                | Type    | Description                                              |
|---------------------|---------|----------------------------------------------------------|
| `id`                | string  |
| `gid`               | string  | Global id that consists of a layer (such as address or country), an identifier for the original data source (such as openstreetmap or openaddresses), and an id for the individual record corresponding to the original source identifier, where possible.
| `layer`             | string  | Address, venue or street
| `source`            | string  | Data source, for example osm (openstreetmap), oa (openaddresses) or nlsfi
| `source_id`         | string  |
| `name`              | string  | A short description of the location, for example a business name, a locality name, or part of an address, depending on what is being searched for and what is returned.
| `postalcode`        | number  |
| `postalcode_gid`    | string  |
| `confidence`        | number  | An estimation of how accurately this result matches the query
| `distance`          | number  | A distance from the query point (in kilometers)
| `accuracy`          | string  | Returns always coordinates of just one point. If the object is originally an area or a line like a road, then the centroid is calculated (value can be point or centroid).
| `country`           | string  | Places that issue passports, nations, nation-states
| `country_gid`       | string  |
| `country_a`         | string  | Alpha-3 code, for example *FIN*
| `region`            | string  | For example *Uusimaa*
| `region_gid`        | string  |
| `localadmin`        | string  | Local administrative boundaries, for example *Helsinki*
| `localadmin_gid`    | string  |
| `locality`          | string  | Towns, hamlets, cities, for example *Helsinki*
| `locality_gid`      | string  |
| `neighbourhood`     | string  | Social communities, neighbourhoods, for example *Itä-Pasila*
| `neighbourhood_gid` | string  |
| `label`             | string  | A human-friendly representation of the place with the most complete details, that is ready to be displayed to an end user, for example *East-West Pub, Itä-Pasila, Helsinki*.
| `bbox`              | string  | If present, it describes the geographic extent of the feature, such as the screen size necessary to show all of California without needing to send the precise polygon geometry.

**Note:** Not exactly the same fields are returned for all searches because all object locations do not have the same data available, for example neighborhood is not in use with all objects.

## Examples

### Search for 'kamp'

https://api.digitransit.fi/geocoding/v1/autocomplete?text=kamp

### Search for 'kamp' and filter results by street address

https://api.digitransit.fi/geocoding/v1/autocomplete?text=kamp&layers=address

**Note:** Using parameter **layers=address** returns results for places having text `kamp` with a street address.

### Search for 'kamp' inside a bounding box

https://api.digitransit.fi/geocoding/v1/autocomplete?text=kamp&boundary.rect.min_lat=59.9&boundary.rect.max_lat=60.45&boundary.rect.min_lon=24.3&boundary.rect.max_lon=25.5

### Search for 'kamp' using a focus point

https://api.digitransit.fi/geocoding/v1/autocomplete?text=kamp&focus.point.lat=60.17&focus.point.lon=24.93

**Note:** Using parameter **focus.point** scores nearby places higher depending on how close they are to the focus.point so that places with higher scores will appear higher in the results list. After all the nearby results have been found, additional results will come from the rest of the world, without any further location-based prioritization.

## Language preference

The language preference can be defined using `lang=xx` parameter, default being `lang=fi`. Unlike in reverse
geocoding, the preference has significance for geocoding searches only when multiple languages provide
an equally good match. 

**Note:** Part of the provided geocoding data does not include Swedish names, and part of the data
leaves the language context unknown. This may occasionally cause unexpected errors in language selection.
