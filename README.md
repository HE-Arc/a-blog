# DevWeb: aBlog (DRF & Nuxt)

* Avril 2020
* Latino Nathan
* Rosca Sol
* Live: [https://roscas.ch](https://roscas.ch) and [https://roscas.ch/api](https://roscas.ch/api)

## Data modelisation

* [dbdiagram.io](https://dbdiagram.io/d/5ea861c039d18f5553fe5eb4)

![](https://i.imgur.com/464QPI8.png)


## Server data

* **digital ocean**
    * 161.35.29.177
    * `ssh ablog@roscas.ch`, `ssh guest@roscas.ch`
    * couleurcouleur1212
* **postgres**
    * db: ablog
    * user: ablog
    * pw: couleurcouleur1212

## Setup
* Create & setup a new user
* `su` into it
* `git clone` current repository

### Backend
* Inside ablog/backend
* `mv .env-example .env` & set values
* setup env and `workon` *optional*
* `pip install -r requirements.txt`
* `pip install gunicorn`

### Frontend
* Inside ablog/frontend
* `mv .env-example .env` & set values
* `npm -i`
* `nuxt build`


## Configs

### Supervisor

```conf
# /etc/supervisor/supervisord.conf

[supervisord]
logfile=/tmp/supervisord.log ; (main log file;default $CWD/supervisord.log)
logfile_maxbytes=50MB        ; (max main logfile bytes b4 rotation;default 50MB)
logfile_backups=10           ; (num of main logfile rotation backups;default 10)
loglevel=info                ; (log level;default info; others: debug,warn,trace)
pidfile=/tmp/supervisord.pid ; (supervisord pidfile;default supervisord.pid)
nodaemon=false               ; (start in foreground if true;default false)
minfds=1024                  ; (min. avail startup file descriptors;default 1024)
minprocs=200                 ; (min. avail process descriptors;default 200)
environment=DJANGO_SETTINGS_MODULE="config.settings"

[inet_http_server]
port=127.0.0.1:9001

[supervisorctl]
serverurl=http://127.0.0.1:9001

[rpcinterface:supervisor]
supervisor.rpcinterface_factory = supervisor.rpcinterface:make_main_rpcinterface

[program:gunicorn]
command=/home/ablog/.virtualenvs/ablog/bin/gunicorn --access-logfile - --workers 3 --bind 0.0.0.0:8000 config.wsgi:application
directory=/home/ablog/ablog/backend
autostart=true
autorestart=true
stderr_logfile=/var/log/gunicorn.err.log
stdout_logfile=/var/log/gunicorn.out.log

[program:nuxt]
directory=/home/ablog/ablog/frontend/
command=npm run start
autostart=true
autorestart=true
stderr_logfile=/var/log/gunicorn.err.log
stdout_logfile=/var/log/gunicorn.out.log
```

#### Usefull

* `supervisorctl reread `
* `supervisorctl update `
* `supervisorctl status `
* `supervisorctl restart <name> `
* `service supervisor [name] stop   `
* `service supervisor [name] start  `

### Nginx

```nginx
# /etc/nginx/sites-available/ablog

server {
    server_name roscas.ch www.roscas.ch
    access_log /home/ablog/logs/backend/nginx-access.log;
    access_log /home/ablog/logs/backend/nginx-error.log;

    location /static/ {
        alias /home/ablog/ablog/backend/static/;
    }

    location ~ ^/(admin|api) {
        proxy_redirect off;
        proxy_pass http://localhost:8000;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $http_host;
    }

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

#### Usefull

* `nginx -t`: conf file syntax check
* `service nginx restart`

### Let's encrypt & Certbot

#### SSL certificate

* `sudo add-apt-repository ppa:certbot/certbot`
* `sudo apt-get update`
* `sudo apt-get install python-certbot-nginx`
* `sudo certbot --nginx -d roscas.ch -d www.roscas.ch` (must match `server_name` inside nginx config file)

#### Auto renew

* `sudo apt install cron`
* `sudo systemctl enable cron`
* `crontab -e`
* add `0 12 * * * /usr/bin/certbot renew --quiet`

## Mixed content issue

* [so](https://stackoverflow.com/questions/59071562/django-media-url-return-https-instead-of-http)

* Inside `/etc/nginx/sites-available/ablog` replace `proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;` with `proxy_set_header X-Forwarded-Proto https;`
* Inside Django's settings file add:
```py
USE_X_FORWARDED_HOST = True
SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')
```