---
title: Frequently asked API related questions
---

Table of Contents
=================

## Routing API
* [How to find out more about QueryTypes and their fields and parameters?](#how-to-find-out-more-about-querytypes-and-their-fields-and-parameters)
* [Why are some routes rendered as straight lines from one stop to the next?](#why-are-some-routes-rendered-as-straight-lines-from-one-stop-to-the-next)

## Geocoding API
  

## Map API
  
## Real-time API

## Routing API

### How to find out more about QueryTypes and their fields and parameters?

> If you have any questions related to QueryTypes or their fields and parameters please use the Docs functionality available when using GrphiQL.  
  
**Navigation:** Start for example [GraphiQL](https://api.digitransit.fi/graphiql/hsl) browser version for Helsinki region > Click link **Doc** that will open "Documentation explorer" on the right side of the screen > **Click QueryType** and find the one you are interested in.

### Why are some routes rendered as straight lines from one stop to the next?  
(ie. route geometries are missing)?
  
> To display precise route geometries, a shapes.txt file containing them is needed. These are not necessarily available for all cities and routes, but are generally added to the source material of Digitransit as they become available. Availability of route geometries depends on the local public transport authorities. In Finland, route geometries for towns part of the Waltti-system are managed by LMJ Oy. For more information and contacts regarding Waltti-areas, see http://www.lmj.fi/ and http://waltti.fi/.
