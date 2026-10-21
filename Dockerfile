FROM node:24 AS build
LABEL maintainer="Reittiopas" version="0.1"

ENV WORK=/opt/digitransit-site
WORKDIR ${WORK}

# Install dependencies first so that the layer is cached until they change
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Add application
COPY . ${WORK}
RUN yarn build

FROM node:24-slim

WORKDIR /opt/digitransit-site
COPY --from=build /opt/digitransit-site/public ./
COPY --from=build /opt/digitransit-site/serve.json ./
RUN yarn global add serve@14.2.4
EXPOSE 8080
CMD ["serve", "-l", "8080"]
