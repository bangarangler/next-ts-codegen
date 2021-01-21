# Base
FROM node:14.5.0 as base

WORKDIR /usr/src/frontend

COPY package*.json ./

EXPOSE 3000

FROM base as development

ENV NODE_ENV development

RUN npm install

COPY . .
COPY .env.local .env.local

CMD ["npm", "run", "dev"]

# Production Build
FROM base as production

# RUN npm ci
RUN npm install

COPY . .
COPY .env.production .env

RUN npm run build
# RUN npm run build:static
ENV NODE_ENV production

CMD ["npm", "start"]

