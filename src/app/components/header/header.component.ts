import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticateUserService } from 'src/app/service/authenticate-user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  search!: string;
  constructor(private authenticate : AuthenticateUserService,private router : Router){}

  @Output() searchString = new EventEmitter();

  stringSearch() {

    this.searchString.emit(this.search);

  }

  logOut(){
    this.authenticate.logout();
    this.router.navigate([""]);
  }

}
