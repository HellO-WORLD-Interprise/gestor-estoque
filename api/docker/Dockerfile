FROM node:24-alpine

WORKDIR /app

# Instala o CLI do NestJS para facilitar comandos dentro do container
RUN npm install -g @nestjs/cli

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start:dev"]