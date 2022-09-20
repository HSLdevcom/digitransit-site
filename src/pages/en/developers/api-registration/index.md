---
title: API portal and registration
order: -12
---

## Digitransit API portal
Starting from 3.4.2023, the use of the Digitransit production APIs ([api.digitransit.fi](https://api.digitransit.fi), [cdn.digitransit.fi](https://cdn.digitransit.fi) and [digitransit-prod-cdn-origin.azureedge.net](https://digitransit-prod-cdn-origin.azureedge.net)) will require registration and use of API keys. Registration can be done at the [Digitransit API portal](https://portal-api.digitransit.fi/). After the registration, it is possible to create subscriptions to a product. API keys related to the subscriptions will be available at the API portal.

## Transition period
Developers will have time until 3.4.2023 to register at [the API portal](https://portal-api.digitransit.fi/) and to start using API keys in requests. After that, we will prevent anonymous use of production APIs.

## Use of API keys
API keys can be fetched from the API portal's profile page. Each subscription contains two keys, so that it is possible to regenerate a second key while the other key is in use, if there is a need. An API key can be included either as a URL parameter or as a header. The parameter and the header name are both `digitransit-subscription-key` and the value should be the key. The API keys should not be attached to requests going to [the deprecated APIs](../deprecations).

## Testing the use API keys
We will not validate the keys in requests to the production APIs before the end of the transition period. To validate that the use of APIs will work after the transition period, please also register as a user of our development API at the [development API portal](https://portal-dev-api.digitransit.fi/). Note, that registration and subscription process might not work in all networks. Please try a different one if there are issues. While testing, try sending requests to [dev-api.digitransit.fi](https://dev-api.digitransit.fi) instead of [api.digitransit.fi](https://api.digitransit.fi) and [digitransit-dev-cdn-origin.azureedge.net](https://digitransit-dev-cdn-origin.azureedge.net) instead of [cdn.digitransit.fi](https://cdn.digitransit.fi) and [digitransit-prod-cdn-origin.azureedge.net](https://digitransit-prod-cdn-origin.azureedge.net). If the API keys are being used correctly, the requests should not return 401 unauthorized error. <b>IMPORTANT NOTE: THE API KEYS FROM THIS DEVELOPMENT API PORTAL WILL NOT WORK AGAINST OUR PRODUCTION APIS AFTER THE TRANSITION PERIOD, AND THE DEVELOPMENT APIS ARE NOT MEANT FOR PRODUCTION USE</b>.

## Deprecations
We have deprecated some old API endpoints that are no longer needed. The list of these deprecations and how to migrate away from using those can be found [here](../deprecations).

These old endpoints are not shown in the API portal and they will not be usable with the new API keys. We will remove these endpoints at the end of the transition period, i.e. after 3.4.2023.

## Quota and rate limiting
In the future, we will enforce rate and quota limiting. The limits should only restrict misuse of the APIs, not normal use. We will inform the registered users about these limits before we will enforce them.
