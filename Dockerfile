
FROM node:18.20.4-alpine as base

ARG PORT=3000

EXPOSE ${PORT}

WORKDIR /app

COPY package*.json ./

FROM base as dependencies

COPY package-lock.json /app/

RUN echo "Installing dependencies" \
    apk --update --no-cache add --virtual build-dependencies make g++ && \
    npm install --silent --production

FROM dependencies as develop

ENV NODE_ENV=development

RUN npm install --silent

COPY ./ /app

RUN npm run build

FROM base as release

ENV NODE_ENV=production

COPY --from=dependencies /app/node_modules /app/node_modules
COPY --from=develop /app/build /app/build

RUN adduser -D -h /app -u 5000 user && \
    chown -R user:user /app

USER user

ENTRYPOINT ["npm", "run"]

CMD ["start"]
