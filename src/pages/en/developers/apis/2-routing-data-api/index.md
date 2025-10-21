---
title: Routing data API
---
The routing data API provides four OpenTripPlanner (OTP) router datasets: Finland and Estonia, HSL region,
Southwest Finland region and Waltti cities. The available data sets are documented in
[the architecture page for this API](../../architecture/x-apis/2-routing-data-api/).

## OpenTripPlanner data and configuration files

The available files are split into different endpoints for each of our routers (finland, hsl, varely and waltti). The currently
active routing data can be viewed from the corresponding production HTTP endpoints (use of either `digitransit-subscription-key`
URL parameter or a header is needed, browsing with a browser can be clumsy due to this limitation):

1. https://api.digitransit.fi/routing-data/v3/finland/

2. https://api.digitransit.fi/routing-data/v3/hsl/

3. https://api.digitransit.fi/routing-data/v3/varely/

4. https://api.digitransit.fi/routing-data/v3/waltti/


### Contents of the endpoints

There are three types of files availables (some files are used for two purposes):
1. Files that are used to run an OTP server.
2. Files that are used to build a graph for OTP.
3. Log files.

See how Routing API utilizes these files on [the routing API page](../1-routing-api/).

Contents differ for different
endpoints, but these examples are for the HSL endpoint:

#### Files for running OTP

1. `graph-hsl-753c4cfe9f63400f0ad093bc515d1bba6b8e14a1.zip`
   This zip contains the required files to run OpenTripPlanner server. The naming convention is `graph-<router_id>-<commit_hash>.zip`

2. `graph.obj`
   A graph that can be loaded into latest version of OpenTripPlanner.

3. `streetGraph.obj`
   (only exists if prebuilt street only graph was used to generate the complete graph)
   A street only graph that is used to generate the complete graph.

4. `otp-config.json`
   The configuration for enabling or disabling features in OTP.

5. `router-config.json`
   The per-router customized runtime configuration for OTP.

#### Files for building OTP graph

1. `build-config.json`
   This is the OTP configuration file that is used to build the OTP Graph file.

2. `hsl.pbf`
   OpenStreetMap data file for the HSL region (used by OTP).

3. `HSL.zip`
   GTFS file (other routers have many different GTFS files).

4. `HSL-lautta.zip`
   GTFS file (other routers have many different GTFS files).

5. `otp-config.json`
   The configuration for enabling or disabling features in OTP.

6. `router-config.json`
   The per-router customized runtime configuration for OTP.

7. `router-hsl.zip`
   This zip contains the required files to build new OpenTripPlanner graph.

8. `hsl.tif`
   Elevation data file for the HSL region (used by OTP, not mandatory).

#### Build log files

1. `report`
   Directory containing issues and information from the previous graph build.

2. `street-report` 
   (only exists if prebuilt street only graph was used to generate the complete graph)
   Directory containing issues and information from the previous street only graph build.

3. `build.log`
   Log of the previous graph build.

4. `street-build.log`
   (only exists if prebuilt street only graph was used to generate the complete graph)
   Log of the street only graph build used for the previous complete graph build.

5. `version.txt`
   A version file that contains a timestamp (for example '2017-08-18T02:32:45.635Z') of the time when the data was processed.

6. `connected.csv`
   List of stops that could be linked based on OSM data (for debugging purposes).

7. `unconnected.csv`
    List of stops that could not be linked based on OSM data but they still do exist in the graph (for debugging purposes).

## Note to users of Finland and Estonia routing data

[The Finland and Estonia data endpoint](https://api.digitransit.fi/routing-data/v3/finland/) contains information concerning public transport services by the cities and ELY-centers as well as data relevant to long distance market based coach connections in Finland. It also contains data for Estonia.

Source for coach connection data is https://finap.fi which is Finnish National Access point for multimodal data (EU/MMTIS). Data is provided by respective transport operators. Finap.fi data is licensed with CC 4.0 BY. Finap.fi service is operated by Fintraffic.

Please visit https://finap.fi and https://github.com/tmfg/mmtis-national-access-point/blob/master/docs/api/README.md if you are interested more wider use of Finap datasets.

For more information contact Fintraffic with support channel email: nap@fintraffic.fi

## Related links

| URL                                                          | Project description                                                       |
| ------------------------------------------------------------ | ------------------------------------------------------------------------- |
| https://github.com/hsldevcom/OpenTripPlanner/                | Digitransit fork of OpenTripPlanner                                       |
| https://github.com/opentripplanner/OpenTripPlanner/          | OpenTripPlanner upstream                                                  |
| https://github.com/hsldevcom/opentripplanner-data-container/ | Digitransit fork of OpenTripPlanner                                       |
| https://blog.openstreetmap.org/                              | OpenStreetMap blog                                                        |
