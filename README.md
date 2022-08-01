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
- [x] View a resource by id
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

This application uses clean architecture approach.
Follow the diagram below and the teardown section for better understanding.
Altough the majority of the system entities are represented in the diagram below the arrows only show a single use case of the system, the other use cases follow the same flow. Folder names are not that important, what matters is the instance flow of the application.

![Application architecute diagram](/arch-skore-api.png)

- **Domain**
  - Inner layer
  - Doesn't depends on any other layer
  - Defines the system entities:
    - Content Resource
  - Defines the system use cases:
    - Add-content-resource-service
    - Load-content-resource-service
    - Deactivate-content-resource-service
    - View-content-resource-service

- **Data**
  - Depends on domain layer
  - In this layer use cases are called **application services**
  - Add content resource service
    - Content resource repository
  - Deactivate content resource service
    - Content resource repositor
  - Load content resource service
    - Content resource repositor

- **Infra**
  - Provides tools (such as package implementations) for data and presentation layer
  - Implements external libraries:
    - database
      - Postgres Repository
    - graphql
      - Apollo server
    - queue
      - rabbitmq
    - logger
      - Pinno

- **Presentation**
  - Depends on data layer
  - Implements abstract class Controller
    - Controller has perform method, it will be implemented by specific controllers
  - Implements add content resource Controller
  - Implements deactivate content resource Controller
  - Implements load content resource Controller

- **Main**
  - Depends on presentation, infra and data layer
  - This layer will bootstrap all necessary instances to fulfill dependency injection and return a webserver
  - Graphql resolvers uses factory methods to bootstrap controllers
  - Apollo server starts instance is starts here

### Patterns

Some patterns I kept in mind while coding this app

- Factory
  - Main folder - It creates controllers with their dependencies, like database repository instance.

- Decorator
  - Main layer - It enable controllers to log server error by extending the controller default behavior.

- Builder
  - Presentation folder - It creates the validator steps.

- Adapter
  - Infra folder - Allow Controllers to interact with Apollo server, it receives a Controller via param and args to use it together.

