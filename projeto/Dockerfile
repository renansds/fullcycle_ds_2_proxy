FROM node:alpine
WORKDIR /usr/src/app
COPY . .
RUN npm install

EXPOSE 3000

CMD ["sh", "-c", "sleep 30 && node index.js"]


