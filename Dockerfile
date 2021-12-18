FROM node:12-alpine
WORKDIR /usr/src/app

COPY package*.json ./
COPY .npmrc ./
COPY ./dist dist/
COPY ./docker-src/package.json ./
RUN npm install
EXPOSE 3000
ENTRYPOINT [ "npm", "start" ]
