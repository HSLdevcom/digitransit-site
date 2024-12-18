---
title: Canceled trips
order: 80
---

**If you are not yet familiar with [GraphQL](../0-graphql) and [GraphiQL](../1-graphiql) it is highly recommended to review those pages at first.**

## Glossary

| Term                                    | Explanation                             |
|-----------------------------------------|-----------------------------------------|
| Trip on service date                    | A specific departure with specific direction for a specific route.<br/>For example: bus 102 leaving from Otaniemi on 2017-11-21 at 10:00. |
| Graphql Cursor Connection               | [Special GraphQL query structure](https://relay.dev/graphql/connections.htm) that introduces parameters and fields that can be used in pagination |


## What are canceled trips?

Canceled trips are trip times for which the whole departure has been canceled (i.e. not departures where only some stops are skipped). There are two types of trip cancelations: real-time and planned cancellations. Our data feeds only support real-time cancellations for now. If there is a known planned cancellation, it's possible that the whole trip is missing from the data feed and the canceled trips query doesn't therefore return it.

**Note:** Canceled trips do not include a reason why the departure has been canceled unless it's specified in an alert.

## Pagination

Usually, there are only a few canceled trips. However, it's highly recommended to use pagination to fetch canceled trips because in theory all trips can be canceled due to a strike, for example, which quickly increases the number of returned trips to tens of thousands which can really slow down the query (potentially even to the extent that the query is impossible to execute due to a timeout).

The query for canceled trips uses [Relay Graphql Cursor Connection structure](https://relay.dev/graphql/connections.htm). It introduces `first` and `last` arguments for controlling how many trips are returned from the query. `before` and `after` parameters can be used to specify a cursor for where to continue the pagination. `first` can be used alone without any other fields or together with `after`. `last` should be used with `before` parameter. Usually, it's enough to use the `first` and `after` for pagination and the other pagination direction is not as useful in this context. It's possible to fetch `pageInfo` which tells if there are more pages available and provides the necessary cursor(s) to continue the pagination.

The returned trips are sorted by departure time and date (earliest comes first).

## Query examples

**Note:** For more details about the query type **alerts** you can use the **Documentation Explorer** provided in GraphiQL.

### Query the first 100 canceled trips

1. Click [this link](https://api.digitransit.fi/graphiql/hsl?query=%257B%250A%2520%2520canceledTrips%28first%253A%2520100%29%2520%257B%250A%2520%2520%2520%2520pageInfo%2520%257B%250A%2520%2520%2520%2520%2520%2520hasNextPage%250A%2520%2520%2520%2520%2520%2520endCursor%250A%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520edges%2520%257B%250A%2520%2520%2520%2520%2520%2520node%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520serviceDate%250A%2520%2520%2520%2520%2520%2520%2520%2520trip%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520gtfsId%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520alerts%2520%28types%253AROUTE%29%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520alertHeaderText%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520alertDescriptionText%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%2520%2520%2520%2520start%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520stopLocation%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520...%2520on%2520Stop%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520name%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520schedule%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520time%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520...%2520on%2520ArrivalDepartureTime%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520departure%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520realTime%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520departure%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520delay%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520time%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%2520%2520%2520%2520end%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520stopLocation%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520...%2520on%2520Stop%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520name%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520schedule%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520time%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520...%2520on%2520ArrivalDepartureTime%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520arrival%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520realTime%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520arrival%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520delay%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520time%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%257D%250A%2520%2520%257D%250A%257D) to run the query below in GraphiQL.

```graphql
{
  canceledTrips(first: 100) {
    pageInfo {
      hasNextPage
      endCursor
    }
    edges {
      node {
        serviceDate
        trip {
          gtfsId
          alerts (types:ROUTE) {
            alertHeaderText
            alertDescriptionText
          }
        }
        start {
          stopLocation {
            ... on Stop {
              name
            }
          }
          schedule {
            time {
              ... on ArrivalDepartureTime {
                departure
              }
            }
          }
          realTime {
            departure {
              delay
              time
            }
          }
        }
        end {
          stopLocation {
            ... on Stop {
              name
            }
          }
          schedule {
            time {
              ... on ArrivalDepartureTime {
                arrival
              }
            }
          }
          realTime {
            arrival {
              delay
              time
            }
          }
        }
      }
    }
  }
}
```

2. Press play in GraphiQL to execute the query.

### Query the next 100 canceled trips

1. Click [this link](https://api.digitransit.fi/graphiql/hsl?query=%257B%250A%2520%2520canceledTrips%28first%253A%25205%252C%2520after%253A%2520%2522c2ltcGxlLWN1cnNvcjQ%253D%2522%29%2520%257B%250A%2520%2520%2520%2520pageInfo%2520%257B%250A%2520%2520%2520%2520%2520%2520hasNextPage%250A%2520%2520%2520%2520%2520%2520endCursor%250A%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520edges%2520%257B%250A%2520%2520%2520%2520%2520%2520node%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520serviceDate%250A%2520%2520%2520%2520%2520%2520%2520%2520trip%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520gtfsId%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520alerts%2520%28types%253AROUTE%29%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520alertHeaderText%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520alertDescriptionText%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%2520%2520%2520%2520start%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520stopLocation%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520...%2520on%2520Stop%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520name%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520schedule%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520time%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520...%2520on%2520ArrivalDepartureTime%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520departure%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520realTime%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520departure%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520delay%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520time%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%2520%2520%2520%2520end%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520stopLocation%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520...%2520on%2520Stop%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520name%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520schedule%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520time%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520...%2520on%2520ArrivalDepartureTime%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520arrival%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520realTime%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520arrival%2520%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520delay%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520time%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520%257D%250A%2520%2520%257D%250A%257D) to run the query below in GraphiQL.

```graphql
{
  canceledTrips(first: 100, after: <endCursor from a previous query>) {
    pageInfo {
      hasNextPage
      endCursor
    }
    edges {
      node {
        serviceDate
        trip {
          gtfsId
          alerts (types:ROUTE) {
            alertHeaderText
            alertDescriptionText
          }
        }
        start {
          stopLocation {
            ... on Stop {
              name
            }
          }
          schedule {
            time {
              ... on ArrivalDepartureTime {
                departure
              }
            }
          }
          realTime {
            departure {
              delay
              time
            }
          }
        }
        end {
          stopLocation {
            ... on Stop {
              name
            }
          }
          schedule {
            time {
              ... on ArrivalDepartureTime {
                arrival
              }
            }
          }
          realTime {
            arrival {
              delay
              time
            }
          }
        }
      }
    }
  }
}
```

2. Fill in the `after` parameter's value from a previous query's `endCursor`.
3. Press play in GraphiQL to execute the query.
