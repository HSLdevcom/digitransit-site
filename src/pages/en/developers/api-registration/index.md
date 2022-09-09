---
title: Developer portal and registration
order: -12
---

## Digitransit developer portal
Starting from 3.4.2023, the use of the Digitransit APIs will require registration and use of API keys. Registration can be done at the [Digitransit developer portal](https://portal-api.digitransit.fi/). After the registration, it's possible to create subscriptions to a product and the API keys related to the subscriptions will also be available at the developer portal.

## Transition period
Developers will have until 3.4.2023 to register at [the developer portal](https://portal-api.digitransit.fi/) and to start using API keys in the requests. After that, we will prevent the anonymous use of our APIs.

## Deprecations
We have deprecated some old API endpoints that are no longer needed. The list of these deprecations and how to migrate away from using those can be found [here](../deprecations).

These old endpoints are not shown in the developer portal and they will not be usable with the new API keys. We will remove these endpoints at the end of the transition period, i.e. after 3.4.2023.

## Quota and rate limiting
In the future, we will enforce rate and quota limiting but the limits should only restrict misuse of the APIs, not normal use. We will inform the registered users about these limits before we will enforce them.
