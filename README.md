# Code challenge | Skore-UOL Edtech

## Description
This application is part of Skore-UOL Edtech's code challenge - [check the requirements here](https://github.com/skore-io/challenge/blob/main/backend.md).\
Manage and visualize content. There is a simple access level implemented for - **Admin** role and **User** role.\
**Administrator** role can add, update and delete a content resource.\
**Users** can visualize content resources.

## Features available
Find a breaf description of features and curl requests to execute it on terminal or import in your favorite client
**Administrators features:**
- [x] Add a content resource
```
curl --location --request POST 'http://localhost:3333/graphql' \
--header 'role: ADMIN' \
--header 'Content-Type: application/json' \
--data-raw '{"query":"mutation Add($addContentResource: ContentResourceInput!) {\n    add(params: $addContentResource) {\n        id\n        published\n        name\n        description\n        type\n        created_at\n        updated_at\n    }\n}","variables":{"addContentResource":{"name":"any_name_A","published":1,"description":"any_description_B","type":"string"}}}'
```
- [  ] Update a content resource
- [  ] Delete a code resource
- [  ] Chek the unique views per resource

**Users features:**
- [  ] Visualize content resources

## Built with
- Typescript
- NodeJS
- Jest

## Setup project

1. Rename env-example to .env

2. Run the api with Docker
```
  docker-compose up
```

### Run unit tests
```
  npm run test
```

### Run integration tests
```
  npm run test:integration
```

### Run unit/integration tests with coverage
```
  npm run test:coverage
```

## Collections and utilities

## Software design/architecture