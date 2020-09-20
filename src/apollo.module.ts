import { DynamicModule, Module } from '@nestjs/common';
import { ApolloService } from './apollo.service';
import * as apollo from '@zman2013/ts-apollo-client'

@Module({})
export class ApolloModule {

    static forRootAsync(meta: apollo.Meta, refreshIntervalMillis?: number): DynamicModule{
        return {
            module: ApolloModule,
            providers: [{
                provide: ApolloService,
                useFactory: async()=>{
                    return await ApolloService.init(meta, refreshIntervalMillis)
                }
            }],
            exports: [ApolloService]
        }
    }

}
