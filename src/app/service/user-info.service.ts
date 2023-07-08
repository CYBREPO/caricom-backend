import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { EncryptionService } from './encryption.service';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {
  private subject = new Subject<any>();
  constructor(private encryptionService: EncryptionService) { }

  setUser(userObj: any) {
    if (userObj != null) {
      localStorage.setItem('currentUser', this.encryptionService.encrypt(JSON.stringify(userObj)));
    }
    this.subject.next({ text: userObj });
  }

  getLoggedInUser(): any {
    var user = localStorage.getItem('currentUser');
    if (user != undefined && user != 'undefined' && user != null && user != 'null') {
      var decryptUserObj = this.encryptionService.decrypt(user);
      return JSON.parse(decryptUserObj);
    }
    return null;
  }

}
