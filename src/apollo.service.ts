import { Injectable, OnModuleDestroy } from '@nestjs/common';
import * as apollo from '@zman2013/ts-apollo-client';
import { EventEmitter } from 'events';

export interface ApolloService {
  on(event: 'refresh', listener: () => void): this;
  on(event: 'error', listener: (error: Error) => void): this;

  once(event: 'refresh', listener: () => void): this;
  once(event: 'error', listener: (error: Error) => void): this;
}

@Injectable()
export class ApolloService extends EventEmitter implements OnModuleDestroy {
  private _configs: any;
  private _timer: NodeJS.Timeout;

  private static readonly SERVICE = new ApolloService();

  static async init(meta: apollo.Meta, refreshIntervalMillis?: number) {
    console.log('service meta:', meta);
    ApolloService.SERVICE._configs = await apollo.getConfig(meta);

    // refresh
    if (refreshIntervalMillis) {
      clearInterval(ApolloService.SERVICE._timer);
      ApolloService.SERVICE._timer = setInterval(() => {
        apollo
          .getConfig(meta)
          .then(config => {
            ApolloService.SERVICE.emit('refresh');
            ApolloService.SERVICE._configs = {
              ...ApolloService.SERVICE._configs,
              ...config,
            };
          })
          .catch(e => {
            ApolloService.SERVICE.emit('error', e);
          });
      }, refreshIntervalMillis);
    }

    return ApolloService.SERVICE;
  }

  get(key: string): any {
    return this._configs[key];
  }

  stopRefresh() {
    console.log('stop apollo refreshing');
    clearInterval(this._timer);
  }

  onModuleDestroy() {
    this.stopRefresh();
  }
}
