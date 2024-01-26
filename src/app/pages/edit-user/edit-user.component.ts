import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from '../../services/contact-service.service';
import { User } from '../../models/user.model';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  user?: User;
  userForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private contactService: ContactService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    const userId = Number(this.route.snapshot.paramMap.get('id'));
    this.user = this.contactService.getUserById(userId);
    console.log(this.user);
    this.initForm();
  }

  initForm() {
    this.userForm = this.fb.group({
      mobilenumber: [{ value: this.user?.mobilenumber, disabled: false }],
      name: [{ value: this.user?.name, disabled: false }],
      username: [{ value: this.user?.username, disabled: false }],
      email: [{ value: this.user?.email, disabled: false }],
      isActive: [this.user?.isActive],
      isFavorite: [this.user?.isFavorite],
      isDeleted: [this.user?.isDeleted],
      contactDateCreated: [this.user?.contactDateCreated ?? new Date()],
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
      const isEmailUnique = this.contactService.isEmailUnique(
        this.userForm.value.email,
        this.user?.id
      );
      const isUsernameUnique = this.contactService.isUsernameUnique(
        this.userForm.value.username,
        this.user?.id
      );
  
      if (!isEmailUnique) {
        this.userForm.get('email')?.setErrors({ notUnique: true });
        window.alert('This email is already taken.');
        return;
      }
  
      if (!isUsernameUnique) {
        this.userForm.get('username')?.setErrors({ notUnique: true });
        window.alert('This username is already taken.');
        return;
      }
  
      const updatedUser = this.getUpdatedUser();
      this.contactService.updateUser(updatedUser);
      this.goBack();
      console.log(this.user);
    }
  }
  

}

