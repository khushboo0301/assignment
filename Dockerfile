# 1) Build stage
FROM node:18-alpine AS builder
WORKDIR /src

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build       # emits /src/dist

# 2) Runtime stage
FROM node:18-alpine
WORKDIR /src

COPY package*.json ./
RUN npm install --production

COPY --from=builder /src/dist ./dist

EXPOSE 5000
CMD ["node", "dist/server.js"]
