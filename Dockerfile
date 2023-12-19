FROM node:16 as build
MAINTAINER Reittiopas version: 0.1

ENV WORK=/opt/digitransit-site

WORKDIR ${WORK}

RUN yarn global add gatsby-cli@2.4.5 && \
  mkdir -p ${WORK}

# Add application
ADD . ${WORK}

RUN yarn && \
  gatsby build

FROM node:16

WORKDIR /opt/digitransit-site
COPY --from=build /opt/digitransit-site/public ./
COPY --from=build /opt/digitransit-site/serve.json ./
RUN yarn global add serve@10.1.1
EXPOSE 8080
CMD serve -l 8080
