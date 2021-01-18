# Base
FROM node:14.5.0 as base

WORKDIR /usr/src/backend

COPY package*.json ./

EXPOSE 4000

# Development
FROM base as development

ENV NODE_ENV development

RUN npm install

COPY . .
COPY .env .env

CMD [ "npm", "run", "dev" ]
# USER node

# Production
FROM base as production


RUN npm ci

COPY . .
COPY .env .env

RUN npm run build
ENV NODE_ENV production

CMD ["npm", "start"]
