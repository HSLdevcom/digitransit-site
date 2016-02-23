---
title: Getting started
order: 4
---

First you should decide "what do you want to get started with?". You have multiple options:

1. Test drive Digitransit-ui
2. Use Digitransit APIs in your application
3. Make modifications to Digitransit-ui web app

## Test drive Digitransit-ui
This is easiest way to get started. Read [web ui documentation](../web-ui/) and how to start start Digitransit-ui in Docker.

## Use available APIs in your application
Read documentation about architecture and environment urls:
- [Architecture](../architecture/)
- [Environments](../environments/)

Then read about APIs:
- [Routing - API](../routing-api/)
- [Geocoding - API ](../geocoding-api/)
- [Map - API](../map-api/)
- [Alerts HSL - API](../alerts-hsl-api/)
- [Realtime HSL - API](../realtime-hsl-api/)

This will help you get started. Articles page might contain something useful:
- [Articles](../articles/)

## Make modifications to Digitransit-ui web app
Start by reading installation instructions from:
- https://github.com/HSLdevcom/digitransit-ui/blob/master/docs/Installation.md

## <a name="docker"></a>How to use Docker?
We use Docker, you should know how it works.
> https://docs.docker.com/

There are some OS specific hints you should be aware of:
1. Docker has native support only for Linux. This means that OS X and Windows need extra steps to get it working. For them we recommend:
> https://www.docker.com/products/docker-toolbox

2. When starting container by mapping ports e.g. like this:

<pre>
docker run -d -p 9200:9200 --name pelias-data-container hsldevcom/pelias-data-container
</pre>

You should be aware that Linux and Virtual machine based environments (Windows, OS X) expose given services differently.
On Linux: http://localhost:9200 , in other environments it doesn't work. You need to figure out docker-machine IP and use it by running:

<pre>
docker-machine config default
</pre>


This gives you something like:
<pre>
--tlsverify
--tlscacert="xxx"
--tlscert="xxx"
--tlskey="xxx"
-H=tcp://192.168.99.100:2376
</pre>

You should then access application by http://192.168.99.100:9200
