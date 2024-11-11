---
title: Translation
order: 50
---

## Translations in the routing API

Translations exist for many types of data, such as stops, bicycle rental stations and parking areas. Some data sources
don't provide translations. It's possible that stops that originate from one source have translations for names, while
some others don't. If there are translations, typically the two available languages are Finnish (`fi`) and Swedish (`sv`).
Occasionally, for example for parking areas, there are also English (`en`) translations.

## Using translations

Texts that can be translated are automatically translated in the GraphQL query responses if the standard `Accept-Language` header is used.
So for instance, if `Accept-Language: sv` header is sent in the GraphQL request, a query like `{ vehicleParkings { name } }` would return
the parking names in Swedish, if available.

Typically, it's enough to fetch the fields in one language. However, sometimes one might want to display some field with multiple languages
at once, for example. In that case, it's possible to fetch the same field multiple times and use a `language` parameter on the field to
specify the requested language (this overrides the language from the `Accept-Language` header). Here's an example on how to use this on
vehicle parking:

1. Click [this link](https://api.digitransit.fi/graphiql/hsl/v2?query=%257B%250A%2520%2520vehicleParkings%2520%257B%250A%2520%2520%2520%2520%2520nameFi%253A%2520name%28language%253A%2520%2522fi%2522%29%250A%2520%2520%2520%2520%2520nameSv%253A%2520name%28language%253A%2520%2522sv%2522%29%250A%2520%2520%2520%2520%2520nameEn%253A%2520name%28language%253A%2520%2522en%2522%29%250A%2520%2520%257D%250A%257D) to run the query below in GraphiQL.

```graphql
{
  vehicleParkings {
     nameFi: name(language: "fi")
     nameSv: name(language: "sv")
     nameEn: name(language: "en")
  }
}
```

2. Press play in GraphiQL to execute the query.
