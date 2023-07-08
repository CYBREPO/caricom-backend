import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
// import { IUser } from 'src/app/interface/userInterface';
import { UserInfoService } from 'src/app/service/user-info.service';
@Component({
  selector: 'app-top-navbar',
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.component.scss']
})
export class TopNavbarComponent {

  // user: IUser;

  constructor(private userInfoService: UserInfoService, private router: Router,
    private dialog: MatDialog) { }

  ngOnInit() {
    // this.user = this.userInfoService.getLoggedInUser();
  }

  openProfile(){
    // const dialogRef = this.dialog.open(EditProfileComponent,{
    //   height: "80%",
    //   width: "80%",
    //   data: this.user
    // });

    // dialogRef.afterClosed();
  }

  changePassword(){
    // const dialogRef = this.dialog.open(ChangePasswordComponent,{
    //   height: "80%",
    //   width: "80%",
    // });

    // dialogRef.afterClosed();
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.router.navigate(['account/login']);
  }
}
