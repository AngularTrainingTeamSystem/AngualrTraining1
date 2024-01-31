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
    const userIdParam = this.route.snapshot.paramMap.get('id');
    if (userIdParam) {
      const userId = Number(userIdParam);
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
    } else {
      this.user = { 
        id: 0, 
        name: '', 
        username: '', 
        email: '', 
        mobilenumber: '', 
        isActive: false, 
        isFavorite: false, 
        isDeleted: false, 
        contactDateCreated: new Date().toDateString(),
      };
      this.initForm();
    }
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



//   initForm() {
//     const routeParams= this.route.snapshot.paramMap;
//     const formIDRoute = (routeParams.get('id'));
//     this.contactService.getExistingEmails().subscribe((emails: string[]) => {
//       this.contactService.getExistingUsernames().subscribe((usernames: string[]) => {
//         this.contactForm = this.fb.group({
//           name: ['', Validators.required],
//           contactId: ['', [Validators.required, Validators.pattern('[0-9]*(\.[0-9]+)?')]],
//           mobilenumber: ['', [Validators.required, Validators.pattern('[0-9]*(\.[0-9]+)?')]],
//           email: [
//             '',
//             [
//               Validators.required,
//               Validators.email,
//               CustomValidators.uniqueEmail(emails),
//             ],
//           ],
//           username: [
//             '',
//             [
//               Validators.required,
//               CustomValidators.uniqueUsername(usernames),
//             ],
//           ],
//           isFavorite: [false],
//           isDeleted: [false],
//           isActive: [false],
//           contactDateCreated: [''],
//         });
//       });
//     });
//   }

//   onSubmit() {
//     if (this.contactForm.valid) {
//       const newContact: User = this.contactForm.value;
//       newContact.id = Number(this.contactForm.value['contactId']);
//       if (!this.contactService.isEmailUnique(newContact.email, newContact.id) || !this.contactService.isUsernameUnique(newContact.username, newContact.id)) {
//         this.errorMessage = 'Username or email is already taken.';
//       } else {
//         this.contactService.addUser(newContact);
//         this.router.navigate(['/users']);
//         console.log(this.contactService);
//       }
//     }
//   }
