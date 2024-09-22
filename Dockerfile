FROM node           

WORKDIR /myapp

COPY . .

RUN npm install

EXPOSE 3020

CMD ["npm", "start"]