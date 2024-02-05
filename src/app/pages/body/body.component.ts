import { Component, Input } from '@angular/core';
import { Kontakt } from '../../models/kontakt';
import { ContactServiceService } from '../../service/contact-service.service';
import { CrudService } from '../../service/crud.service';
import { AuthenticateUserService } from 'src/app/service/authenticate-user.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss'],
})
export class BodyComponent {
  kontaktet: any = this.crudService.getAllContacts();

  constructor(private contactService: ContactServiceService, private crudService: CrudService,private authenticate : AuthenticateUserService) {
    // this.kontaktet = this.crudService.getAllContacts();
    // console.log(this.kontaktet);
  }
  @Input()
  search!: string
  //   kontakt:Kontakt[]=[
  //     {"id": "c1", "mobilenumber": "1234567890", "name": "John Doe", "isActive": true, "isFavorite": false, "isDeleted": false, "contactDateCreated": "2023-07-12"},
  //  {"id": "c2", "mobilenumber": "9876543210", "name": "Jane Smith", "isActive": false, "isFavorite": true, "isDeleted": false, "contactDateCreated": "2023-05-24"},
  //  {"id": "c3", "mobilenumber": "5551112233", "name": "Alice Johnson", "isActive": true, "isFavorite": false, "isDeleted": true, "contactDateCreated": "2023-10-08"},
  //  {"id": "c4", "mobilenumber": "8887776666", "name": "Bob Williams", "isActive": false, "isFavorite": true, "isDeleted": false, "contactDateCreated": "2023-02-17"},
  //  {"id": "c5", "mobilenumber": "3332221111", "name": "Eve Davis", "isActive": true, "isFavorite": false, "isDeleted": true, "contactDateCreated": "2023-11-30"},
  //  {"id": "c6", "mobilenumber": "4445556666", "name": "Charlie Brown", "isActive": false, "isFavorite": true, "isDeleted": false, "contactDateCreated": "2023-08-21"},
  //  {"id": "c7", "mobilenumber": "9998887777", "name": "Grace Taylor", "isActive": true, "isFavorite": false, "isDeleted": true, "contactDateCreated": "2023-04-06"},
  //  {"id": "c8", "mobilenumber": "7776665555", "name": "Daniel White", "isActive": false, "isFavorite": true, "isDeleted": false, "contactDateCreated": "2023-09-14"},
  //  {"id": "c9", "mobilenumber": "6665554444", "name": "Sophia Miller", "isActive": true, "isFavorite": false, "isDeleted": true, "contactDateCreated": "2023-01-28"},
  //  {"id": "c10", "mobilenumber": "2223334444", "name": "Liam Anderson", "isActive": false, "isFavorite": true, "isDeleted": false, "contactDateCreated": "2023-06-10"},
  //  {"id": "c11", "mobilenumber": "1112223333", "name": "Olivia Parker", "isActive": true, "isFavorite": true, "isDeleted": false, "contactDateCreated": "2023-03-19"},
  //  {"id": "c12", "mobilenumber": "5554443333", "name": "Matthew Turner", "isActive": false, "isFavorite": false, "isDeleted": true, "contactDateCreated": "2023-12-02"},
  //  {"id": "c13", "mobilenumber": "9990001111", "name": "Emma Harris", "isActive": true, "isFavorite": true, "isDeleted": false, "contactDateCreated": "2023-07-28"},
  //  {"id": "c14", "mobilenumber": "4448887777", "name": "James Carter", "isActive": false, "isFavorite": false, "isDeleted": true, "contactDateCreated": "2023-02-05"},
  //  {"id": "c15", "mobilenumber": "7773336666", "name": "Ava Rodriguez", "isActive": true, "isFavorite": true, "isDeleted": false, "contactDateCreated": "2023-10-19"}
  //   ]

  isAdmin(){
   if(this.authenticate.getRole() === 'admin'){
    return  true;
   }else{
     return false;
   }
  }

}





