import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent{
  @Output() search = new EventEmitter();

  selectedValue: string = 'main';

  constructor(private router: Router) {}
  
  onDropdownChange(event: any): void {
    const selectedValue = event.target.value;
    this.router.navigate(['/' + selectedValue]);
  }
}
