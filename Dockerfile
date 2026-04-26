
FROM node:20-alpine AS builder
WORKDIR /app
COPY frontend/package*.json ./frontend/
RUN cd frontend && npm ci
COPY frontend/ ./frontend/
RUN cd frontend && npm run build


FROM node:20-alpine
WORKDIR /app
COPY backend/package*.json ./
RUN npm ci --only-production
COPY backend/ ./
COPY --from=builder /app/frontend/dist ./frontend/dist
EXPOSE 3000
CMD ["node", "index.js"]