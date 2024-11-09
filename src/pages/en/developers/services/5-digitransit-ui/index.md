---
title: Digitransit-ui
description:
  info: Digitransit-ui is a mobile friendly User interface built to work with Digitransit APIs.
  architecture: https://raw.githubusercontent.com/HSLdevcom/digitransit-site/master/src/pages/en/developers/services/5-digitransit-ui/architecture.xml
assets:
  - title: "source"
    url: https://github.com/HSLdevcom/digitransit-ui
  - title: "DockerHub"
    url: https://hub.docker.com/r/hsldevcom/digitransit-ui/
  - title: "Dockerfile"
    url: https://github.com/HSLdevcom/digitransit-ui/blob/v3/Dockerfile
technologies:
  - title: "React"
    url: "https://react.dev/"
  - title: "Leaflet"
    url: "http://leafletjs.com/"
  - title: "Relay"
    url: "https://relay.dev/"
docker:
  dockerfile: https://github.com/HSLdevcom/digitransit-ui/blob/v3/Dockerfile
  imageName: hsldevcom/digitransit-ui:v3-prod
  runContainer: docker run -p 8080:8080 -it -e CONFIG=hsl -e API_URL=https://api.digitransit.fi -e MAP_URL=https://cdn.digitransit.fi -e NODE_OPTS=--max_old_space_size=1500 -e API_SUBSCRIPTION_QUERY_PARAMETER_NAME=digitransit-subscription-key -e API_SUBSCRIPTION_HEADER_NAME=digitransit-subscription-key -e API_SUBSCRIPTION_TOKEN=<your subscription key> hsldevcom/digitransit-ui:v3-prod
  accessContainer: http://localhost:8080/
---

Application is built with React. React components can access data in two different ways:

- Routing-API queries with Relay
- Other API with Flux model

Basically, division between alternatives is:

- GraphQL is used to fetch data from server
- If server endpoint does not support GraphQL, flux can be used to retrieve that data
- Flux stores are mainly used to store application state

## Installation

Installation instructions are [available at GitHub](https://github.com/HSLdevcom/digitransit-ui/blob/v3/docs/Installation.md)

## Tests

Unit testing is used.

## Service dependencies

| Asset              | Url                                                        |
| ------------------ | ---------------------------------------------------------- |
| Routing - API      | https://digitransit.fi/en/developers/apis/1-routing-api/   |
| Realtime HSL - API | https://digitransit.fi/en/developers/apis/5-realtime-api/  |
| Map - API          | https://digitransit.fi/en/developers/apis/4-map-api/       |
| Geocoding - API    | https://digitransit.fi/en/developers/apis/3-geocoding-api/ |

## Key service delivery activities

1. Keep up with key project dependencies on GitHub

| Dependecy          | url                                                 |
| ------------------ | --------------------------------------------------- |
| React              | https://github.com/facebook/react                   |
| React-leaflet      | https://github.com/PaulLeCam/react-leaflet          |
| React-router       | https://github.com/rackt/react-router               |
| React-autosuggest  | https://github.com/moroshko/react-autosuggest       |
| react-router-relay | https://github.com/relay-tools/react-router-relay   |
| Relay              | https://github.com/facebook/relay                   |
| Babel relay plugin | https://github.com/facebook/relay                   |
| Fluxible           | https://github.com/yahoo/fluxible                   |
| Leaflet            | https://github.com/Leaflet/Leaflet                  |
| MQTT.js            | https://github.com/mqttjs/MQTT.js                   |
| Polyfill-service   | https://github.com/Financial-Times/polyfill-service |
| PBF                | https://github.com/mapbox/pbf                       |
| Webpack            | https://github.com/webpack/webpack                  |

2. Follow GraphQL specification<br/>
   https://graphql.org/https://graphql.org/

3. From time to time check HSL style guide<br/>
   https://www.hsl.fi/tyyliopas

4. Follow EcmaScript, and browser development<br/>
   https://esdiscuss.org/<br/>
   https://discuss.babeljs.io/<br/>
   http://www.ecma-international.org/news/index.html<br/>
   http://caniuse.com/#info_news
