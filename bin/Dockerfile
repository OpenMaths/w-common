# More info https://nodejs.org/en/docs/guides/nodejs-docker-webapp/

FROM node:6.6.0

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . /usr/src/app/

RUN npm install yarn -g
RUN yarn

RUN mv .env.production .env

RUN ./bin/override-typings
RUN ./bin/compile-src
RUN ./bin/test-src

EXPOSE 8080
CMD ["./bin/run"]