# use the official Bun image
# see all versions at https://hub.docker.com/r/oven/bun/tags
FROM oven/bun:1
WORKDIR /app

# Import package json and bun lock for dependancies
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# Import code
COPY src/ ./src/
COPY assets/ ./assets/

EXPOSE 8080

# run the app
ENTRYPOINT ["bun", "run", "src/index.ts"]