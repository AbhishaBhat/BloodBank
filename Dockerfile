FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install --ignore-scripts

COPY . .

RUN npm run build

ENV NODE_ENV=production

EXPOSE 8080

CMD ["npm", "start"]
