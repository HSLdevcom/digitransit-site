---
title: Service catalog
order: 5
---

## Digitransit hosted services

| Service                                    | Description                     | API base url                                |
|--------------------------------------------|---------------------------------|---------------------------------------------|
| [Alerts HSL - API ](../alerts-hsl-api/)    | HSL disruption info             | http://{environment}/hsl-alert/
| [Geocoding - Data ](../geocoding-data/)    | Geocoding data                  |
| [Geocoding - API ](../geocoding-api/)      | Geocoding API                   | http://{environment}/pelias/
| [Routing - Data](../routing-data/)         | Routing and timetable Data      |
| [Routing - API](../routing-api/)           | Routing and timetable API       | http://{environment}/otp/
| [Map - Data](../map-data/)                 | Map data                        |
| [Map - API](../map-api/)                   | Map raster and vector tiles API | TODO
| [Realtime HSL - API](../realtime-hsl-api/) | Realtime HSL API                | http://{environment}/navigator-server/, ws://213.138.147.225:1883/

## 3rd party hosted services

| Service                                      | Description                | API base url                               |
|----------------------------------------------|----------------------------|--------------------------------------------|
| [Alerts Oulu - API](../3rd-party-apis/)      | Oulu disruption info       | http://92.62.36.215:8080/gtfs-rt/service-alerts/
| [Realtime Oulu - API](../3rd-party-apis/)    | Realtime Oulu API          | http://92.62.36.215:8080/gtfs-rt/trip-updates/
| [Realtime VR - API](../3rd-party-apis/)      | Realtime VR API            | http://rata.digitraffic.fi/api/v1/
| [Realtime Tampere - API](../3rd-party-apis/) | Realtime Tampere API       | http://data.itsfactory.fi/journeys/api/1/vehicle-activity/
