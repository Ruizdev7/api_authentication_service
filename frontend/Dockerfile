FROM node:alpine
WORKDIR /
COPY package.json .
COPY package-lock.json .
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npx","serve","dist"]


#FROM httpd:alpine
#WORKDIR /var/www/html
#COPY --from=build ./dist /var/www/frontend/

#FROM nginx:alpine
#ADD ./nginx/nginx.conf /etc/nginx/conf.d/nginx.conf
#COPY --from=build ./dist /var/www/frontend/
#EXPOSE 80
#CMD ["nginx", "-g", "daemon off;"]