From node:14.18.0

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
Copy package*.json ./

RUN npm install

# Bundle app source
Copy . .

RUN npm run build

EXPOSE 8080
CMD [ "node", "dist/main" ]