FROM node:alpine

WORKDIR /app

COPY package.json ./

RUN npm i

COPY src ./src

EXPOSE 3000

CMD ["node", "src/app.js"]