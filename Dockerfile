FROM node:10

WORKDIR /ide

COPY package*.json ./
RUN npm ci --only=production
RUN apt-get update
RUN apt-get install -y openjdk-8-jdk
RUN apt-get install -y zip
COPY . ./
# RUN bash /ide/src/spring/init.sh
# RUN git clone  https://github.com/fahamutech/daas.git /ide/src/spring/daas
# RUN bash /ide/src/spring/daas/gradlew build
# #RUN bash /ide/src/spring/daas/gradlew bootJar

CMD [ "node", "bin/www" ]
