FROM node:14

ADD package.json /package.json

ENV NODE_PATH=/node_modules
ENV PATH=$PATH:/node_modules/.bin
RUN yarn install

WORKDIR /app
ADD . /app

EXPOSE 3000
