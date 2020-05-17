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
COPY .env .
RUN apk add --no-cache postgresql-libs gcc musl-dev postgresql-dev
RUN ./build.sh
EXPOSE $PORT
ENTRYPOINT ["./run.sh", "--dev"]
