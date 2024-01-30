import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from 'src/app/model/contat';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {


  transform(contacts: Contact[] | null , searchTerm: string): any {
    if (contacts === null || contacts === undefined) {
      return[];
    }
 
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    
  }

}
