# DevWeb: aBlog (DRF & Nuxt)

* Avril 2020
* Latino Nathan
* Rosca Sol
* Live: [161.35.29.177](http://161.35.29.177/) and [161.35.29.177/api](http://161.35.29.177)

## Deploy
* **digital ocean**
    * `ssh ablog@161.35.29.177`
    * couleurcouleur1212
* **postgres**
    * db: ablog
    * user: ablog
    * pw: couleurcouleur1212



### Backend
* Inside ablog/backend
* `mv .env-example .env` & set values
* setup env and workon it
* `pip install -r requirements.txt`

### Frontend
* Inside ablog/frontend
* `mv .env-example .env` & set values
* `npm -i`
* `nuxt build`


### Nginx

```nginx
# /etc/nginx/sites-available/ablog

server {
    server_name 161.35.29.177;

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

