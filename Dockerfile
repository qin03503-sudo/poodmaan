FROM node:22-alpine

WORKDIR /workspace

RUN corepack enable pnpm && corepack prepare pnpm@10.33.3 --activate

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./
COPY apps/web/package.json apps/web/package.json
COPY apps/creator-studio/package.json apps/creator-studio/package.json
COPY packages/bff/package.json packages/bff/package.json
COPY packages/ui/package.json packages/ui/package.json

RUN pnpm install

COPY . .

CMD ["pnpm", "dev"]
