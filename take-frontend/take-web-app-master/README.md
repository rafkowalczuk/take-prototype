# TAKE web app

Semester VI of IT studies on Silesian University of Science and Technology

## Settings

There is single config file with basic setup of app. It's under `./src/settings.js` path.

## Development in Docker

1. Build image:
```shell
docker build -t take-web-app .
```

2. Run container:
```shell
docker run -d -p 8081:80 take-web-app:latest
```

You can change external (host) port, but it requires update of browserBaseURL
port in settings too.
