# === Stage 1: Build ===
FROM node:23-alpine AS builder

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .
RUN yarn build


# === Stage 2: Nginx Static Server ===
FROM nginx:stable-alpine AS production

# Copy built static files
COPY --from=builder /app/dist /usr/share/nginx/html

# Optional: Replace the default nginx config (helps with SPA routing)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]