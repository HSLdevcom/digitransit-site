---
title: Runtime environment
---

Digitransit platform components need to be weaved together to form a runtime that can be used for multimodal routing.
Each component is first built into a Docker image and then started as a Docker container.

Since logical entities (e.g. Map and Routing) consist of multiple containers, we need a way to weave these containers together while enabling load balancing for each of the services.

At the moment we use [ACS (DC/OS, marathon and mesos)](https://docs.microsoft.com/en-us/azure/container-service/dcos-swarm/) PaaS to run the enviroment but [it will retire on January 31, 2020](https://azure.microsoft.com/en-us/updates/azure-container-service-will-retire-on-january-31-2020/) and we will change our runtime environment before that. This is our current architecture with all the integrations included:

![Architecture](../architecture.png)

Our deployment scripts are available at https://github.com/HSLdevcom/digitransit-mesos-deploy
