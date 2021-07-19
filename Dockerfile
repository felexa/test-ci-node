ARG NODE_VERSION=13

FROM node:${NODE_VERSION}-alpine

WORKDIR /app

COPY package*.json .env .babelrc .eslintrc *.js ./

COPY src ./src/

COPY public ./public/

RUN npm install && npm cache clear --force && npm run build

EXPOSE 3000

CMD [ "npm", "start" ]
