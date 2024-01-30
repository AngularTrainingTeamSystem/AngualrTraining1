import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  search!: string;

  @Output() searchString = new EventEmitter();

  stringSearch() {

    this.searchString.emit(this.search);

  }

}
