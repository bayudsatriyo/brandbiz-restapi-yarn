FROM node:18.15

WORKDIR /usr/scr/brandbizapi

COPY . .

RUN yarn install

EXPOSE 8080

CMD ["yarn", "start"]