FROM node:10-alpine as build
MAINTAINER Reittiopas version: 0.1

ENV WORK=/opt/digitransit-site

WORKDIR ${WORK}

RUN yarn global add gatsby-cli@2.4.5 && \
  mkdir -p ${WORK}

# Add application
ADD . ${WORK}

RUN yarn && \
  gatsby build

FROM node:10-alpine

WORKDIR /opt/digitransit-site
COPY --from=build /opt/digitransit-site/public ./
RUN yarn global add serve@10.1.1
EXPOSE 8080
CMD serve -l 8080
