---
title: Digitransit-ui
description:
  img: demo.gif
  info: Digitransit-ui is a mobile friendly User interface built to work with Digitransit APIs.
  architecture: https://raw.githubusercontent.com/HSLdevcom/digitransit-site/master/pages/en/developers/service-catalogue/digitransit-ui/architecture.xml
assets:
  source: https://github.com/HSLdevcom/digitransit-ui
  dockerHub: https://hub.docker.com/r/hsldevcom/digitransit-ui/
  Dockerfile: https://github.com/HSLdevcom/digitransit-ui/blob/master/Dockerfile
technologies:  
  "React": "https://facebook.github.io/react/"
  "Leaflet": "http://leafletjs.com/"
  "Relay": "https://facebook.github.io/relay/"
  "CoffeeScript": "http://coffeescript.org/"
docker:
  dockerfile: https://github.com/HSLdevcom/digitransit-ui/blob/master/Dockerfile
  imageName: hsldevcom/digitransit-ui
  buildScript: https://github.com/HSLdevcom/digitransit-ui/blob/master/build-docker-image.sh
  runContainer: docker run -p 8080:8080 -e CONFIG=hsl -e API_URL=http://api.digitransit.fi --name ui hsldevcom/digitransit-ui
  accessContainer: http://localhost:8080/
---

Application is built with React. React components can access data in two different ways:
* Routing-API queries with Relay
* Other API with Flux model

Basically, division between alternatives is:
- GraphQL is used to fetch data from server
- If server endpoint does not support GraphQL, flux can be used to retrieve that data
- Flux stores are mainly used to store application state

## Installation

Installation instructions are [available at GitHub](https://github.com/HSLdevcom/digitransit-ui/blob/master/docs/Installation.md)

## Tests
Tests run automatically in Browserstack:
> https://www.browserstack.com/automate

## Service dependencies
| Asset               |  Url                                                        |
|---------------------|-------------------------------------------------------------|
| Routing - API       | http://digitransit.fi/developers/routing-api/
| Realtime HSL - API  | http://digitransit.fi/developers/realtime-hsl/
| Map - API           | http://digitransit.fi/developers/map-api/
| Geocoding - API     | http://digitransit.fi/developers/geocoding-api
| Sentry              |
| Piwik               |

## Key service delivery activities
1. Keep up with key project dependencies on GitHub

| Dependecy          | url                                                                       |
|--------------------|---------------------------------------------------------------------------|
| React              | https://github.com/facebook/react
| React-leaflet      | https://github.com/PaulLeCam/react-leaflet
| React-router       | https://github.com/rackt/react-router
| React-autosuggest  | https://github.com/moroshko/react-autosuggest
| react-router-relay | https://github.com/relay-tools/react-router-relay
| Relay              | https://github.com/facebook/relay
| Babel relay plugin | https://github.com/facebook/relay
| Fluxible           | https://github.com/yahoo/fluxible
| Material-ui        | https://github.com/callemall/material-ui
| node-cjsx          | https://github.com/SimonDegraeve/node-cjsx
| Leaflet            | https://github.com/Leaflet/Leaflet
| Raven-js           | https://github.com/getsentry/raven-js
| MQTT.js            | https://github.com/mqttjs/MQTT.js
| Polyfill-service   | https://github.com/Financial-Times/polyfill-service
| PBF                | https://github.com/mapbox/pbf
| Sentry             | https://github.com/getsentry/sentry
| Webpack            | https://github.com/webpack/webpack
| Nightwatch         | https://github.com/nightwatchjs/nightwatch

2. From time to time check all package.json dependencies<br/>
   https://gemnasium.com/HSLdevcom/digitransit-ui

3. Follow GraphQL specification<br/>
   https://facebook.github.io/graphql

4. From time to time check HSL style guide<br/>
   https://www.hsl.fi/tyyliopas

5. Follow EcmaScript, Coffeescript, and browser development<br/>
   http://coffeescript.org/<br/>
   https://esdiscuss.org/<br/>
   https://discuss.babeljs.io/<br/>
   http://www.ecma-international.org/news/index.html<br/>
   http://caniuse.com/#info_news
