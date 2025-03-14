---
title: FAQ
---

## Routing API

### Where do I find information on the routing API query types and parameters?

> If you have any questions related to query types, their fields and parameters, please use the Docs functionality of [GraphiQL](../1-routing-api/1-graphiql/). <br><br> For example, open [GraphiQL for the Helsinki region](https://api.digitransit.fi/graphiql/hsl/v2/gtfs/v1) and click the documentation icon in the upper left corner. This will open the documentation explorer on the left side of the screen.

### Why are some route patterns rendered as straight lines from one stop to the next?
  
> To display actual route geometries, [GTFS shapes](https://developers.google.com/transit/gtfs/reference/#shapestxt) are needed. These are not necessarily available for all cities and routes, but are generally added to the source material of Digitransit as they become available. Availability of route geometries depends on the local public transport authorities. In Finland, route geometries for towns part of the Waltti-system are managed by Waltti Solutions Oy. For more information and contacts regarding Waltti-areas, see http://waltti.fi/.

### How do I query the timetables for a specific stop in my city?

> In order to build your query you first need to know which endpoint to query. If your city is part of Waltti, for example, you should use the Waltti endpoint. You'll find the endpoint URL's [here](../1-routing-api/0-graphql/). Then, you need to find out the ID of the stop you are interested in. If you don't know it yet, you can start by querying all stops according to the first example on the [Routing API stop page](../1-routing-api/stops/). After this, you can use the last example provided on that page to query for stoptimes for the particular stop.

### How do I find out the time adjustment/equilization stops of a route or stop?

> By querying the stoptimes for a pattern (of a route or stop), you can investigate the `timepoint` field of the `stoptime`. This field indicates if the stop serves as a time equalization stop for the pattern.

### How do I know which stops are end/final stops?

> This depends on if you want to know the final stop of a route, or if you want to know if a specific stop is the final stop for any of the routes that serve it. If you want to find out the final stop of a route/pattern, you can simply query for the stops of the pattern you are interested in and the final stop will be the last in the list. If you want to know if a specific stop is the final stop for any of the trips passing through it, query for the list of stops of the trip and check if the stop is last in the list.

### How do I know if a vehicle can be boarded from a specific stop?

> Check field `pickupType` of the `stoptime`. `pickupType` will be `NONE` for trips that cannot be boarded from the specific stop. Usually `pickupType: NONE` indicates that the stop is the final stop of a pattern, but in some cases there are stops in the middle of a pattern that are only used for dropoffs. With the query below, you can list trips that use the stop and whether the vehicle can be boarded from that stop.
 
```graphql
{
    stop(id:"HSL:1040289") {
        stoptimesWithoutPatterns{
            trip {
                route {
                    shortName
                }
            }
            pickupType
        }
    }
}
```

## Real-time API

### Is it possible to register multiple lines in one topic, e.g. like this: `/hfp/journey/bus//4611,4611B//////+/#A`

> No, you need to make multiple subscriptions, e.g. `mqtt subscribe -h mqtt.hsl.fi -l mqtts -p 8883 -v -t '/hfp/journey/bus//2550/#' -t '/hfp/journey/bus//4615/#'`

### How do I know which bus "7ef0d44e" is? I know that it's the number of a bus (for example Helsingin Bussiliikenne 1212).

> It's simply an (opaque) id number that lets you connect multiple location messages into movement. Depending on the data source, it can also be the license plate number of a car or similar.
