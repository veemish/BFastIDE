FROM node:10

WORKDIR /faas

RUN git clone https://github.com/fahamutech/BFastFunction.git .
RUN git pull origin master
RUN npm ci --only=production

CMD [ "npm","run","devStart" ]
