
# Docker Instructions for Football AI Video Studio

This document provides instructions on how to build and run the Football AI Video Studio application using Docker.

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/) (optional, for easier management)

## Building and Running with Docker

### Using Docker Compose (Recommended)

1. Build and start the container:

```bash
docker-compose up -d
```

2. Access the application at http://localhost:8080

3. Stop the container:

```bash
docker-compose down
```

### Using Docker CLI

1. Build the Docker image:

```bash
docker build -t football-video-studio .
```

2. Run the container:

```bash
docker run -p 8080:80 -d --name football-video-app football-video-studio
```

3. Access the application at http://localhost:8080

4. Stop the container:

```bash
docker stop football-video-app
docker rm football-video-app
```

## Configuration

To customize the configuration, you can modify the environment variables in the `docker-compose.yml` file or pass them directly to the `docker run` command using the `-e` flag.

## Production Deployment

For production deployment, consider the following:

1. Use a non-root user in the Dockerfile for better security
2. Add HTTPS support using a reverse proxy like Nginx or Traefik
3. Set up proper logging and monitoring
4. Use Docker secrets or environment variables for sensitive information
