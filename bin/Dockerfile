FROM ubuntu:latest

# Set up the machine
RUN apt-get update && apt-get install -y wget nano curl sudo

# Install node 6.x
RUN wget -qO- https://deb.nodesource.com/setup_6.x | bash -
RUN apt-get install -y nodejs

# Install yarn
RUN npm install yarn -g

# Create new directory and copy source files across
RUN mkdir /usr/src/www
COPY . /usr/src/www/

# Change work dir
WORKDIR /usr/src/www

# Install dependencies
RUN sudo yarn install
RUN ./bin/override-typings
RUN npm run compile:src

# Run tests
RUN npm test

EXPOSE 80

CMD ./bin/serve-src