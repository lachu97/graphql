FROM node:alphine
WORKDIR /app
COPY . /app
RUN apt-get update && apt-get install node
CMD [ "node server.js" ]