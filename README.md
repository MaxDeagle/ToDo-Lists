# ToDo

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.6.5.

## Requirements

- MongoDB
- Node.js

## Deploy

1. type "npm install" in root folder.
2. type "npm install" in "server" folder.
3. create user in mongo by typing:
	-mongo
	-use todo
	-db.createUser({user:"admin",pwd:"admin",roles:["readWrite"]})
4. Start mongo by running "mongod". Node.js server refers to "mongodb://admin:admin@localhost:27017/todo".
5. Start node.js server: type "npm run dev" in "server" folder.
6. Start application by typing "ng serve --open" in root folder.

