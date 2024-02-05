import { Component } from '@angular/core';
import { AuthenticateUserService } from 'src/app/service/authenticate-user.service';

@Component({
  selector: 'app-body-holder',
  templateUrl: './body-holder.component.html',
  styleUrls: ['./body-holder.component.scss']
})
export class BodyHolderComponent {
  search!: string;

  constructor(private authenticate: AuthenticateUserService) { }

  receiveInformation(event: string) {
    this.search = event;
    console.log(this.search)
  }

}

