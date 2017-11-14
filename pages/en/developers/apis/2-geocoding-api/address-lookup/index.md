---
title: Address lookup
---

Address lookup, aka. reverse geocoding, means finding address for given coordinates.

## Reverse geocoding endpoint

Endpoint root is available at:
> http://api.digitransit.fi/geocoding/v1/reverse

### Example to get address for given coordinates (cURL)

```
curl "http://api.digitransit.fi/geocoding/v1/reverse?point.lat=60.199284&point.lon=24.940540&size=1"
```

### Example to get address for given coordinates (Browser)

http://api.digitransit.fi/geocoding/v1/reverse?point.lat=60.199284&point.lon=24.940540&size=1

### Language preference

http://api.digitransit.fi/geocoding/v1/reverse?point.lat=60.195&point.lon=24.93&lang=sv&size=1

Note, that part of the provided geocoding data does not include Swedish names, and part of the data
does not specify the language at all. A swedish-speaking person may add a new address entry
'Fabriksgatan xx, Helsingfors' to OpenStreetMap without specifying the language.
Address lookup always searches across all documents and returns found items in the preferred
language if such a language-bound name version is available, otherwise using the default name,
which in reality can represent any language. Most default names are of course in Finnish.
