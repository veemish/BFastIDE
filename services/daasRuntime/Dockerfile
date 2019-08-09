FROM openjdk:8

WORKDIR /app
COPY ./ ./
# RUN ls -l /
RUN chmod +x /app/startApp.sh

CMD [ "/bin/bash", "/app/startApp.sh" ]
# CMD [ "java","-Djava.security.egd=file:/dev/./urandom","-jar","/ide/daas/build/libs/daas-1.0.jar" ]
