FROM mhart/alpine-node:8

WORKDIR /app/functions

RUN yarn global add firebase-tools

COPY ./functions .

RUN yarn

WORKDIR /app

COPY bin bin
COPY .* ./
COPY *.json ./
COPY *.rules ./
COPY *.js ./
COPY yarn.lock yarn.lock
COPY static static
COPY environments environments
COPY pages pages
COPY datastore datastore
COPY components components

RUN yarn

RUN yarn build:export
