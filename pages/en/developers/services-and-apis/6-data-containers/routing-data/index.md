---
title: Routing Data
description:
  info: "Routing Data provides two OpenTripPlanner router zip files: Helsinki city area and whole Finland."
  architecture: https://raw.githubusercontent.com/HSLdevcom/digitransit-site/master/pages/en/developers/service-catalogue/data-containers/routing-data/architecture.xml
assets:
  source: https://github.com/HSLdevcom/OpenTripPlanner-data-container
  DockerHub: https://github.com/HSLdevcom/opentripplanner-data-container
  Dockerfile: https://github.com/HSLdevcom/OpenTripPlanner-data-container/blob/master/Dockerfile
docker:
  dockerfile: https://github.com/HSLdevcom/OpenTripPlanner-data-container/blob/master/Dockerfile
  imageName: hsldevcom/opentripplanner-data-container
  buildScript: https://github.com/HSLdevcom/OpenTripPlanner-data-container/blob/master/build-docker-image.sh
  runContainer: docker run -d -p 8080:8080 --name opentripplanner-data-container hsldevcom/opentripplanner-data-container
  accessContainer: http://localhost:8080/routers.txt
---

## Dataflow

First, we download raw data in various formats from Helsinki, Tampere, Oulu, etc. and this data is stored on disk. Also, we load Finnish national data from Finnish Transport Agency that contains national routes for e.g. trains. Some data is cleaned, some isn’t.

For Helsinki and Tampere data we apply GTFS shape to OSM map transformation. The purpose of this step is to better allign routes on OSM map. In different map datasources road locations can slightly vary and this step allows us to better draw routes on OSM map.

After conversion some GTFS transformations are done using OneBusAway transformer http://developer.onebusaway.org/modules/onebusaway-gtfs-modules/1.3.4-SNAPSHOT/onebusaway-gtfs-transformer-cli.html

Route data flow can be studied more closely here: https://github.com/HSLdevcom/opentripplanner-data-container/blob/master/build-routers.sh

Finally we build two separate zip files; router-hsl.zip and router-finland.zip. These files contain:
- Modified and combined GTFS
- OpenStreetMap graph
- OpenTripPlanner router-config.json file
- OpenTripPlanner build-config.json file
- HSL citybike file

## OpenTripPlanner router zip files
Produced zip files can be used to build OpenTripPlanner graph. In addition it provides a "routers.txt" file that lists all available router zip files:
> http://localhost:8080/routers.txt

[See how Routing API utilizes these zip files](../routing-api/)

## Key service delivery activities
1. Keep up with OpenStreetMap blog<br/>
   https://blog.openstreetmap.org/

2. Keep up with gtfs_shape_mapfit upstream<br/>
   https://github.com/tru-hy/gtfs_shape_mapfit

3. Keep up with OneBusAway project<br/>
   http://onebusaway.org/
