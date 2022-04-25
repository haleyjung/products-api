# Define what image to build from
FROM node:latest

# Create app directory
WORKDIR /server

# Bundle app source
COPY . .

# Install the app dependencies
RUN npm install

# Defind what port app binds to
ENV PORT 3030
EXPOSE 3030

# Defind the runtime
# CMD [ "node", "index.js" ]
CMD [ "npm", "start" ]