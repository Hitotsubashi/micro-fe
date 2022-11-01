FROM node:16-alpine as build-stage
WORKDIR /app
COPY . .

FROM nginx:stable-alpine as deploy-stage
COPY --from=build-stage /app/index.html /usr/share/nginx/html
COPY --from=build-stage /app/entry.js /usr/share/nginx/html
COPY --from=build-stage /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
