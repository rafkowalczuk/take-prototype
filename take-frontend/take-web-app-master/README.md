# TAKE web app

Semester VI of IT studies on Silesian University of Science and Technology

## Development in Docker

1. Build image:
```shell
docker build -t take-web-app .
```

2. Run container:
```shell
docker run -d -p 8081:8080 take-web-app:latest
```
