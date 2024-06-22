FROM node:alpine
WORKDIR /usr/src/app/server
COPY package*.json .
RUN npm ci
COPY . .
# EXPOSE 3000
CMD ["npm", "start"]