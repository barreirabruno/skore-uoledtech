# Code challenge | Skore-UOL Edtech

## Description
This application is part of Skore-UOL Edtech's code challenge - [check the requirements here](https://github.com/skore-io/challenge/blob/main/backend.md).\
Manage and visualize content. There is a simple access level implemented for - **Admin** role and **User** role.\
**Administrator** role can add, update and delete a content resource.\
**Users** can visualize content resources.

## Features available
**Administrators features:**
- [x] Add a content resource
- [x] Update a content resource
- [x] Delete a content resource
- [ ] Check the unique views per resource

**Users features:**
- [  ] Visualize content resources

## Built with
- Typescript
- NodeJS
- Jest
- GraphQL
- GraphQL-Tools
- Express
- Apollo-express
- TypeORM
- Postgres
- RabbitMQ

## Setup project

1. Rename env-example to .env

2. Run the api with Docker
```
  docker-compose up
```
### Tests
Install node dependencies
```
  npm install
```

### Run unit tests

```
  npm run test
```

### Run unit tests with coverage
```
  npm run test:coverage
```
## Collections and utilities
Use the curls below to query the server
**add a content resource**
```
curl --location --request POST 'http://localhost:3333/graphql' \
--header 'role: ADMIN' \
--header 'Content-Type: application/json' \
--data-raw '{"query":"mutation Add($addContentResource: ContentResourceInput!) {\n    add(params: $addContentResource) {\n        id\n        published\n        name\n        description\n        type\n        created_at\n        updated_at\n    }\n}","variables":{"addContentResource":{"name":"any_readme_name","description":"any_readme_description","type":"pdf","published":1}}}'
```

**view a content resource**
```
curl --location --request POST 'http://localhost:3333/graphql' \
--header 'Content-Type: application/json' \
--data-raw '{"query":"query ViewContentResource($viewContentResource: ViewContentResourceInput!) {\n    viewcontentresource(params: $viewContentResource) {\n        id\n        published\n        name\n        description\n        type\n        created_at\n        updated_at\n    }\n}","variables":{"viewContentResource":{"id":"1"}}}'
```

**update a content resource**
```
curl --location --request POST 'http://localhost:3333/graphql' \
--header 'role: ADMIN' \
--header 'Content-Type: application/json' \
--data-raw '{"query":"mutation Update($updateContentResource: ContentResourceUpdateInput!) {\n    update(params: $updateContentResource) {\n        id\n        published\n        name\n        description\n        type\n        created_at\n        updated_at\n    }\n}","variables":{"updateContentResource":{"name":"update_any_readme_name","description":"update_any_readme_description","type":"pdf"}}}'
```

**delete a content resource**
```
curl --location --request POST 'http://localhost:3333/graphql' \
--header 'role: ADMIN' \
--header 'Content-Type: application/json' \
--data-raw '{"query":"mutation Deactivate($deactivateContentResource: ContentResourceDeactivateInput!) {\n    deactivate(params: $deactivateContentResource) {\n        id\n        message\n    }\n}","variables":{"deactivateContentResource":{"id":"1"}}}'
```

## Software design/architecture