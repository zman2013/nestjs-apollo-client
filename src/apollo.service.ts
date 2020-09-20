import { Injectable, OnModuleDestroy } from '@nestjs/common';
import * as apollo from '@zman2013/ts-apollo-client'
import { clearTimeout, setInterval } from 'timers';

@Injectable()
export class ApolloService implements OnModuleDestroy{
    
    private _configs: any
    private _timer: NodeJS.Timeout

    static async init(meta: apollo.Meta, refreshIntervalMillis?: number){
        const service = new ApolloService()
        console.log('service meta:', meta)
        service._configs = await apollo.getConfig(meta)

        // refresh
        if( refreshIntervalMillis ){
            service._timer = setInterval(()=>{
                apollo.getConfig(meta)
                    .then(config => {
                        console.debug("refreshed apollo config")
                        service._configs = {...service._configs, ...config}
                    }).catch(e => {
                        console.warn("refreshing apollo config failed", e)
                    })
            }, refreshIntervalMillis)
        }

        return service
    }

    get(key: string): any{
        return this._configs[key]
    }

    stopRefresh(){
        console.log("stop apollo refreshing")
        clearTimeout(this._timer)
    }

    onModuleDestroy() {
        this.stopRefresh()
    }
}