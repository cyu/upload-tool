FROM transloadit/companion:72b52013e163f3c96db0d693401c598932b33b9c

COPY ./0001-Support-running-standalone-with-custom-options.patch .
COPY src src

RUN patch -p4 < 0001-Support-running-standalone-with-custom-options.patch

CMD ["node", "server.js"]