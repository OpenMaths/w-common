FROM ubuntu:latest

# Set up the machine
RUN apt-get update && apt-get install -y wget nano curl sudo
RUN curl -sL https://deb.nodesource.com/setup_6.x | bash
RUN apt-get install -y nodejs

# Create new directory and change work dir
RUN mkdir /usr/openmaths
WORKDIR /usr/openmaths

# Install yarn
# RUN npm install yarn -g

# Copy source files across
COPY . /usr/openmaths

# Set up .env correctly (based on .env.production)
RUN mv .env.production .env

# Install dependencies
# RUN yarn install Doesn't work with CircleCI at the minute
RUN npm install
RUN ./bin/override-typings
RUN npm run compile:src

# Run tests
RUN npm test

EXPOSE 80

CMD ./bin/serve-src