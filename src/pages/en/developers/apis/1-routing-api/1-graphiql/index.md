---
title: GraphiQL
order: 20
---

## Making queries and exploring the schema using GraphiQL

**It is highly recommended to use GraphiQL when familiarizing yourself with the Routing API.**

[GraphiQL](https://github.com/graphql/graphiql) is a simple UI for making queries. You can use it both to run queries and to explore the GraphQL schema.

**Note:** Queries, parameters, and fields should have at least some description available and you can use the documentation explorer to familiarize yourself with the schema. You can find more details about that under [Reading schema docs](#reading-schema-docs).

### Using the Digitransit GraphiQL browser versions

You can use our hosted GraphiQL browser versions for the four available regions. The browser versions have the correct endpoints configured.
   * [Helsinki region](https://api.digitransit.fi/graphiql/hsl/v2/gtfs/v1)
   * [Waltti regions](https://api.digitransit.fi/graphiql/waltti/v2/gtfs/v1)
   * [Seutu+ regions](https://api.digitransit.fi/graphiql/varely/v2/gtfs/v1)
   * [Finland and Estonia](https://api.digitransit.fi/graphiql/finland/v2/gtfs/v1)

## Execute your first query

1. Click [this link](https://api.digitransit.fi/graphiql/hsl/v2/gtfs/v1?query=%7B%0A%20%20stop(id%3A%20%22HSL%3A1040129%22)%20%7B%0A%20%20%20%20name%0A%20%20%20%20lat%0A%20%20%20%20lon%0A%20%20%20%20wheelchairBoarding%0A%20%20%7D%0A%7D) to run the query below in GraphiQL.

```graphql
{
  stop(id: "HSL:1040129") {
    name
    lat
    lon
    wheelchairBoarding
  }
}
```

2. Press play in GraphiQL to execute the query.

![GraphiQL](./GraphiQL.png)

3. You should get results like below:

```json
{
  "data": {
    "stop": {
      "name": "Arkadian puisto",
      "lat": 60.17112,
      "lon": 24.93338,
      "wheelchairBoarding": "NOT_POSSIBLE"
    }
  }
}
```
**Note:** If the example provided does not return what is expected then the stop id used in step 2 may not be in use any more and you should try again with an existing id.

## Changing the endpoint or API type

When using the browser version, the endpoint currently in use can be viewed by hovering over the **EP** icon.

![GraphiQL](./GraphiQL-endpoint-hovering.png)

The endpoint can be changed by clicking the **EP** icon. A menu with endpoint options opens up.

![GraphiQL](./GraphiQL-endpoint.png)

The API type currently in use can be viewed by hovering over the **API** icon.

![GraphiQL](./GraphiQL-api-hovering.png)

The API type can be changed by clicking the **API** icon. A menu with API type options opens up. Only the production API type is intended for public use. The development API type has a schema which is not stable and can be subject to change.

![GraphiQL](./GraphiQL-api.png)

## Exploring the schema with GraphiQL

GraphiQL is schema aware. This means that you can invoke autocomplete by Ctrl-space. The tool then shows available options for your query.

![GraphiQL](./GraphiQL-autocomplete.png)

## Reading schema docs

By clicking the documentation icon in the upper left corner of GraphiQL you can open the **Documentation Explorer**. Then, clicking **query: QueryType** will open up a list of all available top level queries.

![GraphiQL](./GraphiQL-docs.png)

From here you can check e.g. **alerts**, which describes what can be queried using that top level. It says "Get all active alerts".

![GraphiQL](./GraphiQL-alerts.png)

Let's try to query alerts:

1. Close the docs

2. Click [this link](https://api.digitransit.fi/graphiql/hsl/v2/gtfs/v1?query=%7B%0A%20%20alerts%20%7B%0A%20%20%20%20alertDescriptionText%0A%20%20%7D%0A%7D) to run the query below in GraphiQL.

```graphql
{
  alerts {
    alertDescriptionText
  }
}
```

3. Press play in GraphiQL to execute the query. Depending on the current traffic situation, you might get information about one or more ongoing disruptions.

![GraphiQL](./GraphiQL-alerts-results.png)
