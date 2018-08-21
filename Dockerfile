FROM mhart/alpine-node:8

RUN apk update && apk add vim

WORKDIR /app/functions

RUN yarn global add firebase-tools

COPY ./functions .

RUN yarn

WORKDIR /app

COPY *.json ./
COPY .* ./

COPY yarn.lock yarn.lock

RUN yarn

COPY static static
COPY environments environments
COPY pages pages
COPY datastore datastore
COPY database database
COPY components components
COPY utilities utilities

COPY next.config.js next.config.js
RUN yarn build && yarn export

COPY *.rules ./
COPY bin/*.sh bin/
COPY root/* ./out/
COPY environments/* ./out/
COPY bin/firebase-deploy.sh bin/firebase-deploy.sh



