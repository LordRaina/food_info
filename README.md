## Description

Small API using the [NestJS](https://nestjs.com/) framework. This server allows the retrieval of food information based on their barcode through the [OpenFoodFact API](https://fr.openfoodfacts.org/data). 
The main functionnalities are:
- Registration of an user through a login/password combination
- Authentication of an user through the same login/password combination
- Retrieval of food product information linked to its barcode through a protected route

Since this is a demo application, the [SQLite](https://www.sqlite.org/index.html) database was used for its simplicity.

## Installation
### Database
First of all the `sqlite3` package needs to be installed in order to create the database.
Once the package is installed your system, run this:
```bash
$ mkdir /db
$ sqlite3 db/food_info.db ".read db.sql"
```
This will create a `db` folder containing the `sqlite` database created through the `db.sql`

### Application
The [NodeJS](https://nodejs.org/en/) environment and [npm](https://docs.npmjs.com/) registry need to be installed.
Go the `app` folder and simply run:
```bash
$ npm install
```
This will install all the necessary dependencies for the app.


## Running the app
To start the application, simply run: 
```bash
$ npm start
``` 
or for development purposes with the [Hot Reload mechanism](https://docs.nestjs.com/recipes/hot-reload):
```bash
$ npm run start:dev
```

The API will be listening on `localhost:3000`.
The available endpoints are:
- `POST /users` with a `{ "login": string, "password": string}` JSON body
- `POST /auth/login` with `{ "login": string, "password": string}` JSON body
- `GET /food-facts/{barcode}` where `{barcode}` is the barcode of the food product

## Docker
The application can also be run with [Docker](https://www.docker.com/). First you need to place yourself in the root directory and build the docker image with: 
```bash
$ docker build -t food-info 
```
Then you can start the docker container via:
```bash
$ docker run -dp 3000:3000 food-info
```
If you want the data to be persisted, first create a volume:
```bash
$ docker volume create food-info
```
and mount the volume with the container when starting it:
```bash
docker run -dp 3000:3000 --mount type=volume,src=food-info,target=/food_info/db food-info
```
This will mount the volume we just created with the previous command with the container's folder `/food_info/db`

## Test

```bash
# unit tests
$ npm run test
```

## Kubernetes
I've tried to use [Kubernetes](https://kubernetes.io/) for fun and re-learning purposes although this demo app won't 
be deployed in a large scale (also using SQLite by storing data on a file isn't the best nor the smartest choice for such scenario).

The `kubernetes.yaml` is a kubernetes config file that will handle the creation of one namespace (`food-info`) and three resources (a volume for the node, a pod and a service). In order to create the resources, run: 
```bash
$ kubectl apply -f kubernetes.yaml
```

There's a known bug with kubernetes and WSL2 with the `localhost`. In order to make it work on such system, we can manually forward the port by running:
```bash
# Get the name of the pod
$ kubectl -n food-info get pod
NAME                   READY   STATUS    RESTARTS   AGE
app-57f9bc5967-b2t6p   1/1     Running   0          2m41s

# port forwarding
$ kubectl -n food-info port-forward app-57f9bc5967-b2t6p 3000:3000
```

You will be able to access the API through `localhost:3000`