FROM node:18-alpine

# RUN mkdir -p /app

WORKDIR /app

COPY package*.json ./

RUN yarn install

COPY . .

RUN yarn build

EXPOSE 5010

CMD ["yarn", "start"]
