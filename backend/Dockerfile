FROM node:14.5.0

WORKDIR /usr/src/backend

COPY package*.json ./

EXPOSE 80

# ENV NODE_ENV production

RUN npm install

COPY . .
COPY .env .env

RUN npm run build:cra

CMD ["npm", "run", "start:cra"]

