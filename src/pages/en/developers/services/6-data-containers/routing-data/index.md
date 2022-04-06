---
title: Routing Data
description:
  info: "Routing Data provides three OpenTripPlanner router zip files: Helsinki region, the Waltti regions, and whole Finland."
  architecture: https://raw.githubusercontent.com/HSLdevcom/digitransit-site/master/pages/en/developers/services/6-data-containers/routing-data/architecture.xml
assets:
  - title: "source"
    url: https://github.com/HSLdevcom/OpenTripPlanner-data-container
  - title: "DockerHub"
    url: https://hub.docker.com/r/hsldevcom/opentripplanner-data-container-hsl/
docker:
  dockerfile: https://github.com/HSLdevcom/OpenTripPlanner-data-container/blob/master/otp-data-container/Dockerfile.data-container
  imageName: hsldevcom/opentripplanner-data-container-hsl
  runContainer: docker run -d -p 8080:8080 --name hsl-data-container hsldevcom/opentripplanner-data-container-hsl
  accessContainer: http://localhost:8080/
---

## Data flow

The data flow is described in detail here: https://github.com/HSLdevcom/OpenTripPlanner-data-container/blob/master/README.md

## OpenTripPlanner router zip files

We provide a data container for each router (Finland, Waltti, HSL). The currently active routing data can be viewed from the corresponding production HTTP endpoints:

1. https://api.digitransit.fi/routing-data/v2/finland/

2. https://api.digitransit.fi/routing-data/v2/waltti/

3. https://api.digitransit.fi/routing-data/v2/hsl/

For example, the HSL routing data consists of the following files:

1. `build-config.json`
   This is the OTP configuration file that is used to build the OTP Graph file

2. `graph-hsl-753c4cfe9f63400f0ad093bc515d1bba6b8e14a1.zip`
   This is the prebuilt OTP graph file. The naming convention is `graph-<router_id>-<commit_hash>.zip`
   Digitransit OTP will first try to load this file and if it fails (version mismatch) it then downloads `router-hsl.zip` that contains all the data so that it can build the graph itself.

3. `hsl.pbf`
   OpenStreetMap data file for the HSL region (used by OTP)

4. `HSL.zip`
   GTFS file (other routers have many different GTFS files)

5. `router-config.json`
   The per-router customized runtime configuration for OTP.

6. `router-hsl.zip`
   Convenient package for OTP to load when it needs to build a graph (contains all the files)

7. `version.txt`
   A version file that contains a timestamp (for example '2017-08-18T02:32:45.635Z') of the time when the data was processed.

8. `hsl.tif`
   Elevation data file for the HSL regigon (used by OTP, not mandatory).

9. `connected.csv`
   List of stops that could be linked based on OSM data (for debugging purposes).

10. `unconnected.csv`
    List of stops that could not be linked based on OSM data but they still do exist in the graph (for debugging purposes).

[See how Routing API utilizes these zip files](../../../apis/1-routing-api/)

## Note to users of Finland routing data

The Finland dump files and container https://api.digitransit.fi/routing-data/v2/finland/ contains information concerning public transport services by the cities and ELY-centers. It also contain data relevant to long distance market based coach connections in Finland.

Source for coach connection data is https://finap.fi which is Finnish National Access point for multimodal data (EU/MMTIS). Data is provided by respective transport operators. Finap.fi data is licensed with CC 4.0 BY. Finap.fi service is operated by Fintraffic.

Please visit https://finap.fi and https://github.com/tmfg/mmtis-national-access-point/blob/master/docs/api/README.md if you are interested more wider use of Finap datasets.

For more information contact Fintraffic with support channel email: nap@fintraffic.fi

## Related open source projects

| URL                                                 | Project description                                                       |
| --------------------------------------------------- | ------------------------------------------------------------------------- |
| https://github.com/opentripplanner/OpenTripPlanner/ | OpenTripPlanner upstream                                                  |
| https://blog.openstreetmap.org/                     | OpenStreetMap blog                                                        |
| https://github.com/tru-hy/gtfs_shape_mapfit         | gtfs_shape_mapfit upstream, fits GTFS shape files to a given OSM map file |
| https://onebusaway.org/                             | OneBusAway project, the open source platform for real-time transit info   |
