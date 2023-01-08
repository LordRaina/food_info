FROM node:19-alpine
WORKDIR /innov_order
COPY db.sql .
RUN mkdir /innov_order/db \
    && apk --update-cache add sqlite \
    && sqlite3 db/innov_db.db ".read db.sql"
WORKDIR /innov_order/app
COPY app/ .
RUN npm install
EXPOSE 3000

CMD ["npm", "start"]
# CMD [ "sh" ]