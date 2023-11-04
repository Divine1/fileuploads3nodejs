FROM node:18.18-alpine3.18
WORKDIR /usr/src/app
COPY . .
EXPOSE 3001
EXPOSE 3000
RUN npm i
RUN cd webClient/haulr-web-client && npm i && cd .. & cd ..
#CMD [ "node", "swagger.js" ]
CMD ["npm" , "run","dev"]
