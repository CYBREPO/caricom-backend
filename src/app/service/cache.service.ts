// import { Inject, Injectable } from '@angular/core';
// import { ICacheContent } from '../interface/cacheInterface';
// import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';

// @Injectable({
//   providedIn: 'root'
// })
// export class CacheService {
//   constructor(@Inject(SESSION_STORAGE) private storage: StorageService ) {
//   }

//   get(key: string): ICacheContent | null {
//     // return null;
//     return this.storage.get(key);
//   }

//   set(key: string, value: ICacheContent): void {
//     this.storage.set(key, value)
//   }



//   delete(key: string): void {
//     this.storage.remove(key);
//   }

//   deleteAll(): void {
//     this.storage.clear();
//   }

// }
