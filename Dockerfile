FROM node:18.16.0

WORKDIR /rentpenserver

COPY package.json ./

RUN yarn

COPY . .

EXPOSE 3000

CMD ["node", "index.js"]