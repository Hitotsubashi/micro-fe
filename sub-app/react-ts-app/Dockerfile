FROM node:16-alpine as build-stage
WORKDIR /app
COPY  yarn.lock ./
COPY package-install.json ./package.json
RUN yarn install
# COPY src ./src
# COPY public ./public
# COPY .env .rescriptsrc.js tsconfig.json ./
COPY . .
RUN touch package.json
RUN yarn build

FROM nginx:stable-alpine as deploy-stage
COPY --from=build-stage /app/build/ /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

