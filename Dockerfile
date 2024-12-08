FROM oven/bun:canary-alpine AS production

COPY . .

EXPOSE 3000

CMD [ "bun",".output/server/index.mjs" ]