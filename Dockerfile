FROM node:22-alpine

WORKDIR /workspace

RUN corepack enable pnpm

COPY package.json pnpm-workspace.yaml .npmrc ./
COPY apps/web/package.json apps/web/package.json
COPY apps/creator-studio/package.json apps/creator-studio/package.json
COPY packages/bff/package.json packages/bff/package.json
COPY packages/ui/package.json packages/ui/package.json

RUN pnpm install

COPY . .

CMD ["pnpm", "dev"]
