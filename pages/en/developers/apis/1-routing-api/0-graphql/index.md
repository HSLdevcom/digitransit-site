---
title: GraphQL
---

## What is GraphQL?

[GraphQL](http://graphql.org/) is a query language for APIs and a runtime for fulfilling those queries with your existing data. The standard was created by Facebook. Basically, you can think of it as “client side SQL”. When implementing a GraphQL API, server developers specify a GraphQL schema that defines what can be queried. Instead of the client calling REST-like urls, it generates different GraphQL queries and sends these queries to the single endpoint of the API. The server then parses the query, executes it, and returns the results back to client.

## GraphQL benefits

There are many. You can read [how Facebook sees it](https://facebook.github.io/relay/docs/thinking-in-graphql.html). Also, the [GraphQL site](https://graphql.org/learn/) provides more information on how to use GraphQL.

## Using GraphQL

### Creating and sending queries

Queries are written in GraphQL language and sent to the API using **HTTP POST method** with **"application/graphql"** as Content-Type.
<br/>Queries are used to define what type of data and what fields of the data are requested.
<br/>The API returns a result corresponding to the query in **JSON** format.

For example, the following query would request a stop with id `HSL:1173434` and return its name and coordinates:
```
{
  stop(id: "HSL:1173434") {
    name
    lat
    lon
  }
}
```

Example result for the query:
```
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


## cURL examples

The examples below send a GraphQL query using HTTP POST to `https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql`. This example query asks the server to find a stop with the ID "HSL:1040129" and return its name, latitude and longitude coordinates, and whether is is accessible by wheelchair.

You can download cURL here:
> https://curl.haxx.se/

**1. Linux & OSX**

Using Content-Type **application/graphql**:
```
curl https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql \
-H "Content-Type: application/graphql" \
-d @- << DATA
{
  stop(id: "HSL:1040129") {
    name
    lat
    lon
    wheelchairBoarding
  }  
}
DATA
```

Using Content-Type **application/json**:
```
curl https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql \
-H "Content-Type: application/json" \
-d @- << DATA
{
  "query": "{
    stop(id: \"HSL:1040129\") {
      name
      lat
      lon
      wheelchairBoarding
    }
  }"
}
DATA
```

Descriptions for cURL parameters:
- -H 'Content-Type: application/json' defines correct Content-Type header
- -d @- tells cURL to read post data from STDIN
- << DATA defines a [*here document* code block](http://www.tldp.org/LDP/abs/html/here-docs.html)

**2. Windows**

If you are a Windows user, you can use the **application/graphql** approach like so:
```
curl https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql -H "Content-Type: application/graphql" --data "{stop(id: \"HSL:1173210\") {name, lat, lon, wheelchairBoarding}}"
```
**Note:**  If the examples provided do not return expected results, the stop id  may not be in use any more and you should try again with an existing id.

**Differences between application/json and application/graphql approaches**

You might notice that in both cases we are working with "json-ish" data.
With **application/json** you are sending a valid json:
```
{
  "query": "{...}"
}
```

However, with the **application/graphql** Content-Type, data is sent as GraphQL which is "json-ish". This means that you only have to write the query.

```
{...}
```
