FROM node:4.4
RUN npm install mongoose --save
RUN npm install express --save
RUN npm install body-parser --save
RUN npm install cookie-parser --save
RUN npm install multer --save
RUN npm install mongodb --save
EXPOSE 8080
COPY *.js /scripts/
CMD node /scripts/server.js

