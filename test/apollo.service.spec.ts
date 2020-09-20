import { Test, TestingModule } from '@nestjs/testing';
import { Meta } from "@zman2013/ts-apollo-client"
import { setTimeout } from 'timers';
import { ApolloModule } from "../src/apollo.module"
import { ApolloService } from '../src/apollo.service'

describe('ApolloService', () => {
  let service: ApolloService;
  let module: TestingModule

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [ApolloModule.forRootAsync(new Meta("",""))]
    }).compile();

    service = module.get<ApolloService>(ApolloService);
  });

  afterEach(async () => {
    await module.close()
  })

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('getConfig', () => {
    const value = service.get("key1")
    expect(value).toBe("value1")
  })
})

describe('ApolloService refresh', () => {

  let service: ApolloService;
  let module: TestingModule

  beforeEach(async () => {
    const meta: Meta = new Meta("http://refresh", "")
    console.log("what's the meta", meta)

    module = await Test.createTestingModule({
      imports: [ApolloModule.forRootAsync(meta, 100)]
    }).compile();

    service = module.get<ApolloService>(ApolloService);
  });

  afterEach(async () => {
    await module.close()
  })

  it('refresh and failed', done => {
    setTimeout(()=>{
      const value = service.get("i")
      console.log('value:', value)
      expect(value).toBe(5)

      done()
  }, 650)
  })

});
