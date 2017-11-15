---
title: GraphQL
---

## What is GraphQL?

[GraphQL](http://graphql.org/) is a query language for APIs and a runtime for fulfilling those queries with your existing data. It is a standard created by Facebook. Basically, you can think it like “client side SQL”. When implementing a GraphQL API, server developers define a GraphQL schema that defines what can be queried. Instead of client calling REST-like urls, it generates different GraphQL queries and sends these queries to API. Server parses the query, executes it, and returns results back to client.

## GraphQL benefits

There are many. You can read [how Facebook sees it](https://facebook.github.io/relay/docs/thinking-in-graphql.html). Also, [GraphQL site](http://graphql.org/) has some info for you.

## GraphQL API regions

**1. Helsinki region API is available at:**
> https://<i></i>api.digitransit.fi/routing/v1/routers/hsl/index/graphql

**2. API for the Waltti regions is available at:**
> https://<i></i>api.digitransit.fi/routing/v1/routers/waltti/index/graphql

**3. Whole Finland API is available at:**
> https://<i></i>api.digitransit.fi/routing/v1/routers/finland/index/graphql
 
**NOTE:** Hyperlinks have been removed because they would only return "HTTP 405 Method Not Allowed".

## API requirements

When sending queries, there are some things you should be aware of:

**1. HTTP method must be POST**
- You will get HTTP 405 error when using other methods.

**2. Content-Type must be either "application/graphql" or "application/json"**
- You will get HTTP 415 Error if it is not present.

## cURL examples

Examples below send a GraphQL query as HTTP post to https://<i></i>api.digitransit.fi/routing/v1/routers/hsl/index/graphql. Example query asks server to find stop using id "HSL:1040129" and return its name, latitude and longitude coordinates, and whether is is accessible by wheelchair.

You can download cURL here:
> https://curl.haxx.se/

**1. Linux & OSX**

When using **application/graphql** Content-Type, do it like this:
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

When using **application/json** Content-Type, do it like this:
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

Some description for cURL parameters:
- -H 'Content-Type: application/json' defines correct Content-Type header
- -d @- tells cURL to read post data from STDIN
- << DATA defines [here documents code block](http://www.tldp.org/LDP/abs/html/here-docs.html)

**2. Windows**

If you are a Windows user, you can use **application/graphql** approach like so:
```
curl https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql -H "Content-Type: application/graphql" --data "{stop(id: \"HSL:1173210\") {name, lat, lon, wheelchairBoarding}}"
```
**Note:**  If the examples provided do not return what is expected then the id used may not be in use any more and you should just try to use some other id.

**Differences between application/json and application/graphql approaches**

You might notice that in both cases we are working with "jsonish" data.
With *application/json* you are sending a valid json:
```
{
  "query": "{...}"
}
```

However, with *application/graphql* Content-Type data is sent as GraphQL which is "jsonish". This means that you only have to write query.

```
{...}
```
