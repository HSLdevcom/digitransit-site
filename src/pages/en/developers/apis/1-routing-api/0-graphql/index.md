---
title: GraphQL
# replit:
#   title: "Examples"
#   note: "The examples below send a GraphQL query using HTTP POST to <code>https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql</code>. This example query asks the server to find a stop with the ID <i>HSL:1040129</i> and return its name, latitude and longitude coordinates, and whether is is accessible by wheelchair.<br/><b>Note:</b> If the examples provided do not return expected results, the stop id  may not be in use any more and you should try again with an existing id."
#   embeds:
#     -
#       title: "Content-Type: application/graphql"
#       url: https://repl.it/@digitransit/StopRequestGraphQL1
#       height: 750px
#     -
#       title: "Content-Type: application/json"
#       url: https://repl.it/@digitransit/StopRequestGraphQL2
#       height: 750px
order: 10
---

## What is GraphQL?

[GraphQL](http://graphql.org/) is a query language for APIs and a runtime for fulfilling those queries with your existing data. The standard was created by Facebook. Basically, you can think of it as “client side SQL”. When implementing a GraphQL API, server developers specify a GraphQL schema that defines what can be queried. Instead of the client calling REST-like urls, it generates different GraphQL queries and sends these queries to the single endpoint of the API. The server then parses the query, executes it, and returns the results back to client.

## Using GraphQL

### Creating and sending queries

Queries are written in GraphQL language and sent to the API in request body of a **HTTP POST** request with either `"application/graphql"` or `"application/json"` as *Content-Type*.
<br/>Queries define what type of data and what fields of the data are requested.
<br/>The API returns a result corresponding to the query in **JSON** format.

The following queries would request a stop with id `HSL:1173434` and return its name and coordinates:

* Using `Content-Type: "application/graphql"`:

```graphql
{
  stop(id: "HSL:1173434") {
    name
    lat
    lon
  }
}

```

* Using `Content-Type: "application/json"`

```json
{
  "query": "{
    stop(id: \"HSL:1173434\") {
      name
      lat
      lon
    }"
}
```

**Example response:**
```json
{
  "data": {
    "stop": {
      "name": "Asemapäällikönkatu",
      "lat": 60.199135,
      "lon": 24.94007
    }
  }
}
```

### IDs

All objects in the GraphQL API have a global ID (field `id`), which can be used as a cache key or to refetch the object using query type **node**.

Global IDs in the Routing API are defined by [Relay](https://facebook.github.io/relay/graphql/objectidentification.htm) and should not be confused with other IDs (such as `gtfsId`) that objects may have.

### Interfaces

GraphQL supports interfaces, which objects can implement by including fields required by the interface. Two interfaces used in the Routing API are **Node** (which has the field `id` used for global IDs) and **PlaceInterface**.

If a query type returns an interface, [inline fragments](https://graphql.org/learn/queries/#inline-fragments) have to be used to access fields defined by the object implementing the interface.

For example, query type **nearest** returns a list of **PlaceInterfaces** and types **BikePark** and **Stop** implement **PlaceInterface**.<br/>
The following query returns field `spacesAvailable` for bike parks and field `code` for stops.
```graphql
{
  nearest(lat: 60.19414, lon: 25.02965, maxResults: 3, maxDistance: 1500, filterByPlaceTypes: [STOP, BIKE_PARK]) {
    edges {
      node {
          place {
            lat
            lon
            ...on Stop {
              name
              gtfsId
              code
            }
            ...on BikePark {
              name
              bikeParkId
              spacesAvailable
            }
          }
          distance
      }
    }
  }
}
```

### Variables

For more complex queries, variables can be useful.<br/>
To use variables, queries must be sent with Content-Type **application/json** and the query must have an operation name.

Variables are sent in a JSON object with key `variables`.

For example, the following query would request a route with name `550` (using *Routes* as an operation name):
```json
{
  "query": "query Routes($name: String) {
             routes(name: $name) {
               gtfsId
               shortName
               longName
             }
           }",
  "variables": {
    "name":"550"
  }
}
```

### <a name="batching"></a>Batching

Multiple queries can be combined and sent in one POST request. Batched queries require less server roundtrips and can be processed more efficiently on the server.

For example, the following query would request a stop with id `HSL:1173434` and a route with id `HSL:1009`:
```graphql
{
  stop(id: "HSL:1173434") {
    name
    lat
    lon
    routes {
      shortName
      longName
    }
  }
  route(id: "HSL:1009") {
    shortName
    longName
  }
}
```

If the request includes multiple queries with same type, they must be renamed using aliases. For example, the following query would request two routes and return them as `route1` and `route2`:

```graphql
{
  route1: route(id: "HSL:2550") {
    shortName
    longName
  }
  route2: route(id: "HSL:2551") {
    shortName
    longName
  }
}
```

### Pagination
* Query types which support pagination can be used without pagination by omitting arguments `first` and `after`, in which case all data is returned on one page

Some query types support pagination, which can be used to limit the amount of data returned per query.
<br/>Query types which support pagination return a [Relay cursor connection](https://facebook.github.io/relay/graphql/connections.htm) to the data.

For example, **stopsByRadius** supports pagination. The following query requests stops within 300m of 60.19924, 24.94112 and returns 2 stops per page (argument `first`).
```graphql
{
  stopsByRadius(lat: 60.19924, lon: 24.94112, radius: 300, first: 2) {
    edges {
      node {
        stop {
          name
          lat
          lon
        }
        distance
      }
      cursor
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
```

An example response:
```json
{
  "data": {
    "stopsByRadius": {
      "edges": [
        {
          "node": {
            "stop": {
              "name": "Asemapäällikönkatu",
              "lat": 60.199135,
              "lon": 24.94007
            },
            "distance": 136
          }
        },
        {
          "node": {
            "stop": {
              "name": "Ratamestarinkatu",
              "lat": 60.198534,
              "lon": 24.939466
            },
            "distance": 285
          }
        }
      ],
      "pageInfo": {
        "hasNextPage": true,
        "endCursor": "c2ltcGxlLWN1cnNvcjE="
      }
    }
  }
}
```

The field `hasNextPage` indicates whether all data has been returned or not.
<br />If `hasNextPage` is `true`, the next page can be queried by using the value of `endCursor` for argument `after` in the query.

For example, the following query returns the next page of data:
```graphql
{
  stopsByRadius(lat: 60.19924, lon: 24.94112, radius: 300, first: 2, after: "c2ltcGxlLWN1cnNvcjE=") {
    edges {
      node {
        stop {
          name
          lat
          lon
        }
        distance
      }
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
```
An example response:
```json
{
  "data": {
    "stopsByRadius": {
      "edges": [
        {
          "node": {
            "stop": {
              "name": "Kellosilta",
              "lat": 60.20068,
              "lon": 24.93897
            },
            "distance": 293
          }
        },
        {
          "node": {
            "stop": {
              "name": "Pasilan asema",
              "lat": 60.198626,
              "lon": 24.937843
            },
            "distance": 294
          }
        }
      ],
      "pageInfo": {
        "hasNextPage": false,
        "endCursor": "c2ltcGxlLWN1cnNvcjM="
      }
    }
  }
}
```

### GraphQL clients

In most cases, a GraphQL client should be used instead of plain HTTP requests, as GraphQL clients have many useful features (such as caching, batching and validating queries), which would otherwise have to be implemented manually.

Two commonly used GraphQL clients are
* [Relay](http://facebook.github.io/relay/en/) by Facebook, supports React
* [Apollo](https://www.apollographql.com/client), supports multiple development platforms, including Android and iOS

## Further reading

* The [GraphQL site](https://graphql.org/learn/) provides more information on how to use GraphQL
* [How Facebook sees GraphQL](https://facebook.github.io/relay/docs/thinking-in-graphql.html)

