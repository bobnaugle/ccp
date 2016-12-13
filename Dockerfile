FROM node:4.4
EXPOSE 8081
COPY server.js .
COPY package.json .
COPY mongodb.js .
RUN npm config set proxy http://www-proxy.us.oracle.com:80 && \
    npm config set https-proxy http://www-proxy.us.oracle.com:80
RUN npm install
CMD node server.js

