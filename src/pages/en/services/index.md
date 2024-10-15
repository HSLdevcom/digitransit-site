---
title: Services
panels: []
---

## Digitransit services

The main components of Digitransit service platform are:

1. Multimodal routing engine
2. Address search
3. Background map service
4. Web browser-based user interface

The first three of these need some source data. Digitransit includes the respective data loading processes for them.

The multimodal routing engine OpenTripPlanner uses GTFS-compliant public transit data together with map information from OpenStreetMap in pbf form.

The address search engine is based on Pelias open source project. The service searches coordinates for place names and addresses, or
returns the nearest place / address from the given coordinate point.

The background map service provides map information as raster and vector tiles.

Digitransit user interface is a browser based application, which combines the above mentioned services for example in route itinerary searches.

In addition to these main components, Digitransit includes a set of additional services for realtime and information purposes. They are not
mandatory for running the multimodal trip planning service.


## Deploying a Digitransit service instance

All Digitransit micro services are packaged as Docker containers, which are easy to run in your own server. To certain extent,
it is possible to tune and modify the execution of the containers using environment variables.

The easiest solution is to use the source data provided by Digitransit (OpenTripPlanner data container, Pelias data container, hsl-map-server).
However, the service will then work only on areas covered by existing Digitransit data sources.

To use your own data in a microservice, you need to copy the respective data loading process of Digitransit and modify it to suit your needs.
In some cases, it may be sufficient to define additional data sources using environment variables (OpenTripPlanner data loader allows this),
but in general case, you have to fork the source code repository of github/hsldevcom and modify it, or develop a totally new data loader.

The dataloading configuration for OpenTripPlanner routing is fairly easy to modify to include desired data sources.
The configuration includes a list of web addresses, from where the loader fetches GTFS packages, and the address of OSM map data.
It is a straightforward task to replace these addresses.

Source data for Pelias address search is collected and processed with a set of scripts. A single data source is processed using
a tailored javascript library, for example https://github.com/hsldevcom/pelias-gtfs for stop data. Unnecessary scripts can be removed and new
ones added to obtain the desired address data collection. It should be noted that the administrational attributes (neighbourhood, locality, postal area etc)
are mapped to address items using built-in area information fetched from WhosOnFirst data service. This mechanism should be replaced
or the data content changed.

The dataloading process of background maps is heavily tied with services provided by HSL. A replacement can be developed by following
the [map api specifications](../developers/apis/3-map-api).


It should be noted that hosting only a subset of services and using APIs of Digitransit for the rest is also possible. For example, a new local
routing service in Finland may well use the address search of Digitransit, because it covers the whole country.

An example of hosting your private  trip planning service using Helsinki region data:

1. Install Docker environment

2. Start the multimodal routing engine:

```bash
docker run -d --rm  -p 9080:8080 -e ROUTER_NAME=hsl -e JAVA_OPTS=-Xmx3g -e ROUTER_DATA_CONTAINER_URL=https://api.digitransit.fi/routing-data/v2/hsl hsldevcom/opentripplanner:prod
```

OpenTriPlanner services are now available in the address `localhost:9080`.

3. Start the address information database:

```bash
docker run -d --rm --name pelias-data-container hsldevcom/pelias-data-container
```

4. Start the address search engine:

```bash
docker run -d --rm --name pelias-api -p 3100:8080 --link pelias-data-container:pelias-data-container hsldevcom/pelias-api
```

Address search is now served at `localhost:3100`. To test, open a browser and browse to url `https://localhost:3100/v1/search?text=Helsinki`

5. Run the user interface service:

```bash
docker run -d --rm  -p 8080:8080 -e OTP_URL=http://localhost:9080/otp/ -e CONFIG=hsl -e GEOCODING_BASE_URL=localhost:3100/v1 hsldevcom/digitransit-ui
```

You can now browse to the address `localhost:8080` and use your private trip planning service, which uses background maps from Digitransit API.


## Theming the user interface

The default theme of Digitransit user interface does not include any city specific features. It is configured to work with the data of whole Finland.

The UI can be themed and configured to suit a new target area by adding a new configuration file into to repository
https://github.com/HSLdevcom/digitransit-ui, to the folder `app/configurations`. For more information, check out
https://github.com/HSLdevcom/digitransit-ui/blob/master/docs/Themes.md .

The language collection available in the user interface can be extended by adding required strings into `app/translations.js` file and by updating
the language selector component respectively.


## Resources

Examples:

- Routing engine OpenTripPlanner with the data of whole Finland requires 12 GB of RAM and a powerful multi core CPU.
- Address search which covers whole Finland requires 3 GB of RAM for API server (pelias-api) and 4 GB of RAM for address database (pelias-data-container).
A powerful CPU will speed up the service.
- background map server (hsl-map-server) needs 4 GB of RAM and a basic CPU.
- UI-server reuires 1 GB of RAM and a basic CPU.

These resurces can serve multiple simultaneous uses without delays. If the service load is high, it may be necessary to deploy a load balancing
solution to distribute service request to multiple servers. For example, Digitransit uses over 20 OpenTripPlanner instances to serve
the capital area of Finland.


It is possible to optimize the resources and speed up the response times using various caching technologies (CDN, proxy caching).
Especially the background map service benefits from those.


## Country specific features of Digitransit

The OpenTripPlanner fork developed for Digitransit is fairly generic, and does not include significant features specific only to Finland.
Some features such as ticket price computation for Helsinki area can be activated using suitable configuration.

Pelias address search has been modified to support searches in many languages and local character set. All country specific features are defined
in the configuration file.

## Links to source code repositories

- [Routing engine](https://github.com/HSLdevcom/OpenTripPlanner)
- [Routing data loading](https://github.com/HSLdevcom/OpenTripPlanner-data-container)
- [Address search](https://github.com/HSLdevcom/pelias-api)
- [Address data loading](https://github.com/HSLdevcom/pelias-data-container)
- [Background maps](https://github.com/HSLdevcom/hsl-map-server)
- [Web UI](https://github.com/HSLdevcom/digitransit-ui)



