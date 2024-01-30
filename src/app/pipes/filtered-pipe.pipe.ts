import { Pipe, PipeTransform } from '@angular/core';
import { Kontakt } from '../models/kontakt';

@Pipe({
  name: 'filteredPipe'
})
export class FilteredPipePipe implements PipeTransform {

  transform(value: Kontakt[] | null, search: string): any {
    if (value === null || value === undefined) {
      return [];
    }

    console.log(search);
    if (typeof search === 'undefined') {
      return value;
    } else {
      return value.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
    }
  }

}
