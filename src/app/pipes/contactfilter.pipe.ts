import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'contactfilter'
})
export class ContactFilterPipe implements PipeTransform {

  transform(contacts: any[], searchTerm: string): any[] {
    if (!contacts || !searchTerm) {
      return contacts;
    }

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
}
