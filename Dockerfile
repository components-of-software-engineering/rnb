# frontend
FROM node:alpine AS client
WORKDIR /usr/src/frontend
COPY src/client .
RUN ./build.sh


# backend
FROM python:3.6-alpine
WORKDIR /usr/src/backend
COPY --from=client /usr/src/frontend/dist dist
COPY --from=client /usr/src/frontend/assets assets
COPY src/server .
RUN ./build.sh
ENTRYPOINT ["./run.sh", "--prod"]
