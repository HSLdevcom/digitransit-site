---
title: Realtime API
description:
  info: Collection of components that provide realtime related services
  architecture: https://raw.githubusercontent.com/HSLdevcom/digitransit-site/master/pages/en/developers/service-catalogue/apis/realtime-api/architecture.xml
---
## API description
Heavy lifting of realtime data is done in other systems. In fact, we don't have one single API to query all realtime data so in that sense term "Realtime API" is misleading. Digitransit integrates itself to various datasources in order to read realtime data from the vehicles. How this is done depends on which city we are talking about.

Most realtime related services are marked as [internal components](../../internal-components/) because Digitransit realtime work is in progress. You can try to use realtime interfaces by yourself but they are very likely to change in the near future.

## What does 'Realtime' mean?
Basically, Digitransit has support for [GTFS-RT](https://developers.google.com/transit/gtfs-realtime/) Feed types, which are:
1. Vehicle positions
2. Trip updates
3. Service alerts

It depends on the realtime interface which of the feed types it provides.

## Realtime predictions are available in Routing API
Realtime data is read into the [Routing API](../routing-api/). This means that Routing API returns results that contain predictions. [See architecture](../../../architecture/) how internal components are wired to Routing API.

## Situation in HSL
Current Digitransit implementation is a "partially working solution" built on top of legacy APIs. This means that:
- Not all vehicles have realtime information available
- There might be mysterious bugs lurking in realtime the data

Note that this is not the final solution. In the near future new ticketing and information system will replace all legacy components related to HSL realtime. This transition will improve situation considerably. Read more at:
> https://www.hsl.fi/lippu-ja-informaatiojarjestelma

If you are really intrested in implementing some realtime features, you should look at [Digitransit-ui](../../digitransit-ui/) and it's [source code](https://github.com/HSLdevcom/digitransit-ui). That way you can get idea how realtime is used there.

## Situation in Finnish Transport Agency
Currently, FTA provides realtime information for trains at http://rata.digiraffic.fi . We have a simple wrapper (raildigiraffic2gtfsrt) that transforms that data to GTFS-RT trip updates.

Finnish Transport Agency is investigating possibility to build National realtime service which would collect realtime data from all around the Finland.

## Situation in other cities
We don't have that much control over other cities and the data they provide. We have integrated e.g. data from Oulu just to see how it behaves.
