FROM node:16.10-alpine as appbuild
WORKDIR /usr/src/app
COPY . .
RUN npm install
RUN npm run build
CMD ["npm", "run", "start"]