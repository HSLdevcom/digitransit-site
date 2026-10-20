FROM node:24 as build
MAINTAINER Reittiopas version: 0.1

ENV WORK=/opt/digitransit-site

WORKDIR ${WORK}

RUN mkdir -p ${WORK}

# Add application
ADD . ${WORK}

RUN yarn && \
  yarn build

FROM node:24

WORKDIR /opt/digitransit-site
COPY --from=build /opt/digitransit-site/public ./
COPY --from=build /opt/digitransit-site/serve.json ./
RUN yarn global add serve@10.1.1
EXPOSE 8080
CMD serve -l 8080
