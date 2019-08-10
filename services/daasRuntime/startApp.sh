#!/bin/sh
cp /ide/daas/build/libs/daas-1.0.jar /app/daas-1.0.jar && java -Djava.security.egd=file:/dev/./urandom -jar /app/daas-1.0.jar