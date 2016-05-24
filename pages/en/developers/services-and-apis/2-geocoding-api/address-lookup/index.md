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
