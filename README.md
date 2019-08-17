# BFastIDE

BFastIDE is a Backend as a service used to bake backend in a minutes! yes in a minutes.

Project aim to accelerate development cycle by make a developer to focus on user interface and all kind of animations.

## Pre request

Knowledge on the following technology is require to edit and contribute to a project

* Docker
* Docker compose
* Your PC
* Internet connection

## Get Started

You can install it to your local computer or remote server or any cloud provider

* get your favorite terminal ether bash or powershell
* install docker you can find documentation here [Docker-CE](https://docs.docker.com/install/)
* install docker-compose from [Docker Website](https://docs.docker.com/compose/)
* Clone project `git clone https://github.com/fahamutech/BFastIDE.git` and `cd BFastIDE`
* Open `docker-compose.yml` file
* You can change this code snippets found in `docker-compose.yml` or leave it

``` yml
# other configuration
web:
    build: ./services/webRuntime/
    ports:
    - "80:80" # replace ports with your own or leave it some docker knowledge required
    # - "443:443"
    restart: always
# other configuration
```

* Another file you may want to change is nginx configuration file found in
* `cd services/webRuntime/nginx.conf` and open it

``` conf
// other codes

 listen 80;
    listen [::]:80;
    server_name  <YOUR_HOST_NAME OR DOMAIN>; # replace with your hostname

    #charset koi8-r;
    #access_log  /var/log/nginx/host.access.log  main;

// other codes
```

* If everything is good then run `deploy.sh` for linux or `deploy.bat` for window

``` bash
# for window
C://PROJECT_FOLDER_NAME> deploy.bat

# for linux
PROJECT_FOLDER_NAME> bash deploy.sh
```

## Contribute

Fork project make some contribution then create a pull request

* Miantainter [Joshua Mshana](http://github.com/joshuamshana)
* Email [Joshua](mama27j@gmail.com)

## Any questions

Don't hesitate to call
