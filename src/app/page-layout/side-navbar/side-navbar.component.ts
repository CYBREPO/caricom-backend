import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
// import { IUser } from 'src/app/interface/userInterface';
import { UserInfoService } from 'src/app/service/user-info.service';

@Component({
  selector: 'app-side-navbar',
  templateUrl: './side-navbar.component.html',
  styleUrls: ['./side-navbar.component.scss']
})
export class SideNavbarComponent {
  constructor(private userInforService: UserInfoService) {

  }

  ngOnInit() {

  }
  toggleDropdown(){
    
  }

}
