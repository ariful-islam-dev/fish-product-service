# Product/Fish Service

## Third Party Libraries

- [x] Express
- [x] Cors
- [x] dotenv = Environment
- [x] morgan = View Log
- [x] zod = Validation

## Third Party Typescript Libraries (For Dev Dependencies)

- [x] typescript
- [ ] tsc
- [ ] ts-node-dev
- [ ] tsc-alias
- [ ] tsconfig-paths
- [ ] @types/express
- [ ] @types/node
- [ ] @types/corse
- [ ] prisma
- [ ] @prisma/client

```Run this Command
    npx prisma init --datasource-provider postgresql
```

##### Complete the model and schemas then run command with customize .env database url

```
yarn migrate:dev
```

## Endpoints

- [x] POST /fishes - Create a new product
- [x] PUT /fishes - Get product collection
- [x] GET /fishes/:id - Get product Details
- [x] GET /fishes - Get all product
- [x] DELETE /fishes/:id - Delete Product
