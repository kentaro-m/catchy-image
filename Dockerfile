FROM node:12.14
WORKDIR /usr/src/app
COPY package.json .
RUN npm install
COPY . .
CMD npm test