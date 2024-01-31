//STEP 1. IMPORT MODULES

import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

//STEP 2. ADD PROVIDER
@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss'],
  providers: [HttpClientModule] 
})
export class ConfigComponent {
 
}
