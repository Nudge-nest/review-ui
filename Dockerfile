# === Stage 1: Build ===
FROM node:23-alpine AS builder

WORKDIR /app

# Copy package files first (caching optimization)
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copy .env.production (optional, but useful for local testing)
COPY .env .

# Define ARGs (these match VITE_ vars)
ARG VITE_APP_BACKEND_HOST
ARG VITE_APP_AWS_ACCESS_KEY
ARG VITE_APP_AWS_SECRET_KEY
ARG VITE_APP_AWS_REGION
ARG VITE_APP_AWS_BUCKET_NAME

# Debug: Print received ARG values
RUN echo "=== Docker Build Debug ==="
RUN echo "VITE_APP_AWS_REGION ARG: $VITE_APP_AWS_REGION"
RUN echo "VITE_APP_BACKEND_HOST ARG: $VITE_APP_BACKEND_HOST"
RUN echo "=========================="

# Create .env file with actual values
RUN echo "VITE_APP_BACKEND_HOST=$VITE_APP_BACKEND_HOST" > .env && \
    echo "VITE_APP_AWS_ACCESS_KEY=$VITE_APP_AWS_ACCESS_KEY" >> .env && \
    echo "VITE_APP_AWS_SECRET_KEY=$VITE_APP_AWS_SECRET_KEY" >> .env && \
    echo "VITE_APP_AWS_REGION=$VITE_APP_AWS_REGION" >> .env && \
    echo "VITE_APP_AWS_BUCKET_NAME=$VITE_APP_AWS_BUCKET_NAME" >> .env

# Debug: Show .env contents
RUN echo "=== .env file contents ===" && cat .env && echo "========================"

COPY . .
RUN yarn build


# === Stage 2: Nginx Static Server ===
FROM nginx:stable-alpine AS production

# Copy built static files
COPY --from=builder /app/dist /usr/share/nginx/html

# Optional: Copy runtime .env (if needed for SSR or dynamic config)
COPY --from=builder /app/.env /usr/share/nginx/html/.env

# Optional: Replace the default nginx config (helps with SPA routing)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]