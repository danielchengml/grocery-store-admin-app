# Grocery Store Admin App

[This app is a WIP. Please refer to below for things that work / don't work]

### Working features:
* all server apis
    * GET_PRODUCT
    * LIST_PRODUCTS
    * CREATE_PRODUCT
    * EDIT_PRODUCT
    * DELETE_PRODUCT
    * UPLOAD_PHOTO
* frontend 
    * display products
    * display single product
    * create product (no image link)

### Not working / WIP:
* frontend elements 
    * upload product image
    * update product
    * delete product
    * improving UI flow
* redis caching get requests and invalidating cache when update / deletion happens

## Frontend

Dockerized Next.js application with the ability to talk to the server/ backend

    $ref: 

    cmd:
    ```
    cd frontend/
    docker build -t grocery_store_fe -f Dockerfile.nextjs .
    docker run --publish 3000:3000 grocery_store_fe
    ```

## Backend

Consists of the following (dockerized) applications:
* node/express server
    - has the following endpoints:
        1. list products (`GET http://localhost:4000/api/v1/products`)
        2. get product by Id (`GET http://localhost:4000/api/v1/product/{id}`)
        3. add product (`POST http://localhost:4000/api/v1/product`)
            ```
            body: 
                {
                    "name" : "product y22",
                    "description" : "test desc",
                    "image_url": "https://www.test.com",
                    "price" : 15.00
                }
            ```
        4. update product (`PUT http://localhost:4000/api/v1/product/{id}`)
        5. delete product (`DELETE http://localhost:4000/api/v1/product/{id}`)
* postgres SQL (dockerized instance)
* minio (dockerized instance)
* redis (dockerized instance) - not used with server yet

## How to setup Dev Environment

1. Fork / Clone the repository
1. Navigate into the folder
    ```
    $ cd grocery-store-admin-app
    ```
1. Create an `.env` file in the `/server` folder (by copying .env.template)
    ```
    $ cd server/
    $ cp .env.template .env
    $ (update values in .env file) - for minio accessKeys, use the ui after app is running
    ```
1. Navigate to root directory and start applications using docker compose
    ```
    cd .. 
    $ docker-compose -f docker-compose-dev.yml up --build
    ```
1. The applications should run successfully with 5 products created. They should look like that when running `docker ps`
    ```
    CONTAINER ID   IMAGE                            COMMAND                  CREATED              STATUS              PORTS                              NAMES
036e020b8e07   postgres:10.5                    "docker-entrypoint.s…"   About a minute ago   Up About a minute   0.0.0.0:5432->5432/tcp             grocery-store-db
eb6eba1985aa   grocery-store-admin-app-client   "docker-entrypoint.s…"   About a minute ago   Up About a minute   0.0.0.0:3000->3000/tcp             grocery-store-fe
266bbc86455d   grocery-store-admin-app-server   "docker-entrypoint.s…"   About a minute ago   Up About a minute   0.0.0.0:4000->4000/tcp             grocery-store-server
efd662309fee   bitnami/minio:2022               "/opt/bitnami/script…"   About a minute ago   Up About a minute   0.0.0.0:9000-9001->9000-9001/tcp   grocery-store-bucket
d757e6f663da   redis:latest                     "docker-entrypoint.s…"   About a minute ago   Up About a minute   0.0.0.0:6379->6379/tcp             grocery-store-cache
    ```