---
title: Geocoding Data
description:
  info: Data container for Pelias
  architecture: https://raw.githubusercontent.com/HSLdevcom/digitransit-site/master/pages/en/developers/services/6-data-containers/geocoding-data/architecture.xml
assets:
  - title: "source"
    url: https://github.com/HSLdevcom/pelias-data-container
  - title: "DockerHub"
    url: https://hub.docker.com/r/hsldevcom/pelias-data-container/
  - title: "Dockerfile"
    url: https://github.com/HSLdevcom/pelias-data-container/blob/master/Dockerfile.loader
  - title: "Pelias data schema"
    url: https://github.com/HSLdevcom/pelias-schema.git
  - title: "Pelias config"
    url: https://github.com/HSLdevcom/pelias-data-container/blob/master/pelias.json
  - title: "ES client"
    url: https://github.com/HSLdevcom/dbclient.git
  - title: "pelias-nlsfi-places-importer"
    url: https://github.com/HSLdevcom/pelias-nlsfi-places-importer.git
  - title: "OSM import"
    url: https://github.com/HSLdevcom/openstreetmap.git
  - title: "VRK import"
    url: https://github.com/HSLdevcom/pelias-vrk.git
  - title: "GTFS stop import"
    url: https://github.com/HSLdevcom/pelias-gtfs.git
  - title: "Citybike station import"
    url: https://github.com/HSLdevcom/bikes-pelias.git
technologies:
  - title: "Elasticsearch"
    url: "https://elastic.co"
docker:
  imageName: hsldevcom/pelias-data-container
  runContainer: docker run -p 9200:9200 hsldevcom/pelias-data-container
---

This service is essentially an ElasticSearch instance containing Geocoding data that can be used with Pelias Geocoder.

### General Pelias information

Start by reading (Note that it might not be up-to-date):

> https://mapzen.com/blog/pelias-setup-tutorial

### How data is built?

On build time the data is fetched from multiple sources and processed and loaded into ElasticSearch using
Pelias tools. At high level this is what happens:

1. Download and extract Finland related shapefiles of administrational areas and regions from WhosOnFirst (or use embedded data of pelias-data-container source)

2. Download Open Street Map Finland data

3. Download VRK data (building locations with street addresses)

4. Download NLS places (an extensive list of venues and place names from the National Lands Survey)

5. Download national GTFS data, including GTFS stops

6. Start ElasticSearch

7. Create pelias schema

8. Run GTFS stop import

9. Run NLS places import

10. Run OpenStreetMap import

11. Run VRK data import

12. Run bike station import from an OpenTripPlanner service endpoint

### Exploring data

For exploring ElasticSearch data, you can install the extension "elasticsearch-head" to Chrome browser and use it as follows:

1. Wait until cluster health changes to "green".

2. Click on "Browser"-tab

3. Write queries to "name.default" field.

4. Browse results

For Gis data exploration you can use e.g. QGis

> http://www.qgis.org/en/site/

## Datasources

### VRK

- Url: https://geocoding.blob.core.windows.net/vrk/fi_vrk_addresses.zip
- Types: Address

Open addresses is a open data collaborative to produce global address data around the world. We use addresses from Open addresses as primary data.

### OpenStreetMap

- Url: https://www.openstreetmap.org
- Datafile: http://download.geofabrik.de/europe/finland-latest.osm.pbf
- Types: address, venue

OpenStreetMap import reads all items which are tagged with a name and one or more tags/tag pairs from the following list:

- addr:housenumber AND addr:street
- amenity
- building
- shop
- office
- public_transport
- cuisine
- railway
- sport
- natural
- tourism
- leisure
- historic
- man_made
- landuse
- waterway
- aerialway
- aeroway
- craft
- military

You can improve digitransit geocoding by contributing new or corrected data to OpenStreetMap. Please always include a Swedish name version, if available, to your data contributions.
Below is a simple example node with proper names:

```json
{
    "id":26430225,
    "type":"node",
    "lat":60.2070123, "lon":24.7022998,
    "tags":{
        "name":"Koivuhovi",
        "name:sv":"Björkgård",
        "railway:station"
    }
}
```

For more information, check out:

> http://wiki.openstreetmap.org/wiki/Beginners%27_guide

Our goal is to use as much data from OSM as possible. Unfortunately, at the moment it doesn't contain everything that we need so we have to use other sources also.

### NLS Paikat

- Url: http://www.maanmittauslaitos.fi
- Types: venue

National Land survey Nimistö ("places") contains place names in Finland. It provides places like "Takalammi".

## Key service delivery activities

1. Keep up with our development on GitHub<br/>
   https://github.com/HSLdevcom/pelias-data-container

2. Keep up with Pelias importer projects<br/>
   https://github.com/HSLdevcom/pelias-schema<br/>
   https://github.com/HSLdevcom/pelias-gtfs<br/>
   https://github.com/HSLdevcom/pelias-vrk<br/>
   https://github.com/HSLdevcom/pelias-nlsfi-places-importer<br/>
   https://github.com/HSLdevcom/openstreetmap<br/>
   https://github.com/HSLdevcom/bikes-pelias<br/>

3. Keep up with Who's on First development<br/>
   https://github.com/whosonfirst/whosonfirst-data/

4. Keep up with Geospatial Data Abstraction Library development<br/>
   http://www.gdal.org/

5. Keep up with ElasticSearch docker image and it's changes<br/>
   https://hub.docker.com/_/elasticsearch/
