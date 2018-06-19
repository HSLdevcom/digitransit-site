---
title: GraphQL
---

## What is GraphQL?

[GraphQL](http://graphql.org/) is a query language for APIs and a runtime for fulfilling those queries with your existing data. The standard was created by Facebook. Basically, you can think of it as “client side SQL”. When implementing a GraphQL API, server developers specify a GraphQL schema that defines what can be queried. Instead of the client calling REST-like urls, it generates different GraphQL queries and sends these queries to the single endpoint of the API. The server then parses the query, executes it, and returns the results back to client.

## GraphQL benefits

There are many. You can read [how Facebook sees it](https://facebook.github.io/relay/docs/thinking-in-graphql.html). Also, the [GraphQL site](http://graphql.org/) provides more information.

## GraphQL API regions

**1. The Helsinki region routing API is available at:**
`https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql`

**2. The routing API for the Waltti regions is available at:**
`https://api.digitransit.fi/routing/v1/routers/waltti/index/graphql`

**3. The routing API for Finland as a whole is available at:**
`https://api.digitransit.fi/routing/v1/routers/finland/index/graphql`

## API requirements

When sending queries, there are some things you should be aware of:

**1. The HTTP method must be POST**
- You will get a HTTP 405 error when using other methods.

**2. Content-Type must be either "application/graphql" or "application/json"**
- You will get a HTTP 415 Error if this header is not present.

## JavaScript examples

The examples below send a GraphQL query using HTTP POST to `https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql`. This example query asks the server to find a stop with the ID "HSL:1040129" and return its name, latitude and longitude coordinates, and whether is is accessible by wheelchair.

Using Content-Type **application/graphql**:
<iframe height="750px" width="100%" src="https://repl.it/@mjaakko/StopRequestGraphQL1?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>


Using Content-Type **application/json**:
<iframe height="750px" width="100%" src="https://repl.it/@mjaakko/StopRequestGraphQL2?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

**Note:**  If the examples provided do not return expected results, the stop id  may not be in use any more and you should try again with an existing id.

### Differences between application/json and application/graphql approaches

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
