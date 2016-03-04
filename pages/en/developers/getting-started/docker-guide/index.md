---
title: Docker images
---

## Docker images on dockerhub

All our services are available as Docker images in Dockerhub:
> https://hub.docker.com/r/hsldevcom/

## Digitransit build pipeline

![build pipeline](build-pipeline.svg)

Build process is performed by Snap-ci:
> https://snap-ci.com

E.g. to check digitransit-ui pipeline and its status, check:
> https://snap-ci.com/HSLdevcom/digitransit-ui/branch/master

Should you have enough permissions, you can see all builds:
> https://snap-ci.com/dashboard?view=tile

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
