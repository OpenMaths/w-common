# More info https://nodejs.org/en/docs/guides/nodejs-docker-webapp/

FROM node:6.6.0

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN npm install

COPY . /usr/src/app/

EXPOSE 8080
CMD [ "npm", "start" ]