---
title: Geocoding - Data
---
## Description
Docker geocoding data container for Pelias

## Service architecture
Service is basically a script that fetches data from multiple data sources, converts part of this data into other format, and loads it into ElasticSearch using Pelias tools. Therefore, produced service is a ElasticSearch docker image containing Geocoding data that can be used with Pelias Geocoder.

### General Pelias information
Start by reading (Note that it might not be up-to-date):
> https://mapzen.com/blog/pelias-setup-tutorial

### Dataflow (what happens when docker image is built)
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

## Getting started with Docker containers

### Building docker image
- git clone git@github.com:HSLdevcom/pelias-data-container.git
- cd pelias-data-container
- docker build -t hsldevcom/pelias-data-container .

### Running docker container
- docker run -d -p 9200:9200 --name pelias-data-container hsldevcom/pelias-data-container

### Exploring data
For Exploring ElasticSearch data you can open browser (when container is running):
> http://{DOCKER HOST}:9200/_plugin/head/

This url contains navigator that can be user to make queries to ElasticSearch. Select
"Browser"-tab and write queries to "name.default" field.

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

## Project assets
| Asset                         | url                                                                       |
|-------------------------------|---------------------------------------------------------------------------|
| Code                          | https://github.com/HSLdevcom/pelias-data-container                       
| Dockerfile                    | https://github.com/HSLdevcom/pelias-data-container/blob/master/Dockerfile
| Pelias config                 | https://github.com/HSLdevcom/pelias-data-container/blob/master/pelias.json
| Docker image                  |                                                           |
| pelias-nlsfi-places-importer  | https://github.com/HSLdevcom/pelias-nlsfi-places-importer.git

## Key service delivery activities
1. Keep up with Pelias development on GitHub

> https://github.com/pelias/pelias

2. Keep up with Mapzen Search (which is essentially same as Pelias)

> https://mapzen.com/projects/search/

3. Keep up with Pelias importer projects

> https://github.com/pelias/quattroshapes

> https://github.com/pelias/openaddresses

> https://github.com/pelias/openstreetmap

> https://github.com/HSLdevcom/pelias-nlsfi-places-importer.git

4. Keep up with Pelias-cli development

> https://github.com/pelias/cli

5. Keep up with Who's on First development

> https://whosonfirst.mapzen.com/

> https://github.com/whosonfirst/whosonfirst-data/

6. Keep up with Geospatial Data Abstraction Library development

> http://www.gdal.org/

7. Keep up with ElasticSearch docker image and it's changes

> https://hub.docker.com/_/elasticsearch/
