---
title: Alerts HSL - API
---

## Description
HSL Alerts API can be used to query realtime updates about HSL fleet in GTFS-RT format

## Service architecture
Service connects to Poikkeusinfo v3 xml interface, reads this data, and converts it to GTFS-RT
> http://www.poikkeusinfo.fi/xml/v3

> https://developers.google.com/transit/gtfs-realtime/?hl=en

![Architecture](./architecture.jpg)

## API Documentation
At the moment, service provides only GTFS-RT service alerts. Read more:
> https://developers.google.com/transit/gtfs-realtime/service-alerts

In near future, also trip updates are included:
> https://developers.google.com/transit/gtfs-realtime/trip-updates

Service endpoint is available:
> http://{environment}/hsl-alert/

You can check some code examples from Google:
> https://developers.google.com/transit/gtfs-realtime/code-samples

## Service dependencies
No Digitransit related service dependencies. Reads data from http://www.poikkeusinfo.fi/xml/v3

## Project assets

| Asset         | url                                                                       |
|---------------|---------------------------------------------------------------------------|
| Code          | https://github.com/HSLdevcom/hslalert/  
| Dockerfile    | https://github.com/HSLdevcom/hslalert/blob/master/Dockerfile
| Docker image  |


## Key service delivery activities
1. Keep up with HSLAlerts upstream development (there probably won't happen much)
> https://github.com/samuelmr/hslalert
2. Follow Google transit community and its mailing lists (especially GTFS-RT):
> https://developers.google.com/transit/community?hl=en

> https://groups.google.com/forum/#!forum/gtfs-realtime

## Key technologies and specifications
- Python
- GTFS-RT
