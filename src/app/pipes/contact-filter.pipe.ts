import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { Contact } from '../models/contact';

@Pipe({
  name: 'contactFilter'
})
export class ContactFilterPipe implements PipeTransform {

  transform(array: Contact[] | null, search:string): any {
    
if(typeof search === 'undefined'||search==''){
  
  return array;
}
else{

   let filteredArr= array!.filter(function(item) {
    return item.name.toLowerCase().includes(search.toLowerCase());
});
      
  
  return filteredArr
}
}

}
