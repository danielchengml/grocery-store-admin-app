# Grocery Store Admin App

## Frontend

$ref: 

cmd:
```
cd frontend/
docker build -t grocery_store_fe -f Dockerfile.nextjs .
docker run --publish 3000:3000 grocery_store_fe
```

## Backend

cmd:
```
cd backend/
docker build -t grocery_store_be -f Dockerfile.nodejs .
docker run --name grocery_store_api -d -p 4000:4000 grocery_store_be
docker start grocery_store_api
docker stop grocery_store_api
```

## Connecting to Postgres DB
```
psql --user grocery_store_admin --password grocery-store-123 -h localhost
```

## 