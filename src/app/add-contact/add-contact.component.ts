import { Component } from '@angular/core';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss']
})
export class AddContactComponent {
  model: any = {};

  onSubmit(): void {
  
    alert(`New Contact:
    \nName: ${this.model.name}\nMobile Number: ${this.model.mobilenumber}\nIsActive: ${this.model.isActive}\nIsFavorite: ${this.model.isFavorite}\nIsDeleted: ${this.model.isDeleted}\nContact Date Created: ${this.model.contactDateCreated}`);
    
  }
}
