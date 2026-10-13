FROM node:22-bookworm-slim
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm install -g pnpm@11.25.0
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm build && node scripts/verify-vercel-build.mjs
ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000
USER node
CMD ["sh", "-c", "exec ./node_modules/.bin/next start --hostname 0.0.0.0 --port ${PORT:-3000}"]
