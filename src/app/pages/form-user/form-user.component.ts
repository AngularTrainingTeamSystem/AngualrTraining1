import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from '../../services/contact-service.service';
import { User } from '../../models/user.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.scss']
})
export class FormUserComponent implements OnInit {
  user?: User;
  userForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private contactService: ContactService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initForm(); 
    this.setUserFormValues();
  }
  
  setUserFormValues(): void {
    const userIdParam = this.route.snapshot.paramMap.get('id');
    if (userIdParam) {
      const userId = Number(userIdParam);
      this.contactService.getUserById(userId).subscribe(
        (user) => {
          this.user = user;
          console.log(this.user);
          this.updateUserFormValues(); 
        },
        (error) => {
          console.error('Error fetching user:', error);
        }
      );
    }
  }
  
  updateUserFormValues(): void {
    if (this.user) {
      this.userForm.setValue({
        mobilenumber: this.user.mobilenumber,
        name: this.user.name,
        username: this.user.username,
        email: this.user.email,
        isActive: this.user.isActive,
        isFavorite: this.user.isFavorite,
        isDeleted: this.user.isDeleted,
        contactDateCreated: this.user.contactDateCreated ?? new Date(),
      });
    }
  }
  
  initForm(): void {
    const currentUserId = this.user?.id; 
    this.userForm = this.fb.group({
      mobilenumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      name: ['', Validators.required],
      username: ['', [Validators.required], [this.contactService.usernameAsyncValidator(currentUserId)]],
      email: ['', [Validators.required, Validators.email], [this.contactService.emailAsyncValidator(currentUserId)]],
      isActive: [false],
      isFavorite: [false],
      isDeleted: [false],
      contactDateCreated: [new Date().toDateString()],
    });
  }

  goBack(): void {
    this.router.navigate(['/users']);
  }

  getUpdatedUser(): User {
    const updatedUser: User = {
      id: this.user?.id as number,
      mobilenumber: this.userForm.value.mobilenumber,
      name: this.userForm.value.name,
      isActive: this.userForm.value.isActive,
      isFavorite: this.userForm.value.isFavorite,
      isDeleted: this.userForm.value.isDeleted,
      contactDateCreated: this.userForm.value.contactDateCreated,
      email: this.userForm.value.email,
      username: this.userForm.value.username,
    };
    return updatedUser;
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      if (this.user && this.user.id) {
        const updatedUser = this.getUpdatedUser();
        this.contactService.updateUser(updatedUser).subscribe(
          () => {
            console.log('User updated successfully'); 
            this.goBack();
          },
          (error) => {
            console.error('Error updating user in component:', error);
          }
        );
      } else {
        this.onSubmitForm();
      }
    }
  }
  
  onSubmitForm() {
    if (this.userForm.valid) {
      const newContact: User = this.userForm.value;
      newContact.id = Number(this.userForm.value['contactId']);
      if (!this.contactService.isEmailUnique(newContact.email, newContact.id) || !this.contactService.isUsernameUnique(newContact.username, newContact.id)) {
      } else {
        this.contactService.addUser(newContact);
        this.router.navigate(['/users']);
        console.log(this.contactService);
      }
    }
  }
  
  resetForm(): void {
    this.userForm.reset();
  } 

}
