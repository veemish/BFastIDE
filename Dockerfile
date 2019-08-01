FROM node:10

WORKDIR /ide

COPY package*.json ./
RUN npm ci --only=production
RUN apt-get update
RUN apt-get install -y openjdk-8-jdk
COPY . ./
CMD [ "node", "bin/www" ]
