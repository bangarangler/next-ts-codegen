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
# Handled in backend package.json here for documentation the .graphql files
# inside ./graphql/types need to be moved inside of ./dist/graphql/types post
# build
# COPY ./graphql/types ./graphql/types

RUN npm run build
ENV NODE_ENV production

CMD ["npm", "start"]
