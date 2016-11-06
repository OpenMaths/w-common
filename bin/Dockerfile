FROM ubuntu:latest

RUN apt-get update && apt-get install -y wget nano curl sudo
RUN curl -sL https://deb.nodesource.com/setup_6.x | bash
RUN apt-get install -y nodejs
# RUN npm install yarn -g

RUN mkdir /usr/openmaths
WORKDIR /usr/openmaths
COPY . /usr/openmaths

RUN npm install # yarn install no work with Circle CI
RUN mv .env.production .env
RUN ./bin/override-typings.sh
RUN ./bin/compile-src.sh
RUN ./bin/test-src.sh

EXPOSE 80

CMD ./bin/serve-src.sh