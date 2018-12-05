---
title: Geocoding Data
description:
  info: Data container for Pelias
  architecture: https://raw.githubusercontent.com/HSLdevcom/digitransit-site/master/pages/en/developers/services/6-data-containers/geocoding-data/architecture.xml
assets:
  source: https://github.com/HSLdevcom/pelias-data-container
  dockerHub: https://hub.docker.com/r/hsldevcom/pelias-data-container/
  Dockerfile: https://github.com/HSLdevcom/pelias-data-container/blob/master/Dockerfile
  "Pelias config": https://github.com/HSLdevcom/pelias-data-container/blob/master/pelias.json
  "ES client": https://github.com/HSLdevcom/dbclient.git
  pelias-nlsfi-places-importer: https://github.com/HSLdevcom/pelias-nlsfi-places-importer.git
  pelias-openaddresses-import: https://github.com/HSLdevcom/openaddresses.git
technologies:
  "SIRI": "http://user47094.vs.easily.co.uk/siri/"
  "GTFS-RT": "https://developers.google.com/transit/gtfs-realtime/"
  "Python": null
docker:
  dockerfile: https://github.com/HSLdevcom/pelias-data-container/blob/master/Dockerfile
  imageName: hsldevcom/pelias-data-container
  buildScript: https://github.com/HSLdevcom/pelias-data-container/blob/master/build-docker-image.sh
  runContainer: docker run -p 9200:9200 hsldevcom/pelias-data-container
  accessContainer: http://localhost:9200/_plugin/head/
---

This service is essentially an ElasticSearch instance containing Geocoding data that can be used with Pelias Geocoder.

### General Pelias information
Start by reading (Note that it might not be up-to-date):
> https://mapzen.com/blog/pelias-setup-tutorial


### How data is built?
On build time the data is fetched from multiple sources and processed and loaded into ElasticSearch using
Pelias tools. At high level this is what happens:

1. Download and extract Finland related shapefiles of administrational areas and regions from WhosOnFirst

2. Download Open Street Map Finland data

3. Download Openaddresses Finland data (street addresses originating from VRK)

4. Download NLS places (an extensive list of venues and place names from the National Lands Survey)

5. Download national GTFS data, including GTFS stops

6. Start ElasticSearch

7. Create pelias schema

8. Run GTFS stop import

9. Run NLS places import

10. Run OpenStreetMap import

11. Run OpenAddresses import for addresses defined in Swedish

12. Run OpenAddresses import for Finnish addresses and merge fi and sv records for matching addresses



### Exploring data
For Exploring ElasticSearch data you can open browser (when container is running):
> http://localhost:9200/_plugin/head/

This url contains navigator that can be user to make queries to ElasticSearch. In order to make queries:

1. Click on "connect", this should change cluster health to "green". If this does not work, wait a bit and retry.

2. Click on "Browser"-tab

3. Write queries to "name.default" field.

4. Browse results

For Gis data exploration you can use e.g. QGis
> http://www.qgis.org/en/site/

## Datasources

### OpenAddresses
- Url: https://openaddresses.io/
- All datafiles are listed in http://results.openaddresses.io/state.txt. The relevant ones contain a path section /fi/.
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
>http://wiki.openstreetmap.org/wiki/Beginners%27_guide

Our goal is to use as much data from OSM as possible. Unfortunately, at the moment it doesn't contain everything that we need so we have to use other sources also.


### NLS Paikat
- Url: http://www.maanmittauslaitos.fi/digituotteet/nimisto
- Datafile: http://kartat.kapsi.fi/files/nimisto/paikat/etrs89/gml/paikat_2016_01.zip
- Types: venue

National Land survey Nimistö ("places") contains place names in Finland. It provides places like "Takalammi".


## Key service delivery activities
1. Keep up with Pelias development on GitHub<br/>
   https://github.com/pelias/pelias<br/>
   https://pelias.io

2. Keep up with Mapzen Search (which is essentially same as Pelias)<br/>
   https://mapzen.com/projects/search/

3. Keep up with Pelias importer projects<br/>
   https://github.com/HSLdevcom/openaddresses<br/>
   https://github.com/HSLdevcom/pelias-gtfs<br/>
   https://github.com/HSLdevcom/pelias-nlsfi-places-importer<br/>
   https://github.com/pelias/openstreetmap<br/>
   https://github.com/pelias/polylines

4. Keep up with Who's on First development<br/>
   https://whosonfirst.mapzen.com/<br/>
   https://github.com/whosonfirst/whosonfirst-data/

5. Keep up with Geospatial Data Abstraction Library development<br/>
   http://www.gdal.org/

6. Keep up with ElasticSearch docker image and it's changes<br/>
   https://hub.docker.com/_/elasticsearch/
