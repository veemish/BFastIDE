FROM node:10

WORKDIR /DaaS

COPY package*.json .
RUN npm ci --only=production
COPY . .
CMD [ "node", "bin/www" ]
