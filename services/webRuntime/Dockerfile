FROM nginx

WORKDIR /web

COPY nginx.conf /etc/nginx/conf.d/default.conf
RUN apt-get update
RUN apt-get install -y git
RUN apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash
RUN apt-get install -y nodejs
# RUN npm i -g @angular/cli
RUN git clone https://github.com/fahamutech/BFastIDEAngularApp.git ./
RUN git pull origin master
RUN npm install
RUN npm run build
# RUN ls /web/dist/app
# COPY /web/dist/app /usr/share/nginx/html/
RUN mkdir /dist
RUN cp -r /web/dist/app /dist
RUN apt-get purge -y git
RUN apt-get purge -y nodejs
RUN apt-get purge -y curl
RUN rm -r /web/*
