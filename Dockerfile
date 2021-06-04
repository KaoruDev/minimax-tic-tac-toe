FROM node:16.2-alpine

COPY tic_tac_toe ./

WORKDIR tic_tac_toe

RUN npm install

CMD ["npm", "start"]
