---
title: Address lookup
---

Address lookup, otherwise known as reverse geocoding, is used for finding places/addresses for given coordinates. The **features** property of the results returned is where you will find the list of results that matched the best with your input parameters.

## Reverse geocoding endpoint

Endpoint root is available at:

`http://api.digitransit.fi/geocoding/v1/reverse`

## Supported request parameters

| Parameter       | Type           | Description                                              |
|-----------------|----------------|----------------------------------------------------------|
| `point.lat`              | floating point number         | Latitude value
| `point.lon`              | floating point number         | Longitude value
| `lang`                   | string                        | Returns results in the preferred language if such a language-bound name version is available
| `boundary.circle.radius` | floating point number         | Searches only inside the given circle
| `size`                   | integer                       | Limits the number of results returned
| `layers`                 | comma-delimited string array  | Filters results by layer (value can be address, venue or street)
| `sources`                | comma-delimited string array  | Filters results by source (value can be `oa`, `osm` or `nlsfi`)
| `boundary.country`       | [ISO 3166-1 alpha-2 or alpha-3](https://en.wikipedia.org/wiki/ISO_3166-1) | Filters results by country

**Note:** Parameter api_key is not in use in digitransit

## Response fields

| Name              | Type    | Description                                              |
|-------------------|---------|----------------------------------------------------------|
| `id`                | string  |
| `gid`               | string  | Global id that consists of a layer (such as address or country), an identifier for the original data source (such as openstreetmap or openaddresses), and an id for the individual record corresponding to the original source identifier, where possible.
| `layer`             | string  | Address, venue or street
| `source`            | string  | Data source, for example `osm` (openstreetmap), `oa` (openaddresses) or `nlsfi`
| `source_id`         | string  |
| `name`              | string  | A short description of the location, for example a business name, a locality name, or part of an address, depending on what is being searched for and what is returned.
| `postalcode`        | number  |
| `postalcode_gid`    | string  |
| `confidence`        | number  | An estimation of how accurately this result matches the query
| `distance`          | number  | A distance from the query point (in meters)
| `accuracy`          | string  |
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
| `label`             | string  | A human-friendly representation of the place with the most complete details, that is ready to be displayed to an end user, for example *East-West Pub, Itä-Pasila, Helsinki*
| `bbox`              | string  | If present, it describes the geographic extent of the feature, such as the screen size necessary to show all of California without needing to send the precise polygon geometry.

## Request examples

### Request to get only one result for the given coordinates

http://api.digitransit.fi/geocoding/v1/reverse?point.lat=60.199284&point.lon=24.940540&size=1

**Note:** Using parameter **size=1** limits the number of results returned to one.

### Request to get results for the given coordinates

https://api.digitransit.fi/geocoding/v1/reverse?point.lat=60.170278&point.lon=24.9369448

**Note:** This will return 10 places by default as the default value of the size parameter is 10 (the maximum value is 40). Specifying a value greater than 40 will override to 40 and return a warning in the response metadata.

### Request to get venue results for the same given coordinates

https://api.digitransit.fi/geocoding/v1/reverse?point.lat=60.170278&point.lon=24.9369448&layers=venue

**Note:** Using parameter **layers=venue** returns results for points of interest, businesses, things with walls.

### Request to get places with a street address for the same given coordinates

https://api.digitransit.fi/geocoding/v1/reverse?point.lat=60.170278&point.lon=24.9369448&layers=address

**Note:** Using parameter **layers=address** returns results for places with a street address.

### Request to get results for the given coordinates using language preference

http://api.digitransit.fi/geocoding/v1/reverse?point.lat=60.195&point.lon=24.93&lang=sv

**Note:** Using parameter **lang=sv** returns results in Swedish if such a language-bound name version is available.

Part of the provided geocoding data does not include Swedish names, and part of the data
does not specify the language at all. A swedish-speaking person may add a new address entry
'Fabriksgatan xx, Helsingfors' to OpenStreetMap without specifying the language.
Address lookup always searches across all documents and returns found items in the preferred
language if such a language-bound name version is available, otherwise using the default name,
which in reality can represent any language. Most default names are of course in Finnish.
