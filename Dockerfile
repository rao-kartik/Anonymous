FROM node:18.16.0

WORKDIR /rentpenserver

COPY package.json ./

RUN yarn

COPY . .

EXPOSE 3001

CMD ["node", "index.js"]