FROM node:8
MAINTAINER Reittiopas version: 0.1

ENV WORK=/opt/digitransit-site

WORKDIR ${WORK}

RUN npm install -g gatsby@0.7.7 && \
  npm install -g serve@1.4.0

# Add application
RUN mkdir -p ${WORK}
ADD . ${WORK}

RUN npm install && \
  gatsby build

EXPOSE 8080

CMD serve -p 8080 ./public
