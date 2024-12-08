FROM oven/bun:canary-alpine AS base

WORKDIR /app

COPY . .

RUN bun install

RUN bun run build

FROM oven/bun:canary-alpine AS production

WORKDIR /app

COPY --from=base /app/.output /app/.output
COPY --from=base /app/public /app/public
COPY --from=base /app/.vinxi /app/.vinxi

EXPOSE 3000

CMD [ "bun",".output/server/index.mjs" ]