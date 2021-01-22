# Base
FROM node:14.5.0 as build

WORKDIR /app

COPY ./package*.json ./

RUN npm install

COPY . .
COPY .env .env

RUN npm run build

FROM nginx:alpine

EXPOSE 3000

COPY ./nginx/default.conf /etc/nginx/conf.d/default
COPY --from=build /app/build /usr/share/nginx/html

# RUN rm /etc/nginx/conf.d/default.conf

# COPY nginx/nginx.conf /etc/nginx/conf.d
# COPY ../nginx/nginx.conf /etc/nginx/conf.d


# CMD ["nginx", "-g", "daemon off;"]








# # Base
# FROM node:14.5.0 as base
#
# WORKDIR /usr/src/backend
#
# COPY package*.json ./
#
# EXPOSE 3000
#
# # Development
# FROM base as development
#
# ENV NODE_ENV development
#
# RUN npm install
#
# COPY . .
# COPY .env .env
#
# CMD [ "npm", "start" ]
# # USER node
#
# # Production
# FROM base as production
#
# RUN npm ci
#
# COPY . .
# COPY .env .env
#
# RUN npm run build
# ENV NODE_ENV production
#
# CMD ["npm", "start"]
