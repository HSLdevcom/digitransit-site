---
title: Autocomplete
---

Autocomplete can be used to search addresses and place names with incomplete search terms to provide real-time suggestions as the user types. Autocomplete is a bit faster and simpler as
the full search endpoint, which also works well with incomplete search strings.

## Endpoint

`http://api.digitransit.fi/geocoding/v1/autocomplete`

### Supported URL parameters

| Parameter              | Type                   | Description                                              |
|------------------------|------------------------|----------------------------------------------------------|
| `text`                 | string                 | Text to be searched
| `boundary.rect.min_lon`<br/>`boundary.rect.max_lon`<br/>`boundary.rect.min_lat`<br/>`boundary.rect.max_lat`	 | floating point number  | Searches using a  boundary that is specified by a rectangle with latitude and longitude coordinates for two diagonals of the bounding box (the minimum and the maximum latitude, longitude).
| `focus.point.lat`<br/>`focus.point.lon` | floating point number  | Scores the nearby places higher depending on how close they are to the focus point so that places with higher scores will appear higher in the results list.
| `sources`                | comma-delimited string array | Filters results by source. Value can be `oa` (DVV address data), `osm` ([OpenStreetMap](http://openstreetmap.org/)), `nlsfi` ([National Land Survey](https://www.maanmittauslaitos.fi/en)), `gtfs<feedid>`, `citybikes<network>`. Here feedid refers to GTFS feed identifier e.g. hsl and network is the citybike network identifier e.g. smoove.
| `layers`                 | comma-delimited string array | Filters results by layer (`address`, `venue`, `street`, `stop`, `station`, `bikestation`, `neighbourhood`, `localadmin`, `region`)
| `lang`                   | string | Returns results in the preferred language if such a language-bound name version is available (value can be `fi`, `sv` or `en`).

**Note:** You can find out the list of GTFS feed identifiers by querying OpenTripPlanner routing api, for example:

> https://api.digitransit.fi/graphiql/waltti?query=%257B%250A%2520%2520feeds%2520%257B%250A%2520%2520%2520%2520feedId%250A%2520%2520%257D%250A%257D

Running this query returns the list of feed identifiers used in Waltti routing services.

Citybike network identifiers can be examined by querying all bike stations:

> https://api.digitransit.fi/graphiql/finland?query=%257B%2520bikeRentalStations%2520%257Bname%2520networks%2520lat%2520lon%257D%2520%257D%250A%250A


### Response fields

The response contains an array called  `features`. Each feature has a point geometry and properties listed below:

| Name                | Type    | Description                                              |
|---------------------|---------|----------------------------------------------------------|
| `id`                | string  |
| `gid`               | string  | Global id that consists of a layer (such as address or country), an identifier for the original data source (such as openstreetmap or openaddresses), and an id for the individual record corresponding to the original source identifier, where possible.
| `layer`             | string  | Place type (e.g. `address`), see the list of possible values in the parameter specs above
| `source`            | string  | Data source, see the list of possible values in the parameter specs above
| `source_id`         | string  |
| `name`              | string  | A short description of the location, for example a business name, a locality name, or part of an address, depending on what is being searched for and what is returned.
| `postalcode`        | number  |
| `postalcode_gid`    | string  |
| `confidence`        | number  | An estimation of how accurately this result matches the query. Value 1 means perfect match.
| `distance`          | number  | A distance from the focus point if it is given (in kilometers)
| `accuracy`          | string  | Returns always coordinates of just one point. If the object is originally an area or a line like a road, then the centroid is calculated (value can be point or centroid).
| `country`           | string  | Places that issue passports, nations, nation-states
| `country_gid`       | string  |
| `country_a`         | string  | [ISO 3166-1 alpha-3 country code](https://en.wikipedia.org/wiki/ISO_3166-1), for example *FIN*
| `region`            | string  | For example *Uusimaa*
| `region_gid`        | string  |
| `localadmin`        | string  | Local administrative boundaries, for example *Helsinki*
| `localadmin_gid`    | string  |
| `locality`          | string  | Towns, hamlets, cities, for example *Helsinki*
| `locality_gid`      | string  |
| `neighbourhood`     | string  | Social communities, neighbourhoods, for example *Itä-Pasila*
| `neighbourhood_gid` | string  |
| `label`             | string  | A human-friendly representation of the place with the most complete details, that is ready to be displayed to an end user, for example *East-West Pub, Itä-Pasila, Helsinki*.

**Note:** Not exactly the same fields are returned for all searches because all object locations do not have the same data available, for example neighborhood is not in use with all objects.

## Examples

### Search for 'kamp'

> https://api.digitransit.fi/geocoding/v1/autocomplete?text=kamp

### Search for 'kamp' and filter results by street address

> https://api.digitransit.fi/geocoding/v1/autocomplete?text=kamp&layers=address

**Note:** Using parameter **layers=address** returns results for places having text `kamp` with a street address.

### Search for 'kamp' inside a bounding box

> https://api.digitransit.fi/geocoding/v1/autocomplete?text=kamp&boundary.rect.min_lat=59.9&boundary.rect.max_lat=60.45&boundary.rect.min_lon=24.3&boundary.rect.max_lon=25.5

### Search for 'kamp' using a focus point

> https://api.digitransit.fi/geocoding/v1/autocomplete?text=kamp&focus.point.lat=60.17&focus.point.lon=24.93

**Note:** Using parameter **focus.point** sorts equally matching places depending on how close they are to the focus point.

## Language preference

The language preference can be defined using `lang=xx` parameter, default being `lang=fi`. Unlike in reverse
geocoding, the preference has significance for geocoding searches only when multiple languages provide
an equally good match.

**Note:** Part of the provided geocoding data does not include Swedish names, and part of the data
leaves the language context unknown. This may occasionally cause unexpected errors in language selection.
