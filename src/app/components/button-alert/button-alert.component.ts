import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export interface AlertEvent {
}

@Component({
  selector: 'app-button-alert',
  templateUrl: './button-alert.component.html',
  styleUrls: ['./button-alert.component.scss'],
})

export class ButtonAlertComponent {
  showAlert() {
    window.alert('Hello, You need to replace the data with the right information. Thank you:) ');
  }
}

