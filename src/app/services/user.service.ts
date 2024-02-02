import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

 
  url='http://localhost:3000/user'

  
  constructor(private http:HttpClient) { 
   
  }
saveUser(user:User){
  this.http.post(`${this.url}`,user).subscribe(
    value=>console.log("Added"),
    catchError((err)=>{return err})
  )
}

  loadUserByCredentials(email:string,password:string){
    return this.http.get(`${this.url}/?email=${email}&password=${password}`)
     .pipe(
      map((response: any) => response as Array<any>),
      map((response: Array<any>) => response[0])
     )
  }
}
