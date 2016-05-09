---
title: Geocoding API
description:
  info: Geocoder with geocoding and reverse geocoding support.
  architecture: https://raw.githubusercontent.com/HSLdevcom/digitransit-site/master/pages/en/developers/service-catalogue/apis/geocoding-api/architecture.xml
assets:
  source: https://github.com/HSLdevcom/pelias-api
  DockerHub: https://hub.docker.com/r/hsldevcom/pelias-api/
  Dockerfile: https://github.com/HSLdevcom/pelias-api/blob/master/Dockerfile
  "Pelias fuzzy tests": https://github.com/HSLdevcom/pelias-fuzzy-tests
  "Pelias fuzzy tester": https://github.com/HSLdevcom/fuzzy-tester
docker:
  dockerfile: https://github.com/HSLdevcom/pelias-api/blob/master/Dockerfile
  imageName: hsldevcom/pelias-api
  buildScript: https://github.com/HSLdevcom/pelias-api/blob/master/build-docker-image.sh
  runContainer: docker run -d --name pelias-api -p 3100:3100 --link pelias-data-container hsldevcom/pelias-api
  accessContainer: curl "http://localhost:3100/v1/search?text=helsinki
---


## Service endpoints
Digitransit geocoding services are available via multiple API endpoints: geocoding, reverse geocoding and autocomplete.
These are documented below. The base url for all endpoints is:

> http:/api.digitransit.fi/pelias/v1/


### Autocomplete API
Autocomplete API can be used to make fuzzy searches e.g. when the user starts typing location into a search field.
Endpoint root is available at:
> http://api.digitransit.fi/geocoding/v1/autocomplete

Search for kamppi:
<pre>
curl "http://api.digitransit.fi/geocoding/v1/autocomplete?text=kampp"
</pre>

To focus searches around given point to boost local addresses and get distance from
focuspoint to result, you can use focus.point-params like so:
<pre>
curl "http://api.digitransit.fi/geocoding/v1/autocomplete?text=kamppi&focus.point.lat=60.1995&focus.point.lon=24.9363"
</pre>

To Read more about Pelias autocomplete API, check:
> https://github.com/pelias/pelias-doc/blob/master/autocomplete.md


### Search API
Search API provides a way to do more fine refined geocoding searches. Endpoint root is available at:
> http://api.digitransit.fi/geocoding/v1/search

To set amount of results use size param like so:
<pre>
curl "http://api.digitransit.fi/geocoding/v1/search?text=kamppi&size=1"
</pre>

To restrict searches to geographic area, use boundary.rect params:
<pre>
curl "http://api.digitransit.fi/geocoding/v1/search?text=kamppi&boundary.rect.min_lat=59.9&boundary.rect.max_lat=60.45&boundary.rect.min_lon=24.3&boundary.rect.max_lon=25.5"
</pre>

You can also search within a circular region:
<pre>
curl "http://api.digitransit.fi/geocoding/v1/search?text=kamppi&boundary.circle.lat=60.2&boundary.circle.lon=24.936&boundary.circle.radius=30"
</pre>

To Read more about Pelias search API, check:
> https://github.com/pelias/pelias-doc/blob/master/search.md

### Reverse geocoding API
Reverse geocoding means finding location near given coordinates. Endpoint root is available at:
> http://api.digitransit.fi/geocoding/v1/reverse

Get address for location like so:
<pre>
curl "http://api.digitransit.fi/geocoding/v1/reverse?point.lat=60.199284&point.lon=24.940540&size=1"
</pre>

To Read more about pelias Reverse API, check:
> https://github.com/pelias/pelias-doc/blob/master/reverse.md

### Running API tests

Read instructions from
> https://github.com/HSLdevcom/pelias-fuzzy-tests

## Key service delivery activities
1. Keep up with Pelias development on GitHub

> https://github.com/pelias/pelias

2. Keep up with Mapzen Search (which is essentially same as Pelias)

> https://mapzen.com/projects/search/

3. Keep up with Pelias-api upstream development on GitHub

> https://github.com/pelias/api

4. Keep up with Pelias fuzzy-tester upstream development on GitHub

> https://github.com/pelias/fuzzy-tester
