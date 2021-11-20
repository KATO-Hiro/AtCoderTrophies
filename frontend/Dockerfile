FROM node:16

ADD package.json /package.json

ENV NODE_PATH=/node_modules
ENV PATH=$PATH:/node_modules/.bin
RUN yarn install

WORKDIR /app
ADD . /app

RUN yarn build

EXPOSE 3000

CMD ["yarn", "dev"]
