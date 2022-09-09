---
title: Developer portal and registration
order: -12
---

## Digitransit developer portal
Starting from 3.4.2023, the use of the Digitransit production APIs ([api.digitransit.fi](https://api.digitransit.fi), [cdn.digitransit.fi](https://cdn.digitransit.fi) and [digitransit-prod-cdn-origin.azureedge.net](https://digitransit-prod-cdn-origin.azureedge.net)) will require registration and use of API keys. Registration can be done at the [Digitransit developer portal](https://portal-api.digitransit.fi/). After the registration, it's possible to create subscriptions to a product and the API keys related to the subscriptions will also be available at the developer portal.

## Transition period
Developers will have until 3.4.2023 to register at [the developer portal](https://portal-api.digitransit.fi/) and to start using API keys in the requests. After that, we will prevent the anonymous use of our production APIs.

## Use of API keys
The API keys can be fetched from the developer portal's profile page. Each subscription contains two keys so it is possible to regenerate the second key while the other key is in use, if there is a need. The API key can be included either as a URL parameter or as a header. The parameter and the header name are both `digitransit-subscription-key` and the value should be the key.

## Testing the use API keys
We will not validate the keys in requests to the production APIs before the end of the transition period. To validate that the use of APIs will work after the transition period, please also register as a user of our development API at the [developer portal](https://portal-dev-api.digitransit.fi/) for our development APIs and try sending requests to [dev-api.digitransit.fi](https://dev-api.digitransit.fi) instead of [api.digitransit.fi](https://api.digitransit.fi) and [digitransit-dev-cdn-origin.azureedge.net](https://digitransit-dev-cdn-origin.azureedge.net) instead of [cdn.digitransit.fi](https://cdn.digitransit.fi) and [digitransit-prod-cdn-origin.azureedge.net](https://digitransit-prod-cdn-origin.azureedge.net). If the API keys are being used correctly, the requests should not return 401 unauthorized error. <b>NOTE, THE API KEYS FROM THIS DEVELOPER PORTAL WILL NOT WORK AGAINST OUR PRODUCTION APIS AFTER THE TRANSITION PERIOD, AND THE DEVELOPMENT APIS ARE NOT MEANT FOR PRODUCTION USE</b>.

## Deprecations
We have deprecated some old API endpoints that are no longer needed. The list of these deprecations and how to migrate away from using those can be found [here](../deprecations).

These old endpoints are not shown in the developer portal and they will not be usable with the new API keys. We will remove these endpoints at the end of the transition period, i.e. after 3.4.2023.

## Quota and rate limiting
In the future, we will enforce rate and quota limiting but the limits should only restrict misuse of the APIs, not normal use. We will inform the registered users about these limits before we will enforce them.
