FROM oven/bun:canary-alpine AS production

WORKDIR /app

COPY . .

EXPOSE 3000

CMD [ "bun",".output/server/index.mjs" ]