import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'AngularProject';

  // //STEP 4. ADD HTTP CLIENT CONSTRUCTOR
  // constructor(private http: HttpClient) { } //as dependency
  // ngOnInit() {
  //   this.http.get("api/projects");
  // }
}
