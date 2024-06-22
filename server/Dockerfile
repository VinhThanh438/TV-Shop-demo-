FROM node:alpine
WORKDIR /usr/src/app/server
COPY package*.json .
RUN npm i
COPY . .
# EXPOSE 3000
CMD ["npm", "start"]