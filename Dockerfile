FROM node:carbon

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install && npm build

COPY . .

EXPOSE 3333

CMD [ "npm", "start" ]