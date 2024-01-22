import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from 'src/app/model/contat';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {


  transform(contacts: Contact[], searchTerm: string): Contact[] {
    if (!contacts || !searchTerm) {
      return contacts;
    }
 
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    
  }

}
