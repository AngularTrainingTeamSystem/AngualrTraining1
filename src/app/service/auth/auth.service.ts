import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = 'http://localhost:3000/user'

  constructor(
    private http : HttpClient
  ) { }

   user_role! : string

   loggedIn = false;

   

   userLoggedIn(userType : string){

    this.user_role = userType;
    this.loggedIn = true;

    localStorage.setItem('STATE' , 'true');
    localStorage.setItem('ROLE' , this.user_role);
    return of({ success: this.loggedIn, role: this.user_role });
   }

   userLoggedOut(){

    this.loggedIn = false;

    localStorage.setItem('STATE' , 'false');
    localStorage.setItem('ROLE' , '')


    return of({ success: this.loggedIn, role: '' });
   }



   getUserRole(){
    this.user_role = localStorage.getItem('ROLE')!;
    return this.user_role;
   }
 
   

   



  setValue(string : string){
    return string
  }


  checkEmailAndPassword(email: string, password: string): Observable<boolean> {
    
    return this.http.get(`${this.url}/?email=${email}&password=${password}`)
    .pipe(
      map((response : any) => response as Array<any>),
      map((response: Array<any>) => response[0])
    )
  }


  adminOrUser(email: string): Observable<boolean> {
    return this.http.get(this.url).pipe(
      map((response: any) => response as Array<any>),
      map((users: Array<any>) => users.some(user => user.email === email && user.role === 'admin')),
      
      
    );

    
  }


  getUserRoleByEmailAndPassword(email: string, password: string) {
    return this.http.get(`${this.url}/?email=${email}&password=${password}`)
      .pipe(
        map((response: any) => response as Array<any>),
        map((response: Array<any>) => response[0]),
        map((user: any) => user ? user.role : null)
      );
  }


  






 


  // hasUsername(usernameToCheck: string): Observable<boolean> {
  //   // return this.http.get<boolean>(`${this.url}/hasUsername/${usernameToCheck}`);
  //   return this.http.get(this.url).pipe(
  //     map((response :any) => response as Array<any>),
  //     map((contactz : Array<any>) => contactz.some(contactzi => contactzi.username == usernameToCheck))
  //   );
  // }


  
  



  
  







  addNewUser(user: any):Observable<any>{
    return this.http.post<any>(this.url , user);
  }
}
