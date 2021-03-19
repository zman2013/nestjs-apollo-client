import { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import { Meta } from '@zman2013/ts-apollo-client';
import { ApolloModule } from '../src/apollo.module';
import { ApolloService } from '../src/apollo.service';

describe('Apollo Module', () => {
  it('should start module', async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ApolloModule.forRootAsync(new Meta('', ''))],
    }).compile();

    const app = await module.init();
    expect(app.get(ApolloService)).toBeDefined();
  });
});
