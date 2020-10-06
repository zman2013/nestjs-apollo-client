# nestjs-apollo-client

[![Build Status](https://github.com/zman2013/nestjs-apollo-client/workflows/Build%20and%20Release/badge.svg)](https://github.com/zman2013/nestjs-apollo-client/workflows/Build%20and%20Release/badge.svg)
[![Coverage Status](https://coveralls.io/repos/github/zman2013/nestjs-apollo-client/badge.svg?branch=master)](https://coveralls.io/github/zman2013/nestjs-apollo-client?branch=master)
[![npm](https://img.shields.io/npm/v/@zman2013/nestjs-apollo-client.svg)](https://www.npmjs.com/package/@zman2013/nestjs-apollo-client/)

> A nestjs module implementation of a client for Apollo([https://github.com/ctripcorp/apollo](https://github.com/ctripcorp/apollo)), the reliable configuration management system.

## Usage

```bash
npm install nestjs-apollo-client
```

### example1
```typescript
// app.module.ts
// refresh config every 10_000 milliseconds
@Module({
  imports: [ApolloModule.forRootAsync(new Meta("http://xxx", "appId"), 10_000)]
})
export class AppModule {}

// app.controller.ts
@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
      private readonly _apolloService: ApolloService
    ) {}
  ...
}
```

## Github
[https://github.com/zman2013/nestjs-apollo-client](https://github.com/zman2013/nestjs-apollo-client)