FROM node:10.15-stretch

RUN apt update && apt install nginx
COPY nginx.conf /etc/nginx/
COPY site.conf /etc/nginx/sites-enabled
EXPOSE 80

WORKDIR /oj-frontend
RUN npm install && npm run build
