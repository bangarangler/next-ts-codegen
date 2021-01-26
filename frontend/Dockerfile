FROM node:14.5.0

WORKDIR /usr/src/frontend

COPY package*.json ./

RUN npm install

COPY . .
COPY .env .env

RUN npm run build

