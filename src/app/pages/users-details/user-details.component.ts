import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from '../../services/contact-service.service';
import { User } from '../../models/user.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./users-details.component.scss'],
})
export class UserDetailsComponent implements OnInit {
  @Input() user?: User; //from parent to child 
  @Output() userDeselected = new EventEmitter(); //handled by the parent
  userForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private contactService: ContactService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.userForm = this.fb.group({
      name: [this.user?.name],
      mobilenumber: [this.user?.mobilenumber],
      email: [this.user?.email],
      username: [this.user?.username], 
      isActive: [this.user?.isActive],
      isFavorite: [this.user?.isFavorite],
      isDeleted: [this.user?.isDeleted],
      contactDateCreated: [this.user?.contactDateCreated ?? new Date()],
    });
  }

  goBack(): void {
    this.userDeselected.emit();
    //this.router.navigate(['/users']);
  }
}

