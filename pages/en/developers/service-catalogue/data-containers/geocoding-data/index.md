---
title: Geocoding Data
description:
  info: Data container for Pelias
  architecture: https://raw.githubusercontent.com/HSLdevcom/digitransit-site/master/pages/en/developers/service-catalogue/data-containers/geocoding-data/architecture.xml
assets:
  source: https://github.com/HSLdevcom/pelias-data-container
  dockerHub: https://hub.docker.com/r/hsldevcom/pelias-data-container/
  Dockerfile: https://github.com/HSLdevcom/pelias-data-container/blob/master/Dockerfile
  "Pelias config": https://github.com/HSLdevcom/pelias-data-container/blob/master/pelias.json
  pelias-nlsfi-places-importer: https://github.com/HSLdevcom/pelias-nlsfi-places-importer.git
technologies:  
  "SIRI": "http://user47094.vs.easily.co.uk/siri/"
  "GTFS-RT": "https://developers.google.com/transit/gtfs-realtime/"
  "Python": null
docker:
  dockerfile: https://github.com/HSLdevcom/pelias-data-container/blob/master/Dockerfile
  imageName: hsldevcom/pelias-data-container
  buildScript: https://github.com/HSLdevcom/pelias-data-container/blob/master/build-docker-image.sh
  runContainer: docker run -p 8080:8080 hsldevcom/pelias-data-container
  accessContainer: http://localhost:8080/HSL?debug
---

This service is essentially an ElasticSearch instance containing Geocoding data that can be used with Pelias Geocoder.

### General Pelias information
Start by reading (Note that it might not be up-to-date):
> https://mapzen.com/blog/pelias-setup-tutorial


### How data is built?
On build time the data is fetched from multiple sources and processed and loaded into ElasticSearch using
Pelias tools. At high level this is what happens:

1. Download and extract shapefiles from Quattroshapes

2. Download Finnish municipalities NLS and convert them to Quattroshapes format

3. Download Finland zip codes from Finland Statistics and convert them to Quattroshapes format

4. Download Open Street Map Finland data

5. Download Helsinki, Oulu, and Turku openaddresses data

6. Download NLS places

7. Start ElasticSearch, and Address deduper service

8. Create pelias schema and import Quattroshapes data

9. Run NLS places import

10. Run openaddresses import

11. Run Open Street Map address import. Data that is already found from openaddresses will be skipped.


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

### Open addresses
- Url: https://openaddresses.io/
- Datafile: http://data.openaddresses.io.s3.amazonaws.com/runs/37881/fi/18/helsinki.zip
- Datafile: http://data.openaddresses.io.s3.amazonaws.com/runs/37878/fi/14/oulu.zip
- Datafile: http://data.openaddresses.io.s3.amazonaws.com/runs/32517/fi/19/turku.zip
- Types: Address (Helsinki, Oulu, Turku)

Open addresses is a open data collaborative to produce global address data around the world. We use addresses from Open addresses as primary data.

### Open Street Map
- Url: https://www.openstreetmap.org
- Datafile: http://download.geofabrik.de/europe/finland-latest.osm.pbf
- Types: neighbourhood, locality, address, venue, stop

Our goal is to use as much data from OSM as possible. Unfortunately, at the moment it doesn't contain everything that we need so we have to use other sources also.

### NLS Nimistö
- Url: http://www.maanmittauslaitos.fi/digituotteet/nimisto
- Datafile: http://kartat.kapsi.fi/files/nimisto/paikat/etrs89/gml/paikat_2015_05.zip
- Types: Place

National Land survey Nimistö ("places") contains place names in Finland. It provides places like "Takalammi".

### Quattroshapes
- Url: http://quattroshapes.com/
- Datafile: http://quattroshapes.mapzen.com/quattroshapes/alpha3/FIN.tgz
- Types: municipality and locality borders

Quattroshapes is a place data source provided by Foursquare. It provides polygon data for places based on Foursquare checkins.

### NLS Kuntajako (Quattroshapes enhancer)
- Url: http://www.maanmittauslaitos.fi/digituotteet/kuntajako
- Datafile: http://kartat.kapsi.fi/files/kuntajako/kuntajako_10k/etrs89/gml/TietoaKuntajaosta_2015_10k.zip
- Types: municipality and locality borders

NOTE! Currently not used any way, we could even remove this.

NLS kuntajako ("municipalities") From National Land Survey contains official Finnish municipality borders and other places that are interesting localities e.g. "Sahalahti". It is used to improve Quattroshapes municipality and locality data.

### Statistics Finland postinumeroalue (Quattroshapes enhancer)
- Url: http://www.stat.fi/tup/paavo/index.html
- Data WFS url: http://geo.stat.fi/geoserver/postialue/postialue%3Apno_meri_2015/wfs
- Types: postal number

Postal address information From Statistics Finland is used to improve Quattroshapes data. This information attaches postal number to address results. e.g. Helsinki, Käpylä is 00610.


## Key service delivery activities
1. Keep up with Pelias development on GitHub<br/>
   https://github.com/pelias/pelias

2. Keep up with Mapzen Search (which is essentially same as Pelias)<br/>
   https://mapzen.com/projects/search/

3. Keep up with Pelias importer projects<br/>
   https://github.com/pelias/quattroshapes<br/>
   https://github.com/pelias/openaddresses<br/>
   https://github.com/pelias/openstreetmap<br/>
   https://github.com/HSLdevcom/pelias-nlsfi-places-importer.git

4. Keep up with Pelias-cli development<br/>
   https://github.com/pelias/cli

5. Keep up with Who's on First development<br/>
   https://whosonfirst.mapzen.com/<br/>
   https://github.com/whosonfirst/whosonfirst-data/

6. Keep up with Geospatial Data Abstraction Library development<br/>
   http://www.gdal.org/

7. Keep up with ElasticSearch docker image and it's changes<br/>
   https://hub.docker.com/_/elasticsearch/
