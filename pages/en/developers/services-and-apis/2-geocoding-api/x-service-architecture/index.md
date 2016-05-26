---
title: Service architecture
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
