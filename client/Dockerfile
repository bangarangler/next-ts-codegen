FROM node:14.5.0

WORKDIR /usr/src/frontend

COPY package.json ./

RUN npm install

COPY . .
COPY .env.local .env.local

# RUN npm run build

# ENV NODE_ENV production

EXPOSE 3000
CMD ["npm", "run", "dev"]
