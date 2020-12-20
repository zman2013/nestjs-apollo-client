import { Injectable, OnModuleDestroy } from '@nestjs/common';
import * as apollo from '@zman2013/ts-apollo-client'
import {EventEmitter} from 'events';
import { clearTimeout, setInterval } from 'timers';

export interface ApolloService{
  on(event: 'refresh', listener: ()=>void): this
  on(event: 'error', listener: (error: Error)=>void): this

  once(event: 'refresh', listener: ()=>void): this
  once(event: 'error', listener: (error: Error)=>void): this
}

@Injectable()
export class ApolloService extends EventEmitter implements OnModuleDestroy{
    
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
                        service.emit('refresh')
                        service._configs = {...service._configs, ...config}
                    }).catch(e => {
                      service.emit('error', e)
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