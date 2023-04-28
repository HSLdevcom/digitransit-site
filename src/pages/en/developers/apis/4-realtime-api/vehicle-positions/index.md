---
title: Vehicle positions
order: 40
---

## Through MQTT

For some Waltti cities, the vehicle positions are available in GTFS-RT format through [the Digitransit MQTT broker](./digitransit-mqtt/) and for HSL area, the vehicle positions are available in custom format through [the HSL high frequency positioning API](./high-frequency-positioning/). Through those, user doesn't have to download the whole data set but can only receive updates to the relevant vehicles in realtime.

# Through HTTP

[Waltti open data](https://opendata.waltti.fi/) provides GTFS-RT vehicle positions for many cities around Finland and for the HSL region, they are available from [the HSL GTFS-RT API](https://hsldevcom.github.io/gtfs_rt/). These feeds provide one file per region or city that contains all the vehicles.
