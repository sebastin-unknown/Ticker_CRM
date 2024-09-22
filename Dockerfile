FROM node           

WORKDIR /myapp

COPY . .

RUN npm i install

EXPOSE 3020

CMD ["npm", "start"]