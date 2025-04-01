---
title: Deprecations
order: -11
---

## 26.11.2024 announced and the old APIs will be removed 3.4.2025
- Routing v1 API will be replaced by Routing v2 API. The new API is documented in the [routing API documentation](../apis/1-routing-api/).

- Routing data v2 API will be replaced by Routing data v3 API. The new API is documented in the [routing data API documentation](../apis/2-routing-data-api/).

- Map v3 API replaces the old Map v2 API. The new API is documented in the [map API documentation](../apis/4-map-api/).


## 11.3.2022 announced and removed 4.4.2023
- https://hsldevcom.github.io/gtfs_rt/ replaces the following API endpoints:
  - https://api.digitransit.fi/realtime/trip-updates/v1/HSL
  - https://api.digitransit.fi/realtime/trip-updates/v2/hsl
  - https://api.digitransit.fi/realtime/service-alerts/v1/
  - https://api.digitransit.fi/realtime/service-alerts/v2/hsl
  - https://api.digitransit.fi/realtime/vehicle-positions/v1/
  - https://api.digitransit.fi/realtime/vehicle-positions/v2/hsl
  - https://api.digitransit.fi/realtime/raildigitraffic2gtfsrt/v1/hsl*

- https://api.digitransit.fi/map/v2 replaces all https://api.digitransit.fi/map/v1 endpoints. For more information, visit [map endpoints](../apis/4-map-api).

- https://api.digitransit.fi/realtime/raildigitraffic2gtfsrt/v1/national is replaced by https://rata.digitraffic.fi/api/v1/trains/gtfs-rt-updates
