# Define what image to build from
FROM node:latest

# Create app directory
WORKDIR /server

# Bundle app source
COPY . .

# Install the app dependencies
RUN npm install

# Defind what port app binds to
EXPOSE 3000

# Defind the runtime
CMD [ "node", "index.js" ]