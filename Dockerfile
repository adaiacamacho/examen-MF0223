FROM node:24-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

FROM nginx:stable-alpine
COPY --from=build /app/. /usr/share/nginx/html
EXPOSE 80
CMD [ "nginx", "-g", "daemon off;" ]