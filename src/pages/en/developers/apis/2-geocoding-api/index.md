---
title: Geocoding API
---
Unlike the routing API that uses GraphQL, the geocoding API is a traditional REST interface.

The geocoding API provides a way to perform address searches and address lookups (also known as reverse geocoding).

This API is very simple, supporting only GET requests to perform searches. Geocoding results are returned in [GeoJSON](https://en.wikipedia.org/wiki/GeoJSON) format.

Check examples for [Address lookup](./address-lookup/), [Address search](./address-search/) and [Autocompletion](./autocomplete/).

## Extra documentation

Geocoding API is implemented using Pelias. If you are interested, you can learn more about the Pelias search API from:

> https://github.com/pelias/documentation

