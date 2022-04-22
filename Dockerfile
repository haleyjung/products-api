FROM node:16.13.1
RUN mkdir -p /opt/app
WORKDIR /opt/app
RUN adduser -S app
COPY server/ .
RUN npm install
RUN chown -R app /opt/app
USER app
EXPOSE 3000
CMD [ "npm", "run", "pm2" ]