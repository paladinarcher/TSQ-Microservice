FROM node:8

WORKDIR /usr/src/app/
ADD tsq.tar.gz .
RUN npm install
ENTRYPOINT [ "npm", "start" ]
