FROM node:4.4
EXPOSE 8080
COPY server.js .
COPY package.json .
RUN npm config set proxy http://www-proxy.us.oracle.com:80 && \
    npm config set https-proxy http://www-proxy.us.oracle.com:80
RUN npm install
CMD node server.js


