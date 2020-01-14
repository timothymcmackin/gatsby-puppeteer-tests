FROM buildkite/puppeteer:5.2.1

WORKDIR /gatsby-puppeteer-tests

EXPOSE 8000

COPY . .

# To work around https://github.com/bahmutov/start-server-and-test/issues/132
RUN apt-get update && apt-get -y install procps

RUN yarn install

RUN yarn test

ENTRYPOINT ["yarn", "develop", "--host=0.0.0.0"]
