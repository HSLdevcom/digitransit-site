---
title: System architecture
---

Digitransit architecture is based on microservices architecture. Microservices are small, autonomous services that
work together that allow us to build larger applications on top of APIs that the services provide.

![Architecture](./architecture.svg)

[Open full size image](http://www.digitransit.fi/en/developers/architecture/architecture.svg)

In picture above, we have five kinds of services

1. Public APIs (green)
2. Data containers (yellow)
3. User interface (blue)
4. Internal components (red)
5. External components (gray)

## Public APIs
These services are provided by the platform and are part of supported public API.
[See all public apis](../service-catalogue/apis/)

## Data containers
Data containers are images that are used to gather and compile data needed for APIs by the platform and are part
[See available data containers](../service-catalogue/data-containers/)

## User interface
We have built a mobile friendly user interface on top of public APIs [See it here](../service-catalogue/digitransit-ui/)

## Internal components
They are either small conversion modules that convert from various sources. You should not probably use these as public
APIs, because they are likely to change. However, if you are interested
[you can browser internal components here.](../service-catalogue/internal-components/)

## External components
External compoments are something that Digitransit depends on. Someone else than us takes care that they work.
