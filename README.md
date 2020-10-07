# node-nestjs-structure

Node.js framework NestJS project structure

## Configuration

1. Create a `.env` file
    - Rename the [.env.sample](.env.sample) file to `.env` to fix it.
2. Edit env config
    - Edit the file in the [config](src/config) folder.
    - `default`, `development`, `production`, `test`

## Installation

```sh
# 1. node_modules
npm ci
# 2. When import entities from an existing database
npm run entity
```

If you use multiple databases, [modify them.](bin/entity.js#L45)

## Development

```sh
npm run start:dev
```

Run [http://localhost:3000](http://localhost:3000)

## Test

```sh
npm test # exclude e2e
npm run test:e2e
```

## Production

```sh
# define NODE_ENV and PORT
npm run build
# NODE_ENV=production PORT=8000 node dist/app
node dist/app
# OR
npm start
```

## Folders

```js
+-- bin // Custom tasks
+-- dist // Source build
+-- public // Static Files
+-- src
|   +-- config // Environment Configuration
|   +-- entity // TypeORM Entities generated by `typeorm-model-generator` module
|   +-- common // Global Nest Module
|   |   +-- controllers // Nest Controllers
|   |   +-- decorators // Nest Decorators
|   |   +-- dto // DTO (Data Transfer Object) Schema, Validation
|   |   +-- filters // Nest Filters
|   |   +-- guards // Nest Guards
|   |   +-- interceptors // Nest Interceptors
|   |   +-- interfaces // TypeScript Interfaces
|   |   +-- middleware // Nest Middleware
|   |   +-- pipes // Nest Pipes
|   |   +-- providers // Nest Providers
|   |   +-- * // models, repositories, services...
|   +-- shared // Shared Nest Modules
|   +-- * // Other Nest Modules, non-global, same as common structure above
+-- test // Jest testing
+-- typings // Modules or global type definitions
```

## Implements

- See [app](src/app.ts), [app.module](src/app.module.ts)
  - Database
  - Module Router
  - Static Files
  - Validation
- [Global Authenticated Guard](src/common/guards/authenticated.guard.ts)
- [Global Exception Filter](src/common/filters/exceptions.filter.ts)
- [Global Logging Middleware](src/common/middleware/logger.middleware.ts)
- [Session Login with Passport](src/base/providers/local.strategy.ts)
- [Custom Logger for Production](src/common/providers/custom-logger.service.ts)
- [Role-based Guard](src/common/guards/roles.guard.ts)
- [AWS SDK Example](src/aws)
- [GraphQL Structure Example](src/gql)
- Controller Routes
  - [Login](src/base/controllers/login.controller.ts)
  - [Sample](src/sample/controllers/sample.controller.ts) Parameter, [DTO](src/sample/dto/sample.dto.ts)
  - [CRUD API Sample](src/sample/controllers/crud.controller.ts)
- [Database Query](src/sample/providers/database.service.ts) Example
- [Unit Test](src/sample/controllers/crud.controller.spec.ts)
- [E2E Test](test/e2e/crud.spec.ts)

## Documentation

```sh
# APP, Compodoc
npm run doc #> http://localhost:8080
# API, Swagger - src/swagger.ts
npm run doc:api #> http://localhost:8000/api
```

### File Naming for Class

```ts
export class PascalCaseSuffix {} //= pascal-case.suffix.ts
// Except for suffix, PascalCase to hyphen-case
class FooBarNaming {} //= foo-bar.naming.ts
class FooController {} //= foo.controller.ts
class BarQueryDto {} //= bar-query.dto.ts
```

### Interface Naming

```ts
// https://stackoverflow.com/questions/541912
// https://stackoverflow.com/questions/2814805
interface User {}
interface CustomeUser extends User {}
interface ThirdCustomeUser extends CustomeUser {}
```

### Links

- [Nest Starter](https://github.com/CatsMiaow/nestjs-starter)
- [Nest Sample](https://github.com/nestjs/nest/tree/master/sample)
- [Awesome Nest](https://github.com/juliandavidmr/awesome-nestjs)
- [NestJS](https://docs.nestjs.com)
- [TypeORM](https://typeorm.io)
