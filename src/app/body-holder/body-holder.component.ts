import { Component } from '@angular/core';

@Component({
  selector: 'app-body-holder',
  templateUrl: './body-holder.component.html',
  styleUrls: ['./body-holder.component.scss']
})
export class BodyHolderComponent {
  search!:string;

  merrTeDhenat(event:string){

     this.search=event;
    console.log(this.search)
  }
}
