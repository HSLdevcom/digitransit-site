---
title: Runtime environment
---

Digitransit platform components need to be weaved together to form a runtime that can be used for multimodal routing.
Each component is first built into a Docker image and then started as a Docker container.

Since logical entities (e.g. Map and Routing) consist of multiple containers, we need a way to weave these containers together while enabling load balancing for each of the services.

We use [Azure Kubernetes Service (AKS)](https://docs.microsoft.com/en-us/azure/aks/) PaaS for our development and production enviroments. This is our current architecture with all the integrations included:

![Architecture](../architecture.png)

Our deployment scripts are available at https://github.com/HSLdevcom/digitransit-kubernetes-deploy
