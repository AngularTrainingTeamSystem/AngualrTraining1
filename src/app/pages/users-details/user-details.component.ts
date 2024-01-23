
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from '../../services/contact-service.service';
import { User } from '../../models/user.model';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./users-details.component.scss'],
})
export class UserDetailsComponent implements OnInit {
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
      mobilenumber: [this.user?.mobilenumber],
      name: [this.user?.name],
      isActive: [this.user?.isActive],
      isFavorite: [this.user?.isFavorite],
      isDeleted: [this.user?.isDeleted],
      contactDateCreated: [this.user?.contactDateCreated ?? new Date()],
    });
  }

  goBack(): void {
    this.router.navigate(['/users']);
  }
}
