FROM node:22.12.0

WORKDIR /client
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

RUN npm install -g serve

EXPOSE 3000
CMD  ["serve", "-s", "build"]