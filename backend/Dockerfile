FROM node:22-alpine

WORKDIR /app

# Update npm to fix picomatch and sigstore vulnerabilities
RUN npm install --global npm@11.18.0

COPY package*.json ./

RUN npm ci --omit=dev \
    && npm cache clean --force

COPY src ./src

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

USER node

CMD ["npm", "start"]