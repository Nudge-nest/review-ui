# === Stage 1: Build ===
FROM node:23-alpine AS builder

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Define ARGs (these match VITE_ vars)
ARG VITE_APP_BACKEND_HOST
ARG VITE_APP_AWS_ACCESS_KEY
ARG VITE_APP_AWS_SECRET_KEY
ARG VITE_APP_AWS_REGION
ARG VITE_APP_AWS_BUCKET_NAME

# Set env so Vite sees them during build
ENV VITE_APP_BACKEND_HOST=$VITE_APP_BACKEND_HOST
ENV VITE_APP_AWS_ACCESS_KEY=$VITE_APP_AWS_ACCESS_KEY
ENV VITE_APP_AWS_SECRET_KEY=$VITE_APP_AWS_SECRET_KEY
ENV VITE_APP_AWS_REGION=$VITE_APP_AWS_REGION
ENV VITE_APP_AWS_BUCKET_NAME=$VITE_APP_AWS_BUCKET_NAME

COPY .env .
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