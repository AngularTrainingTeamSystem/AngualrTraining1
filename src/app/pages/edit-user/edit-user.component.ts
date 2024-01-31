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

  // ngOnInit(): void {
  //   const userId = Number(this.route.snapshot.paramMap.get('id'));
  //   this.user = this.contactService.getUserById(userId);
  //   console.log(this.user);
  //   this.initForm();
  // }


  ngOnInit(): void {
    const userId = Number(this.route.snapshot.paramMap.get('id'));
    this.contactService.getUserById(userId).subscribe(
      (user) => {
        this.user = user;
        console.log(this.user);
        this.initForm();
      },
      (error) => {
        console.error('Error fetching user:', error);
      }
    );
  }
  

  initForm() {
    this.userForm = this.fb.group({
      mobilenumber: [this.user?.mobilenumber],
      name: [this.user?.name],
      username: [this.user?.username],
      email: [this.user?.email],
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
    }
  }
  

}

