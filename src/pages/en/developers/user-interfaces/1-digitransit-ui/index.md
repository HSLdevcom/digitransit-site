---
title: Digitransit-ui
description:
  info: Digitransit-ui is a mobile friendly User interface built to work with Digitransit APIs.
  architecture: https://raw.githubusercontent.com/HSLdevcom/digitransit-site/master/src/pages/en/developers/user-interfaces/1-digitransit-ui/architecture.xml
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

## URL parameter processing

Before a request reaches the React application, the Digitransit-ui server passes it through a URL middleware (`server/middleware/legacyUrlMiddleware.js`). The middleware keeps old links working and sanitizes query parameters. It is mounted for the root path and for the legacy language paths `/fi/`, `/en/`, `/sv/`, `/ru/` and `/slangi/`.

### Validation of query parameters

These checks are always performed:

- A non-numeric `time` parameter is removed.
- If the configuration option `queryMaxAgeDays` is set (14 days in the HSL and Waltti configurations), a `time` older than that is removed. The user is redirected to the same URL without it, so a stale link opens with the current time.

### Support for old Reittiopas URLs

If the configuration option `redirectReittiopasParams` is `true` (enabled in the HSL, Waltti, Matka and Kela configurations), the middleware also handles the URL forms of the old Reittiopas service:

- **Language in the path.** A path such as `/en/` is redirected to `/` with the query parameter `locale=en`. The language is also stored in the `lang` cookie. `slangi` is mapped to `fi`.
- **Itinerary search parameters.** If the query contains `from`, `to`, `from_in` or `to_in`, the places are resolved on the server and the user is redirected to a new style URL.
- **Locale correction.** If the `lang` cookie and the `locale` query parameter disagree, the user is redirected to the same URL with `locale` set to the cookie value.

Supported old parameters:

| Parameter                                                             | Meaning                                                                                                                                                                                                           |
| --------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `from`, `to`                                                          | Origin or destination. Either a free text place name, or the old format `<text>*<name>*<x>*<y>` (for example `Pasila*Pasila*3385000*6674000`), where `x` and `y` are KKJ coordinates (the first part is ignored). |
| `from_in`, `to_in`                                                    | Free text place name, used when `from` or `to` is not set. A `+` is interpreted as a space.                                                                                                                       |
| `daymonthyear` (`d.m.yyyy`), `year`, `month`, `day`, `hour`, `minute` | Departure time. Used only if it is not older than `queryMaxAgeDays`.                                                                                                                                              |
| `timetype=arrival`                                                    | The time is the arrival time. Converted to `arriveBy=true`.                                                                                                                                                       |

Free text place names are resolved using the [Geocoding API](https://digitransit.fi/en/developers/apis/3-geocoding-api/); the first result is used. The user is redirected as follows:

| Result                            | Redirect                                                                                         |
| --------------------------------- | ------------------------------------------------------------------------------------------------ |
| Both places resolved              | Itinerary search page `/reitti/<from>/<to>/`, with `time` and `arriveBy` parameters when given   |
| Only one place resolved           | The front page (`indexPath`) with the resolved place filled in, and the other as empty (`/%20/`) |
| Geocoding failed or found nothing | The front page with empty places                                                                 |

For example, `https://reittiopas.hsl.fi/fi/?from=steissi&to=pasila` redirects to an itinerary search from Helsinki railway station to Pasila: `/reitti/<from>::<lat>,<lon>/<to>::<lat>,<lon>/`.

## Location in the URL

Places are part of the UI path. The itinerary search page uses the path `/reitti/<from>/<to>/`, and the front page uses `/<from>/<to>/` (for example `/etusivu/<from>/<to>/` in the HSL configuration, where `etusivu` is the configured `indexPath`). The "Near you" view uses `/lahellasi/<mode>/<place>`.

### Place format

A place is written as

```
<address>::<lat>,<lon>
```

where `address` is URL encoded, for example `Pasila%2C%20Helsinki::60.198118,24.934074`. A stop or station can be given as `<name>**<gtfsId>::<lat>,<lon>`. Two special values are also used:

| Value | Meaning                                |
| ----- | -------------------------------------- |
| `-`   | The place is not set                   |
| `POS` | The user's current location (position) |

### Using the user's current location (`POS`)

`POS` can be used as the origin, the destination, or the place of the "Near you" view. It means "the device location", which is not known when the link is created. For example:

- `/reitti/POS/<to>/` is an itinerary search from the user's current location.
- `/reitti/<from>/POS/` is an itinerary search to the user's current location.
- `/lahellasi/BUS/POS` shows departures of bus stops near the user.

How `POS` is handled:

1. The browser asks the user for permission to use the device location, unless it has been given or denied earlier.
2. If the location is found, the UI replaces `POS` in the URL with the address and coordinates found (`<address>::<lat>,<lon>`) and proceeds normally. The address is acquired using reverse geocoding.
3. If the location can not be determined, for example if the user denies the permission, `POS` is replaced with `-`, and the user can select the place manually. In the "Near you" view the user is asked to search for a place instead.
4. When the "Near you" view uses the user's own location, the URL keeps `POS`, so that a saved link or a bookmark always uses the current location. If the user selects another place, `POS` is replaced with that place.

`POS` is resolved in the browser. The server does not know the location, and the URL middleware does not resolve it.

The other place of an itinerary search can be set at the same time, so a link such as `/reitti/POS/Pasila%2C%20Helsinki::60.198118,24.934074/` works as a "route from here to Pasila" link for any user.

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
