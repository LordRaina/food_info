FROM node:19-alpine
WORKDIR /food_info
COPY db.sql .
RUN mkdir /food_info/db \
    && apk --update-cache add sqlite \
    && sqlite3 db/food_info.db ".read db.sql"
WORKDIR /food_info/app
COPY app/ .
RUN npm install
EXPOSE 3000

CMD ["npm", "start"]
