FROM node:18.15

WORKDIR /usr/scr/brandbizapi

COPY . .

RUN npm install

EXPOSE 8080

CMD ["npm", "start"]