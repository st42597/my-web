FROM node:22.10.0-alpine3.19

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm rebuild bcrypt --build-from-source

COPY . .

EXPOSE 5000

CMD ["node", "index.js"]