FROM ubuntu:latest

# Set up the machine
RUN apt-get update && apt-get install -y wget nano curl sudo
RUN curl -sL https://deb.nodesource.com/setup_6.x | bash
RUN apt-get install -y nodejs
# RUN npm install yarn -g

# Create new directory and change work dir
RUN mkdir /usr/openmaths
WORKDIR /usr/openmaths

# Copy source files across
COPY . /usr/openmaths

# Set up .env correctly (based on .env.production)
RUN mv .env.production .env

# Install dependencies
# RUN yarn install Doesn't work with CircleCI at the minute
RUN npm install
RUN ./bin/override-typings.sh
RUN ./bin/compile-src.sh

# Run tests
RUN ./bin/test-src.sh

EXPOSE 80

CMD ./bin/serve-src.sh