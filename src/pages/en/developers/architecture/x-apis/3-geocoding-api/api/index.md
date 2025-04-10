---
title: API
assets:
  - title: "source"
    url: https://github.com/HSLdevcom/pelias-api
  - title: "DockerHub"
    url: https://hub.docker.com/r/hsldevcom/pelias-api/
  - title: "Dockerfile"
    url: https://github.com/HSLdevcom/pelias-api/blob/master/Dockerfile
  - title: "Pelias fuzzy tests"
    url: https://github.com/HSLdevcom/pelias-fuzzy-tests
  - title: "Pelias fuzzy tester"
    url: https://github.com/HSLdevcom/fuzzy-tester
docker:
  dockerfile: https://github.com/HSLdevcom/pelias-api/blob/master/Dockerfile
  imageName: hsldevcom/pelias-api:prod
  buildScript: https://github.com/HSLdevcom/pelias-api/blob/master/.github/workflows/scripts/build_and_push_dev.sh
  runContainer: docker run -d --name pelias-api -p 3100:8080 --link pelias-data-container hsldevcom/pelias-api
  accessContainer: curl "http://localhost:3100/v1/search?text=helsinki"
---

Geocoder with geocoding and reverse geocoding support.

## Running API tests

Read instructions from

> https://github.com/HSLdevcom/pelias-fuzzy-tests

## Related open source projects

| URL                                    | Project description                                 |
| -------------------------------------- | --------------------------------------------------- |
| https://github.com/pelias/pelias       | Pelias development on GitHub                        |
| https://mapzen.com/projects/search/    | Mapzen Search (which is essentially same as Pelias) |
| https://github.com/pelias/api          | Pelias-api upstream development on GitHub           |
| https://github.com/pelias/fuzzy-tester | Pelias fuzzy-tester upstream development on GitHub  |
