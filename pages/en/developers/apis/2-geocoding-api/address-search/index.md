---
title: Address search
---

Address search can be used to search addresses and place names.  An address is matched to its corresponding geographic coordinates and in the simplest search, you can provide only one parameter, the text you want to match in any part of the location details.

## Search API

Search API provides a way to query addresses and POIs (points of interest). API is available at:

`http://api.digitransit.fi/geocoding/v1/search`

## Supported url parameters

| Parameter              | Type                   | Description                                              |
|------------------------|------------------------|----------------------------------------------------------|
| text                   | string                 | Text to be searched
| size                   | integer                | Limits the number of results returned
| boundary.rect.min_lon boundary.rect.max_lon boundary.rect.min_lat boundary.rect.max_lat	 | floating point number  | Searches using a  boundary that is specified by a rectangle with latitude and longitude coordinates for two diagonals of the bounding box (the minimum and the maximum latitude, longitude)
| boundary.circle.lat boundary.circle.lon boundary.circle.radius | floating point number  | Searches using location coordinates and a maximum distance radius within which acceptable results can be located.
| focus.point.lat focus.point.lon  | floating point number  | Scores the nearby places higher depending on how close they are to the **focus.point** so that places with higher scores will appear higher in the results list.
| sources                | comma-delimited string array | Filters results by source (value can be oa, osm or nlsfi)
| layers                 | string                 | Filters results by layer (value can be address, venue or street)
| boundary.country       | <a href="https://en.wikipedia.org/wiki/ISO_3166-1" target="\_blank">ISO-3166 alpha-2 or alpha-3</a>                  | Filters results by country 
| lang                   | string                 | Returns results in the preferred language if such a language-bound name version is available (value can be 'fi' or 'sv').

**Note:** Parameter api_key is not in use in digitransit

## Response fields

| Name              | Type    | Description                                              |
|-------------------|---------|----------------------------------------------------------|
| id                | string  | 
| gid               | string  | Global id that consists of a layer (such as address or country), an identifier for the original data source (such as openstreetmap or openaddresses), and an id for the individual record corresponding to the original source identifier, where possible. 
| layer             | string  | Address, venue or street
| source            | string  | Data source, for example osm (openstreetmap), oa (openaddresses) or nlsfi
| source_id         | string  | 
| name              | string  | A short description of the location, for example a business name, a locality name, or part of an address, depending on what is being searched for and what is returned.
| postalcode        | number  | 
| postalcode_gid    | string  |
| confidence        | number  | An estimation of how accurately this result matches the query
| distance          | number  | A distance from the query point (in meters) 
| accuracy          | string  |
| country           | string  | Places that issue passports, nations, nation-states
| country_gid       | string  |
| country_a         | string  | Alpha-3 code, for example FIN
| region            | string  | For example "Uusimaa"
| region_gid        | string  | 
| localadmin        | string  | Local administrative boundaries, for example "Helsinki"
| localadmin_gid    | string  |
| locality          | string  | Towns, hamlets, cities, for example "Helsinki"
| locality_gid      | string  |
| neighbourhood     | string  | Social communities, neighbourhoods, for example "Itä-Pasila"
| neighbourhood_gid | string  |
| label             | string  | A human-friendly representation of the place with the most complete details, that is ready to be displayed to an end user, for example "East-West Pub, Itä-Pasila, Helsinki"
| bbox              | string  | If present, it describes the geographic extent of the feature, such as the screen size necessary to show all of California without needing to send the precise polygon geometry. 

**Note:** Not exactly the same fields are returned for all searches because all object locations do not have the same data available, for example neighborhood is not in use with all objects.

## Search examples

### Search 'kamppi' and return only one result

https://api.digitransit.fi/geocoding/v1/search?text=kamppi&size=1

**Note:** Using parameter **size=1** limits the number of results returned to one.

### Search 'kamppi' and filter results by street address

https://api.digitransit.fi/geocoding/v1/search?text=kamppi&layers=address

**Note:** Using parameter **layers=address** returns results for places having text kamppi with a street address.

### Search 'kamppi' using a rectangle

https://api.digitransit.fi/geocoding/v1/search?text=kamppi&boundary.rect.min_lat=59.9&boundary.rect.max_lat=60.45&boundary.rect.min_lon=24.3&boundary.rect.max_lon=25.5

### Search 'kamppi' inside a circle

https://api.digitransit.fi/geocoding/v1/search?text=kamppi&boundary.circle.lat=60.2&boundary.circle.lon=24.936&boundary.circle.radius=30

**Note:** Parameter **boundary.circle.radius**  is always specified in kilometers.

### Search 'kamppi' using a focus point

https://api.digitransit.fi/geocoding/v1/search?text=kamppi&focus.point.lat=60.2&focus.point.lon=24.936

**Note:** Using parameter **focus.point** scores nearby places higher depending on how close they are to the focus.point so that places with higher scores will appear higher in the results list. After all the nearby results have been found, additional results will come from the rest of the world, without any further location-based prioritization.

## Language preference

The language preference can be defined using 'lang=xx' parameter, default being 'lang=fi'. Unlike in reverse
geocoding, the preference has significance for geocoding searches only when multiple languages provide
an equally good match. An example:

https://api.digitransit.fi/geocoding/v1/search?text=finlandia&lang=sv&size=1

https://api.digitransit.fi/geocoding/v1/search?text=finlandia&lang=fi&size=1

The first search returns Finladia-huset, Helsingfors, and the second one Finlandia-talo, Helsinki.
Both match the search string 'finlandia' equally well.

In most cases, an identified best match defines the language for the response, overruling the preference. An example:

https://api.digitransit.fi/geocoding/v1/search?text=ulrikasborg&lang=fi

In this case, the search string matches perfectly a swedish place name, and consiquently the result is
"Ulrikasborg, Helsingfors". In other words, the geocoding API does not act like a translation service.

**Note:** Part of the provided geocoding data does not include Swedish names, and part of the data
leaves the language context unknown. This may occasionally cause unexpected errors in language selection.

## Extra documentation

Geocoding API is implemented using Pelias. If you are interested, you can learn more about Pelias search API from:

> https://github.com/pelias/pelias-doc/blob/master/search.md
